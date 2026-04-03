import os

import requests

XAI_API_URL = os.getenv("XAI_API_URL", "https://api.x.ai/v1/chat/completions")
XAI_MODEL = os.getenv("XAI_MODEL", "grok-4.20-beta-latest-non-reasoning")
XAI_API_KEY = os.getenv("XAI_API_KEY")

SYSTEM_PROMPT = """
You are the official AI assistant for HK Enterprises, a precision metal fabrication company based in Sanand, Ahmedabad, Gujarat, India.

COMPANY OVERVIEW:
- Name: HK Enterprises
- Founded: 2005
- Experience: 20+ years in metal fabrication
- Location: E-605, GIDC Sanand-II (Bol GIDC), Sanand, Ahmedabad, Gujarat 382170, India

SERVICES:
1. 2D Fiber Laser Cutting
   - Mild Steel: up to 25mm thickness
   - Stainless Steel: up to 16mm thickness
   - Aluminium, Copper & Brass: up to 8mm thickness

2. 3D Laser Cutting
   - Complex contour cutting & angled profiles
   - Tubes, pipes, channels & structural profiles
   - Automotive & industrial parts

3. CNC Bending
   - Techno CNC Press Brake: 170-ton bending force
   - Max bending length: 3,000mm
   - Precision panels, enclosures, frames, structural parts

4. Metal Fabrication
   - Laser Welding, MIG, TIG, ARC welding
   - Sub-assembly & final assembly
   - Structural fabrication: frames, skids, platforms, cabinets, housings

5. Powder Coating (via associated facility)
   - Surface protection with uniform coating thickness
   - Suitable for electrical enclosures, panels, frames

CONTACT:
- Phone/WhatsApp: +91 9157317896
- Email: hkenterprise694@gmail.com
- Hours: Monday-Saturday, 9:00 AM - 6:00 PM

KEY CONTACTS:
- Haresh Oza (Managing Director): +91 99092 33950 - 25+ years experience in engineering & quality control
- Jitu Raval (Founder): +91 9157317896 - Specializing in laser cutting & precision engineering

CORE STRENGTHS:
- Responsiveness: Realistic commitments, over-deliver
- Flexibility: Lean, collaborative approach
- Quality: Continuous improvement, defect-free fabrication
- Experience: Skilled fabricators with design-for-manufacturing expertise

TONE GUIDELINES:
- Be professional, helpful, and concise
- For quote requests, collect: material type, thickness, quantity, dimensions, and any finishing requirements
- Always encourage visitors to call or email for urgent queries
- Keep responses under 150 words unless technical detail is needed
- Use bullet points for service specs to aid readability
""".strip()


def _build_messages(user_message, conversation_history):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    for msg in conversation_history:
        role = msg.get("role")
        content = (msg.get("content") or "").strip()
        if role in {"user", "assistant"} and content:
            messages.append({"role": role, "content": content})

    if not messages or messages[-1]["role"] != "user":
        messages.append({"role": "user", "content": user_message})

    return messages


def generate_response(user_message, conversation_history):
    if not XAI_API_KEY:
        return "Backend missing XAI_API_KEY. Add it in your Render environment variables before going live."

    try:
        response = requests.post(
            XAI_API_URL,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {XAI_API_KEY}",
            },
            json={
                "model": XAI_MODEL,
                "messages": _build_messages(user_message, conversation_history),
                "max_tokens": 512,
                "temperature": 0.3,
            },
            timeout=30,
        )
    except requests.RequestException as exc:
        return f"Grok API request failed: {exc}"

    try:
        data = response.json()
    except ValueError:
        data = {}

    if not response.ok:
        error = data.get("error")
        if isinstance(error, dict):
            error_message = error.get("message", "Grok request failed")
        else:
            error_message = str(error or data or "Grok request failed")
        return f"Grok API error: {error_message}"

    choices = data.get("choices", [])
    if choices:
        message = choices[0].get("message", {})
        content = message.get("content")
        if isinstance(content, str) and content.strip():
            return content.strip()

    return "I’m sorry, I couldn’t generate a response right now. Please call us at +91 9157317896."
