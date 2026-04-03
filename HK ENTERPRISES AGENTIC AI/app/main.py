import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import router as chat_router


def _get_allowed_origins():
    raw_origins = os.getenv("ALLOWED_ORIGINS", "")
    origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

    if origins:
        return origins

    return [
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:8000",
        "http://localhost:8000",
        "https://crescentlasertech.in",
        "https://www.crescentlasertech.in",
    ]


def _get_allowed_origin_regex():
    return os.getenv("ALLOWED_ORIGIN_REGEX", r"^https://.*\.vercel\.app$")


app = FastAPI(title="HK Enterprises AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_get_allowed_origins(),
    allow_origin_regex=_get_allowed_origin_regex(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)


@app.get("/")
def root():
    return {"message": "HK AI Backend Running"}


@app.api_route("/health", methods=["GET", "HEAD"])
def health():
    return {"status": "ok"}
