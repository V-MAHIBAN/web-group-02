"""News, gallery and announcements API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.core import get_db
from app.models import (
    User,
    NewsArticle,
    GalleryAlbum,
    GalleryItem,
    Announcement,
    NewsArticleStatus,
)
from app.schemas.schemas import (
    NewsArticleResponse,
    NewsArticleCreate,
    NewsArticleUpdate,
    GalleryAlbumResponse,
    GalleryAlbumDetailResponse,
    GalleryAlbumCreate,
    AnnouncementResponse,
    AnnouncementCreate,
)
from app.middleware.auth import get_current_user, get_current_staff

router = APIRouter(tags=["content"], prefix="/content")


# ============================================================================
# News Articles
# ============================================================================


@router.get("/news", response_model=List[NewsArticleResponse])
async def list_news(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: str = Query(None),
    featured_only: bool = Query(False),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List news articles"""

    query = db.query(NewsArticle).filter(
        NewsArticle.status == NewsArticleStatus.PUBLISHED
    )

    if category:
        query = query.filter(NewsArticle.category == category)

    if featured_only:
        query = query.filter(NewsArticle.featured == True)

    articles = (
        query.order_by(NewsArticle.published_date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return articles


@router.get("/news/{article_id}", response_model=NewsArticleResponse)
async def get_article(
    article_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get news article"""

    article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()

    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Article not found"
        )

    if article.status != NewsArticleStatus.PUBLISHED:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Article not published"
        )

    # Increment views
    article.views_count += 1
    db.commit()

    return article


@router.post("/news", response_model=NewsArticleResponse)
async def create_article(
    request: NewsArticleCreate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Create news article"""

    article = NewsArticle(author_id=current_user.id, **request.dict())

    db.add(article)
    db.commit()
    db.refresh(article)

    return article


@router.put("/news/{article_id}", response_model=NewsArticleResponse)
async def update_article(
    article_id: str,
    request: NewsArticleUpdate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Update news article"""

    article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()

    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Article not found"
        )

    update_data = request.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(article, field, value)

    db.commit()
    db.refresh(article)

    return article


@router.delete("/news/{article_id}")
async def delete_article(
    article_id: str,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Archive news article"""

    article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()

    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Article not found"
        )

    article.status = NewsArticleStatus.ARCHIVED
    db.commit()

    return {"message": "Article archived"}


# ============================================================================
# Gallery
# ============================================================================


@router.get("/gallery", response_model=List[GalleryAlbumResponse])
async def list_albums(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: str = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List gallery albums"""

    query = db.query(GalleryAlbum)

    if category:
        query = query.filter(GalleryAlbum.category == category)

    albums = query.offset(skip).limit(limit).all()

    return albums


@router.get("/gallery/{album_id}", response_model=GalleryAlbumDetailResponse)
async def get_album(
    album_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get gallery album with items"""

    album = db.query(GalleryAlbum).filter(GalleryAlbum.id == album_id).first()

    if not album:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Album not found"
        )

    return album


@router.post("/gallery", response_model=GalleryAlbumResponse)
async def create_album(
    request: GalleryAlbumCreate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Create gallery album"""

    album = GalleryAlbum(uploader_id=current_user.id, **request.dict())

    db.add(album)
    db.commit()
    db.refresh(album)

    return album


@router.delete("/gallery/{album_id}")
async def delete_album(
    album_id: str,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Delete gallery album"""

    album = db.query(GalleryAlbum).filter(GalleryAlbum.id == album_id).first()

    if not album:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Album not found"
        )

    db.delete(album)
    db.commit()

    return {"message": "Album deleted"}


# ============================================================================
# Announcements
# ============================================================================


@router.get("/announcements", response_model=List[AnnouncementResponse])
async def list_announcements(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List active announcements"""

    from datetime import datetime
    from sqlalchemy import or_

    query = db.query(Announcement).filter(
        or_(
            Announcement.expiry_date == None,
            Announcement.expiry_date >= datetime.utcnow(),
        )
    )

    announcements = (
        query.order_by(Announcement.published_date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return announcements


@router.post("/announcements", response_model=AnnouncementResponse)
async def create_announcement(
    request: AnnouncementCreate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Create announcement"""

    announcement = Announcement(created_by=current_user.id, **request.dict())

    db.add(announcement)
    db.commit()
    db.refresh(announcement)

    return announcement


@router.put("/announcements/{ann_id}", response_model=AnnouncementResponse)
async def update_announcement(
    ann_id: str,
    request: AnnouncementCreate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Update announcement"""

    announcement = db.query(Announcement).filter(Announcement.id == ann_id).first()

    if not announcement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Announcement not found"
        )

    update_data = request.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(announcement, field, value)

    db.commit()
    db.refresh(announcement)

    return announcement


@router.delete("/announcements/{ann_id}")
async def delete_announcement(
    ann_id: str,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Delete announcement"""

    announcement = db.query(Announcement).filter(Announcement.id == ann_id).first()

    if not announcement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Announcement not found"
        )

    db.delete(announcement)
    db.commit()

    return {"message": "Announcement deleted"}
