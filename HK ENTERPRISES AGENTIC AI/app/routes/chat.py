from fastapi import APIRouter
from pydantic import BaseModel
from app.llm_service import generate_response

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


@router.post("/chat")
def chat(request: ChatRequest):
    recent_history = [msg.model_dump() for msg in request.history[-8:]]
    reply = generate_response(request.message, recent_history)

    return {"response": reply}
