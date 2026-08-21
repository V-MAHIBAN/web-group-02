"""
ACB Management System Backend - Entry Point

Run with:
    python main.py

Or with uvicorn:
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
"""

from app.main import app

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
