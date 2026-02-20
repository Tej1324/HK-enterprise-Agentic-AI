from fastapi import APIRouter
from pydantic import BaseModel
from app.llm_service import generate_response

router = APIRouter()

conversation_history = []


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(request: ChatRequest):

    conversation_history.append({
        "role": "user",
        "content": request.message
    })

    recent_history = conversation_history[-6:]

    reply = generate_response(request.message, recent_history)

    conversation_history.append({
        "role": "assistant",
        "content": reply
    })

    return {"response": reply}
