document.addEventListener("DOMContentLoaded", function () {

    const chatToggle = document.getElementById("chat-toggle");
    const chatContainer = document.getElementById("chat-container");
    const chatClose = document.getElementById("chat-close");
    const chatSend = document.getElementById("chat-send");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    if (!chatToggle) return;

    /* ==============================
       OPEN / CLOSE CHAT
    ============================== */

    chatToggle.addEventListener("click", () => {

    chatContainer.style.display = "flex";
    chatInput.focus();

    // If chat is empty, show welcome message
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

        // Disable send button
        chatSend.disabled = true;

        // Clear input
        chatInput.value = "";

        // Add user message
        addMessage(message, "user-message");

        // Show typing indicator
        const typingMsg = addMessage("...", "ai-message typing");

        try {
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            // Remove typing indicator
            typingMsg.remove();

            addMessage(data.response, "ai-message");

        } catch (error) {

            typingMsg.remove();
            addMessage("Connection error. Please try again.", "ai-message");

        } finally {
            // Re-enable button
            chatSend.disabled = false;
            chatInput.focus();
        }
    }

    /* ==============================
       MESSAGE RENDER FUNCTION
    ============================== */

    function addMessage(text, className) {
        const msg = document.createElement("div");
        msg.className = "message " + className;
        msg.textContent = text;

        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return msg;
    }

    function typeWelcomeMessage() {
    const text = "Hi, I’m Tufo, your AI assistant at HK Enterprises. How may I help you today?";
    const msg = document.createElement("div");
    msg.className = "message ai-message";
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
