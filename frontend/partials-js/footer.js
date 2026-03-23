// ─── FOOTER HTML ───────────────────────────────────────────────────────────────

const footerHTML = `
<footer class="site-footer">

  <div class="footer-main">

    <!-- LEFT -->
    <div class="footer-col footer-contact">

      <img src="images/logo.png" class="footer-logo">

      <p>
        Precision fabrication and engineering solutions delivering
        reliability, scalability and advanced manufacturing capabilities.
      </p>

      <a href="mailto:info@hkenterprises.com" class="footer-email">
        info@hkenterprises.com
      </a>

    </div>

    <!-- COMPANY -->
    <div class="footer-col">
      <h3>Company</h3>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Infrastructure</a></li>
        <li><a href="#">Industries</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <!-- SERVICES -->
    <div class="footer-col">
      <h3>Services</h3>
      <ul>
        <li><a href="#">Laser Cutting</a></li>
        <li><a href="#">CNC Bending</a></li>
        <li><a href="#">Metal Fabrication</a></li>
        <li><a href="#">Engineering</a></li>
      </ul>
    </div>

  </div>


  <!-- BIG CTA SECTION -->

  <div class="footer-cta">

    <div class="cta-content">

      <div class="cta-left">
        <h2>Stay Connected</h2>
        <p>
          Get updates about our latest fabrication projects and engineering
          innovations.
        </p>
      </div>

      <div class="cta-right">
        <input type="email" placeholder="Enter your email address">
        <button>JOIN</button>
      </div>

    </div>

    <div class="footer-bg-text">HK</div>

  </div>


  <!-- COPYRIGHT -->

  <div class="footer-bottom">
    © 2026 HK Enterprises. All Rights Reserved.
  </div>

</footer>


<!-- ═══════════════════════════════════════════════════════════════════════════
     HK AI CHAT WIDGET
     Drop-in assistant. Appears on every page via this footer file.
     Replace YOUR_API_KEY_HERE with your Anthropic key (or proxy through backend).
════════════════════════════════════════════════════════════════════════════ -->

<!-- Widget Styles -->
<style>
  /* Launcher button */
  #hk-chat-launcher {
    position: fixed;
    bottom: calc(var(--floating-edge-offset, 25px) + var(--whatsapp-size, 55px) + var(--floating-stack-gap, 16px));
    right: var(--floating-edge-offset, 25px);
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e8a020, #c06010);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(232,160,32,0.45);
    z-index: 9998;
    transition: transform 0.2s, box-shadow 0.2s;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #0b0e14;
  }
  #hk-chat-launcher:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 28px rgba(232,160,32,0.6);
  }
  #hk-chat-launcher .icon-chat,
  #hk-chat-launcher .icon-close { transition: opacity 0.2s, transform 0.2s; }
  #hk-chat-launcher .icon-close { display: none; }
  #hk-chat-launcher.open .icon-chat { display: none; }
  #hk-chat-launcher.open .icon-close { display: block; }

  /* Unread badge */
  #hk-chat-badge {
    position: absolute;
    top: -2px; right: -2px;
    width: 18px; height: 18px;
    background: #e8a020;
    border-radius: 50%;
    border: 2px solid #0b0e14;
    font-size: 10px;
    font-weight: 700;
    color: #0b0e14;
    display: flex; align-items: center; justify-content: center;
    display: none;
  }

  /* Panel */
  #hk-chat-panel {
    position: fixed;
    bottom: calc(var(--floating-edge-offset, 25px) + var(--whatsapp-size, 55px) + var(--floating-stack-gap, 16px) + var(--chat-launcher-size, 58px) + 12px);
    right: var(--floating-edge-offset, 25px);
    width: 360px;
    max-height: 540px;
    background: #131720;
    border: 1px solid #1f2535;
    border-radius: 18px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.55), 0 0 24px rgba(232,160,32,0.12);
    z-index: 9999;
    display: none;
    flex-direction: column;
    overflow: hidden;
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    transform: translateY(12px);
    opacity: 0;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
  #hk-chat-panel.visible {
    display: flex;
    transform: translateY(0);
    opacity: 1;
  }

  /* Header */
  .hkc-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    background: #0e1520;
    border-bottom: 1px solid #1f2535;
    flex-shrink: 0;
  }
  .hkc-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: linear-gradient(135deg, #e8a020, #c06010);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 14px; color: #0b0e14;
    font-family: 'Rajdhani', sans-serif;
    flex-shrink: 0;
    position: relative;
  }
  .hkc-avatar-dot {
    position: absolute; bottom: 1px; right: 1px;
    width: 9px; height: 9px;
    background: #22c55e; border-radius: 50%;
    border: 2px solid #131720;
    animation: hkc-pulse 2s infinite;
  }
  @keyframes hkc-pulse {
    0%,100% { transform: scale(1); }
    50% { transform: scale(1.35); opacity: 0.7; }
  }
  .hkc-header-text h4 {
    font-size: 14px; font-weight: 600;
    color: #fff; margin: 0;
    font-family: 'Rajdhani', sans-serif;
    letter-spacing: 0.4px;
  }
  .hkc-header-text p {
    font-size: 11px; color: #7a85a0; margin: 0;
  }
  .hkc-online {
    margin-left: auto;
    font-size: 10px; color: #22c55e;
    display: flex; align-items: center; gap: 4px;
  }
  .hkc-online::before {
    content: ''; width: 6px; height: 6px;
    background: #22c55e; border-radius: 50%;
  }

  /* Messages */
  .hkc-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    scroll-behavior: smooth;
  }
  .hkc-messages::-webkit-scrollbar { width: 3px; }
  .hkc-messages::-webkit-scrollbar-thumb { background: #1f2535; border-radius: 3px; }

  .hkc-msg {
    display: flex; gap: 8px;
    animation: hkc-fadein 0.22s ease forwards;
    opacity: 0;
  }
  @keyframes hkc-fadein {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hkc-msg.user { flex-direction: row-reverse; }

  .hkc-msg-av {
    width: 28px; height: 28px; border-radius: 50%;
    flex-shrink: 0; margin-top: 2px;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 600;
  }
  .hkc-msg.bot .hkc-msg-av {
    background: linear-gradient(135deg, #e8a020, #c06010);
    color: #0b0e14; font-family: 'Rajdhani', sans-serif;
  }
  .hkc-msg.user .hkc-msg-av {
    background: #1e3a5f; color: #dde3f0;
  }

  .hkc-bubble {
    max-width: 82%;
    padding: 10px 13px;
    border-radius: 13px;
    font-size: 13px;
    line-height: 1.55;
  }
  .hkc-msg.bot .hkc-bubble {
    background: #1a2236;
    border: 1px solid #1f2535;
    border-top-left-radius: 4px;
    color: #dde3f0;
  }
  .hkc-msg.user .hkc-bubble {
    background: #1e3a5f;
    border: 1px solid rgba(30,90,180,0.3);
    border-top-right-radius: 4px;
    color: #dde3f0;
  }

  /* Typing indicator */
  .hkc-typing {
    display: none;
    align-items: center;
    gap: 8px;
    padding: 0 16px 8px;
    flex-shrink: 0;
  }
  .hkc-typing.on { display: flex; }
  .hkc-typing-dots {
    background: #1a2236;
    border: 1px solid #1f2535;
    border-radius: 13px; border-top-left-radius: 4px;
    padding: 10px 13px;
    display: flex; gap: 4px; align-items: center;
  }
  .hkc-typing-dots span {
    width: 6px; height: 6px;
    background: #7a85a0; border-radius: 50%;
    animation: hkc-bounce 1.2s infinite;
  }
  .hkc-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .hkc-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes hkc-bounce {
    0%,60%,100% { transform: translateY(0); opacity: 0.5; }
    30% { transform: translateY(-4px); opacity: 1; }
  }

  /* Quick replies */
  .hkc-quick {
    display: flex; flex-wrap: wrap; gap: 6px;
    padding: 0 16px 12px;
    flex-shrink: 0;
  }
  .hkc-qbtn {
    background: transparent;
    border: 1px solid #1f2535;
    color: #e8a020;
    padding: 5px 12px;
    border-radius: 999px;
    font-size: 11px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.18s;
  }
  .hkc-qbtn:hover {
    background: rgba(232,160,32,0.1);
    border-color: #e8a020;
  }

  /* Input */
  .hkc-input-row {
    display: flex; gap: 8px; align-items: center;
    padding: 12px 14px;
    border-top: 1px solid #1f2535;
    background: #0f1420;
    flex-shrink: 0;
  }
  .hkc-input {
    flex: 1;
    background: #0b0e14;
    border: 1px solid #1f2535;
    border-radius: 10px;
    padding: 9px 13px;
    color: #dde3f0;
    font-family: inherit;
    font-size: 13px;
    outline: none;
    resize: none;
    max-height: 90px;
    transition: border-color 0.2s;
    line-height: 1.4;
  }
  .hkc-input::placeholder { color: #4a526a; }
  .hkc-input:focus { border-color: #e8a020; }
  .hkc-send {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, #e8a020, #c06010);
    border: none; border-radius: 10px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.18s;
    flex-shrink: 0;
  }
  .hkc-send:hover { transform: scale(1.06); }
  .hkc-send svg { width: 15px; height: 15px; fill: #0b0e14; }

  @media (max-width: 420px) {
    #hk-chat-panel {
      width: calc(100vw - 24px);
      right: 12px;
      bottom: calc(var(--floating-edge-offset, 16px) + var(--whatsapp-size, 55px) + var(--floating-stack-gap, 12px) + var(--chat-launcher-size, 58px) + 12px);
    }
    #hk-chat-launcher {
      right: var(--floating-edge-offset, 16px);
      bottom: calc(var(--floating-edge-offset, 16px) + var(--whatsapp-size, 55px) + var(--floating-stack-gap, 12px));
    }
  }
</style>


<!-- Launcher Button -->
<button id="hk-chat-launcher" onclick="hkcToggle()" title="Chat with Tufo">
  <span class="icon-chat">TU</span>
  <span class="icon-close" style="font-size:20px;font-family:sans-serif;font-weight:300;">✕</span>
  <span id="hk-chat-badge">1</span>
</button>

<!-- Chat Panel -->
<div id="hk-chat-panel">

  <div class="hkc-header">
    <div class="hkc-avatar">TU<div class="hkc-avatar-dot"></div></div>
    <div class="hkc-header-text">
      <h4>Tufo</h4>
      <p>I Am TUFO</p>
    </div>
    <div class="hkc-online">Online</div>
  </div>

  <div class="hkc-messages" id="hkcMessages"></div>

  <div class="hkc-typing" id="hkcTyping">
    <div class="hkc-msg-av hkc-msg bot" style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#e8a020,#c06010);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#0b0e14;font-family:'Rajdhani',sans-serif;flex-shrink:0;">TU</div>
    <div class="hkc-typing-dots"><span></span><span></span><span></span></div>
  </div>

  <div class="hkc-quick" id="hkcQuick">
    <button class="hkc-qbtn" onclick="hkcQuickSend('What services do you offer?')">Services</button>
    <button class="hkc-qbtn" onclick="hkcQuickSend('What materials can you cut?')">Materials</button>
    <button class="hkc-qbtn" onclick="hkcQuickSend('How do I request a quote?')">Get Quote</button>
    <button class="hkc-qbtn" onclick="hkcQuickSend('What is your contact information?')">Contact</button>
  </div>

  <div class="hkc-input-row">
    <textarea class="hkc-input" id="hkcInput" rows="1"
      placeholder="Ask about our services…"
      onkeydown="hkcKey(event)"
      oninput="hkcResize(this)"></textarea>
    <button class="hkc-send" onclick="hkcSend()" title="Send">
      <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
    </button>
  </div>

</div>
`;

var footerMount = document.getElementById('site-footer');
if (footerMount) {
  footerMount.innerHTML = footerHTML;
}

(function() {

  /* ── Config ──────────────────────────────────────────────────── */
  var CHAT_API_URL = window.HK_CHAT_API_URL || 'http://127.0.0.1:8000/chat';
  var CHAT_TIMEOUT_MS = 20000;

  /* ── State ───────────────────────────────────────────────────── */
  var isOpen    = false;
  var welcomed  = false;
  var conversationHistory = [];

  /* ── Toggle ──────────────────────────────────────────────────── */
  window.hkcToggle = function() {
    isOpen = !isOpen;
    var panel     = document.getElementById('hk-chat-panel');
    var launcher  = document.getElementById('hk-chat-launcher');
    var badge     = document.getElementById('hk-chat-badge');

    launcher.classList.toggle('open', isOpen);
    badge.style.display = 'none';

    if (isOpen) {
      panel.style.display = 'flex';
      setTimeout(function() { panel.classList.add('visible'); }, 10);
      if (!welcomed) { welcomed = true; hkcWelcome(); }
    } else {
      panel.classList.remove('visible');
      setTimeout(function() { panel.style.display = 'none'; }, 260);
    }
  };

  /* ── Welcome ─────────────────────────────────────────────────── */
  function hkcWelcome() {
    hkcAppend('bot', '👋 Hi, I’m Tufo, your AI assistant at HK Enterprises. How may I help you today?');
  }

  /* ── Quick send ──────────────────────────────────────────────── */
  window.hkcQuickSend = function(text) {
    document.getElementById('hkcInput').value = text;
    hkcSend();
  };

  /* ── Key handler ─────────────────────────────────────────────── */
  window.hkcKey = function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); hkcSend(); }
  };

  /* ── Textarea resize ─────────────────────────────────────────── */
  window.hkcResize = function(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 90) + 'px';
  };

  /* ── Send ────────────────────────────────────────────────────── */
  window.hkcSend = function() {
    var input = document.getElementById('hkcInput');
    var text  = input.value.trim();
    var controller = new AbortController();
    var timeoutId;
    if (!text) return;

    document.getElementById('hkcQuick').style.display = 'none';
    hkcAppend('user', text);
    input.value = '';
    input.style.height = 'auto';
    conversationHistory.push({ role: 'user', content: text });

    hkcSetTyping(true);

    timeoutId = setTimeout(function() {
      controller.abort();
    }, CHAT_TIMEOUT_MS);

    fetch(CHAT_API_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text,
        history: conversationHistory
      })
    })
    .then(function(r) {
      return r.json().then(function(data) {
        if (!r.ok) {
          var apiError = data && data.detail
            ? String(data.detail)
            : 'Chat request failed';
          throw new Error(apiError);
        }
        return data;
      });
    })
    .then(function(data) {
      clearTimeout(timeoutId);
      var reply = (data && data.response)
        ? data.response
        : 'Sorry, I had trouble responding. Please call us at +91\u00a09157317896.';
      conversationHistory.push({ role: 'assistant', content: reply });
      hkcSetTyping(false);
      hkcAppend('bot', reply);
    })
    .catch(function(error) {
      clearTimeout(timeoutId);
      hkcSetTyping(false);
      console.error('Tufo chat error:', error);
      hkcAppend(
        'bot',
        error && error.name === 'AbortError'
          ? 'Tufo is taking too long to respond right now. Please try again in a moment or call us at +91\u00a09157317896.'
          : 'Tufo could not connect: ' + (error && error.message ? error.message : 'Unknown error')
      );
    });
  };

  /* ── Append message ──────────────────────────────────────────── */
  function hkcAppend(role, text) {
    var container = document.getElementById('hkcMessages');
    var div       = document.createElement('div');
    div.className = 'hkc-msg ' + role;

    var avLabel = role === 'bot' ? 'TU' : 'You';
    var avStyle = role === 'bot'
      ? 'background:linear-gradient(135deg,#e8a020,#c06010);color:#0b0e14;font-family:Rajdhani,sans-serif;'
      : 'background:#1e3a5f;color:#dde3f0;';

    var safe = text
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
      .replace(/\n/g,'<br>');

    div.innerHTML =
      '<div class="hkc-msg-av" style="' + avStyle + '">' + avLabel + '</div>' +
      '<div class="hkc-bubble">' + safe + '</div>';

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  /* ── Typing indicator ────────────────────────────────────────── */
  function hkcSetTyping(on) {
    var el = document.getElementById('hkcTyping');
    el.className = on ? 'hkc-typing on' : 'hkc-typing';
    if (on) {
      var c = document.getElementById('hkcMessages');
      c.scrollTop = c.scrollHeight;
    }
  }

  /* ── Show badge after 3s if panel not opened ─────────────────── */
  setTimeout(function() {
    if (!isOpen) {
      var badge = document.getElementById('hk-chat-badge');
      if (badge) badge.style.display = 'flex';
    }
  }, 3000);

})();
