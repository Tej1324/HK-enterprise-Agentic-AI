import os
import requests

ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
ANTHROPIC_MODEL = "claude-sonnet-4-20250514"
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

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


def generate_response(user_message, conversation_history):
    if not ANTHROPIC_API_KEY:
        return "Backend missing ANTHROPIC_API_KEY. Please add it to the local backend .env file."

    messages = []
    for msg in conversation_history:
        role = msg.get("role")
        content = msg.get("content", "")
        if role in {"user", "assistant"} and content:
            api_role = "assistant" if role == "assistant" else "user"
            messages.append({"role": api_role, "content": content})

    if not messages or messages[-1]["role"] != "user":
        messages.append({"role": "user", "content": user_message})

    response = requests.post(
        ANTHROPIC_API_URL,
        headers={
            "Content-Type": "application/json",
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
        },
        json={
            "model": ANTHROPIC_MODEL,
            "max_tokens": 512,
            "system": SYSTEM_PROMPT,
            "messages": messages,
        },
        timeout=20,
    )

    data = response.json()

    if not response.ok:
        error_message = data.get("error", {}).get("message", "Claude request failed")
        return f"Claude API error: {error_message}"

    content = data.get("content", [])
    if content and content[0].get("text"):
        return content[0]["text"]

    return "I’m sorry, I couldn’t generate a response right now. Please call us at +91 9157317896."
