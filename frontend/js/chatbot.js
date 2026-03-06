document.addEventListener("DOMContentLoaded", function () {

    const chatToggle = document.getElementById("chat-toggle");
    const chatContainer = document.getElementById("chat-container");
    const chatClose = document.getElementById("chat-close");
    const chatSend = document.getElementById("chat-send");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    if (!chatToggle) return;

    // Store session id
    let session_id = localStorage.getItem("chat_session");

    /* ==============================
       OPEN / CLOSE CHAT
    ============================== */

    chatToggle.addEventListener("click", () => {

        chatContainer.classList.add("open");
        chatContainer.style.display = "flex";
        chatInput.focus();

        if (chatMessages.children.length === 0) {

            typeWelcomeMessage();

        }
    });

    chatClose.addEventListener("click", () => {
        chatContainer.style.display = "none";
    });

    /* ==============================
       SEND MESSAGE EVENTS
    ============================== */

    chatSend.addEventListener("click", sendMessage);

    chatInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            sendMessage();

        }

    });

    /* ==============================
       MAIN SEND FUNCTION
    ============================== */

    async function sendMessage() {

        const message = chatInput.value.trim();

        if (!message) return;

        chatSend.disabled = true;

        chatInput.value = "";

        addMessage(message, "user-message");

        const typingMsg = addMessage("...", "ai-message typing");

        try {

            const response = await fetch(
                "https://tejakodiyala01-hktufo.hf.space/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: message,
                        session_id: session_id
                    })
                }
            );

            const data = await response.json();

            typingMsg.remove();

            addMessage(data.response || "Sorry, I couldn't generate a reply.", "ai-message");

            session_id = data.session_id;

            localStorage.setItem("chat_session", session_id);

        } catch (error) {

            typingMsg.remove();

            addMessage("Connection error. Please try again.", "ai-message");

        } finally {

            chatSend.disabled = false;

            chatInput.focus();

        }

    }

    /* ==============================
       MESSAGE RENDER FUNCTION
    ============================== */

    function addMessage(text, className) {

        const wrapper = document.createElement("div");

        wrapper.className = "message-wrapper " + className;

        const msg = document.createElement("div");

        msg.className = "message-bubble";

        msg.textContent = text;

        if (className.includes("ai-message")) {

            const avatar = document.createElement("div");

            avatar.className = "ai-avatar";

            const img = document.createElement("img");

            img.src = "images/tufo-avatar.png";

            img.className = "ai-avatar-img";

            avatar.appendChild(img);

            wrapper.appendChild(avatar);

            wrapper.appendChild(msg);

        } else {

            wrapper.appendChild(msg);

        }

        chatMessages.appendChild(wrapper);

        chatMessages.scrollTop = chatMessages.scrollHeight;

        return wrapper;

    }

    /* ==============================
       WELCOME MESSAGE
    ============================== */

    function typeWelcomeMessage() {

        const text = "Hi, I’m Tufo, your AI assistant at HK Enterprises. How may I help you today?";

        const msg = document.createElement("div");

        msg.className = "message-bubble ai-message";

        chatMessages.appendChild(msg);

        let i = 0;

        const interval = setInterval(() => {

            msg.textContent += text[i];

            i++;

            if (i >= text.length) clearInterval(interval);

            chatMessages.scrollTop = chatMessages.scrollHeight;

        }, 20);

    }

});
