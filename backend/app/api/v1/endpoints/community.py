"""Community and chat API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.core import get_db
from app.models import User, CommunityPost, CommunityReply, ChatSession, ChatMessage
from app.schemas.schemas import (
    CommunityPostResponse,
    CommunityPostDetailResponse,
    CommunityPostCreate,
    CommunityReplyCreate,
    CommunityReplyResponse,
    ChatSessionResponse,
    ChatSessionDetailResponse,
    ChatSessionCreate,
    ChatMessageCreate,
    ChatMessageResponse,
)
from app.middleware.auth import get_current_user

router = APIRouter(tags=["community"], prefix="/community")


# ============================================================================
# Community Posts
# ============================================================================


@router.get("/posts", response_model=List[CommunityPostResponse])
async def list_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: str = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List community posts"""

    query = db.query(CommunityPost)

    if category:
        query = query.filter(CommunityPost.category == category)

    posts = (
        query.order_by(CommunityPost.created_at.desc()).offset(skip).limit(limit).all()
    )

    return posts


@router.get("/posts/{post_id}", response_model=CommunityPostDetailResponse)
async def get_post(
    post_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get community post with replies"""

    post = db.query(CommunityPost).filter(CommunityPost.id == post_id).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )

    # Increment views
    post.views_count += 1
    db.commit()

    return post


@router.post("/posts", response_model=CommunityPostResponse)
async def create_post(
    request: CommunityPostCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create community post"""

    post = CommunityPost(author_id=current_user.id, **request.dict())

    db.add(post)
    db.commit()
    db.refresh(post)

    return post


@router.put("/posts/{post_id}")
async def update_post(
    post_id: str,
    request: CommunityPostCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update community post"""

    post = db.query(CommunityPost).filter(CommunityPost.id == post_id).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )

    # Check ownership
    if post.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only edit your own posts",
        )

    update_data = request.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(post, field, value)

    db.commit()
    db.refresh(post)

    return post


@router.delete("/posts/{post_id}")
async def delete_post(
    post_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete community post"""

    post = db.query(CommunityPost).filter(CommunityPost.id == post_id).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )

    # Check ownership
    if post.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own posts",
        )

    db.delete(post)
    db.commit()

    return {"message": "Post deleted"}


@router.post("/posts/{post_id}/like")
async def like_post(
    post_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Like community post"""

    post = db.query(CommunityPost).filter(CommunityPost.id == post_id).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )

    # Check if already liked
    if current_user in post.likes:
        post.likes.remove(current_user)
        post.likes_count -= 1
    else:
        post.likes.append(current_user)
        post.likes_count += 1

    db.commit()

    return {"message": "Post liked", "likes": post.likes_count}


# ============================================================================
# Post Replies
# ============================================================================


@router.post("/posts/{post_id}/reply", response_model=CommunityReplyResponse)
async def reply_to_post(
    post_id: str,
    request: CommunityReplyCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Reply to community post"""

    post = db.query(CommunityPost).filter(CommunityPost.id == post_id).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )

    reply = CommunityReply(
        post_id=post_id,
        author_id=current_user.id,
        content=request.content,
    )

    post.replies_count += 1

    db.add(reply)
    db.commit()
    db.refresh(reply)

    return reply


# ============================================================================
# Chat Sessions
# ============================================================================


@router.get("/chat/sessions", response_model=List[ChatSessionResponse])
async def list_chat_sessions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List user's chat sessions"""

    sessions = (
        db.query(ChatSession).filter(ChatSession.user_id == current_user.id).all()
    )

    return sessions


@router.get("/chat/sessions/{session_id}", response_model=ChatSessionDetailResponse)
async def get_chat_session(
    session_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get chat session with messages"""

    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()

    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Chat session not found"
        )

    # Verify ownership
    if session.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have access to this session",
        )

    return session


@router.post("/chat/sessions", response_model=ChatSessionResponse)
async def create_chat_session(
    request: ChatSessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create new chat session"""

    session = ChatSession(
        user_id=current_user.id,
        title=request.title,
        category=request.category,
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session


@router.post("/chat/sessions/{session_id}/messages", response_model=ChatMessageResponse)
async def send_chat_message(
    session_id: str,
    request: ChatMessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Send message in chat session"""

    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()

    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Chat session not found"
        )

    # Verify ownership
    if session.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have access to this session",
        )

    # Create user message
    user_message = ChatMessage(
        session_id=session_id,
        role="user",
        content=request.content,
    )

    db.add(user_message)
    session.message_count += 1
    db.commit()
    db.refresh(user_message)

    # TODO: Call AI assistant (Google Genai) to generate response
    # For now, return user message

    return user_message
