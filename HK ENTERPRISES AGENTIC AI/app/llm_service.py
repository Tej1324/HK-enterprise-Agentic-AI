import requests
from app.vector_store import retrieve_relevant_chunks

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "mistral"

SMALL_TALK = ["hi", "hello", "thanks", "thank you", "no", "okay", "ok", "bye"]

def generate_response(user_message, conversation_history):

    cleaned = user_message.lower().strip()

    # 1️⃣ Handle small talk BEFORE retrieval
    if cleaned in SMALL_TALK:
        if cleaned in ["thanks", "thank you"]:
            return "You're most welcome! If you need any information about HK Enterprises, I’m happy to assist."
        if cleaned in ["bye"]:
            return "Thank you for reaching out to HK Enterprises. Have a great day!"
        return "Hello! How may I assist you regarding HK Enterprises today?"

    # 2️⃣ Retrieve website content
    retrieved = retrieve_relevant_chunks(user_message)

    # 3️⃣ Apply similarity threshold
    THRESHOLD = 0.25
    filtered = [r for r in retrieved if r["score"] > THRESHOLD]

    if not filtered:
        return "I’m sorry, I couldn’t find that information on our website. I’d be happy to connect you with our team for further assistance."

    context = "\n\n".join([r["text"] for r in filtered])

    # 4️⃣ Add conversation memory
    history_text = ""
    for msg in conversation_history:
        history_text += f'{msg["role"].upper()}: {msg["content"]}\n'

    prompt = f"""
You are the professional AI assistant of HK Enterprises.
You speak like a polite receptionist.

Use ONLY the company information provided.

Conversation so far:
{history_text}

Company Information:
{context}

Customer Question:
{user_message}

Answer professionally:
"""

    response = requests.post(
    OLLAMA_URL,
    json={
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "options": {
            "num_predict": 150,   # limits response length
            "temperature": 0.2    # makes responses focused
        }
    }
)


    return response.json()["response"]
