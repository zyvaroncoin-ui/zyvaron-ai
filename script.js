// Screens
const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app-screen");

const loginForm = document.getElementById("login-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// Screen switch
function showScreen(screen) {
  welcomeScreen.classList.add("hidden");
  loginScreen.classList.add("hidden");
  appScreen.classList.add("hidden");
  screen.classList.remove("hidden");
}

// Start button
startBtn.addEventListener("click", () => {
  showScreen(loginScreen);
});

// Login (demo)
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  showScreen(appScreen);
  addBotMessage("Welcome to Zyvaron.AI 🚀 (Demo Mode)");
});

// Add messages
function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "message user-message";
  div.innerHTML = `
    <div class="message-bubble">${escapeHTML(text)}</div>
  `;
  chatBox.appendChild(div);
  scrollChat();
}

function addBotMessage(text) {
  const div = document.createElement("div");
  div.className = "message bot-message";
  div.innerHTML = `
    <div class="message-avatar bot-avatar">Z</div>
    <div class="message-bubble">${text}</div>
  `;
  chatBox.appendChild(div);
  scrollChat();
}

// Typing animation
function addTyping() {
  const div = document.createElement("div");
  div.className = "message bot-message typing-msg";
  div.innerHTML = `
    <div class="message-avatar bot-avatar">Z</div>
    <div class="message-bubble">Zyvaron is thinking...</div>
  `;
  chatBox.appendChild(div);
  scrollChat();
  return div;
}

// Send message
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = "";

  const typing = addTyping();

  setTimeout(() => {
    typing.remove();

    if (isBlocked(text)) {
      addBotMessage("❌ This request is blocked. Please use safe content.");
      return;
    }

    addBotMessage(generateReply(text));
  }, 900);
}

// Smart demo reply
function generateReply(text) {
  const t = text.toLowerCase();

  if (t.includes("hello") || t.includes("hi")) {
    return "Hello 👋 I am Zyvaron.AI. How can I help you today?";
  }

  if (t.includes("code")) {
    return "💻 I can help build websites, apps, and ideas. Real AI coding will be added soon.";
  }

  if (t.includes("money") || t.includes("business")) {
    return "💰 Build tools, add premium plans, and grow users to make money with Zyvaron.AI.";
  }

  if (t.includes("image")) {
    return "🖼️ Image AI feature coming soon.";
  }

  return "🤖 Zyvaron demo response: " + text;
}

// Tool buttons
function showToolMessage(msg) {
  addBotMessage(msg);
}

// New chat
function newChat() {
  chatBox.innerHTML = "";
  addBotMessage("✨ New chat started. Ask anything.");
}

// Safety
function isBlocked(text) {
  const bad = ["porn", "sex", "xxx", "18+"];
  return bad.some(w => text.toLowerCase().includes(w));
}

// Escape
function escapeHTML(text) {
  return text.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

// Scroll
function scrollChat() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter key
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

// Social buttons
document.querySelectorAll(".social-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Google / Apple login will be added with Firebase next step.");
  });
});

/* ===== 3D Mouse Effect ===== */
document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.pageX) / 40;
  const y = (window.innerHeight / 2 - e.pageY) / 40;

  document.querySelectorAll(".welcome-card, .login-box").forEach(el => {
    el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
});
