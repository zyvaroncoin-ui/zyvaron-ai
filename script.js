const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app-screen");
const loginForm = document.getElementById("login-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

function showScreen(screen) {
  welcomeScreen.classList.add("hidden");
  loginScreen.classList.add("hidden");
  appScreen.classList.add("hidden");
  screen.classList.remove("hidden");
}

startBtn.addEventListener("click", () => {
  showScreen(loginScreen);
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  showScreen(appScreen);
  addBotMessage("Welcome to Zyvaron.AI. You are logged in demo mode.");
});

function addUserMessage(text) {
  const message = document.createElement("div");
  message.className = "message user-message";
  message.innerHTML = `
    <div class="message-bubble">${escapeHTML(text)}</div>
    <div class="message-avatar user-avatar">U</div>
  `;
  chatBox.appendChild(message);
  scrollChat();
}

function addBotMessage(text) {
  const message = document.createElement("div");
  message.className = "message bot-message";
  message.innerHTML = `
    <div class="message-avatar bot-avatar">Z</div>
    <div class="message-bubble">${escapeHTML(text)}</div>
  `;
  chatBox.appendChild(message);
  scrollChat();
}

function addTypingMessage() {
  const message = document.createElement("div");
  message.className = "message bot-message";
  message.innerHTML = `
    <div class="message-avatar bot-avatar">Z</div>
    <div class="message-bubble typing">Zyvaron is thinking<span>.</span><span>.</span><span>.</span></div>
  `;
  chatBox.appendChild(message);
  scrollChat();
  return message;
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = "";

  const typing = addTypingMessage();

  setTimeout(() => {
    typing.remove();

    if (isBlockedContent(text)) {
      addBotMessage("Sorry, I cannot help with adult or unsafe content. Please ask something useful, safe, or educational.");
      return;
    }

    addBotMessage(generateDemoReply(text));
  }, 900);
}

function generateDemoReply(text) {
  const lower = text.toLowerCase();

  if (lower.includes("hello") || lower.includes("hi")) {
    return "Hello! I am Zyvaron.AI. I can help with ideas, writing, learning, coding plans, business plans, and productivity.";
  }

  if (lower.includes("code") || lower.includes("website")) {
    return "I can help you plan and build websites. Real coding assistant mode will be connected later using an AI API.";
  }

  if (lower.includes("image")) {
    return "Image creation is planned for Zyvaron.AI. This button is ready in UI, but real image AI will be added later.";
  }

  if (lower.includes("business") || lower.includes("money")) {
    return "To make money with Zyvaron.AI, first launch a clean free version, then add Pro plan, AI tools, and user accounts.";
  }

  return "This is Zyvaron.AI demo mode. Real AI answers will be connected later with a secure backend. Your question was: " + text;
}

function showToolMessage(text) {
  addBotMessage(text);
}

function newChat() {
  chatBox.innerHTML = "";
  addBotMessage("New chat started. Ask Zyvaron anything.");
}

function isBlockedContent(text) {
  const blockedWords = [
    "18+",
    "porn",
    "sex",
    "nude",
    "xxx"
  ];

  const lower = text.toLowerCase();
  return blockedWords.some(word => lower.includes(word));
}

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, function (value) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[value];
  });
}

function scrollChat() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

document.querySelectorAll(".social-btn").forEach(button => {
  button.addEventListener("click", () => {
    alert("Google/Apple login needs Firebase setup. We will add real login in the next step.");
  });
});
