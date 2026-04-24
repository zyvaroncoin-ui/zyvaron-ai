const startBtn = document.getElementById("start-btn");
const welcome = document.getElementById("welcome-screen");
const login = document.getElementById("login-screen");
const app = document.getElementById("app-screen");

const form = document.getElementById("login-form");
const input = document.getElementById("user-input");
const chat = document.getElementById("chat-box");

startBtn.onclick = () => {
  welcome.classList.add("hidden");
  login.classList.remove("hidden");
};

form.onsubmit = (e) => {
  e.preventDefault();
  login.classList.add("hidden");
  app.classList.remove("hidden");
};

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  chat.innerHTML += `<div>User: ${text}</div>`;
  input.value = "";

  setTimeout(() => {
    chat.innerHTML += `<div>AI: ${text}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }, 500);
}

function newChat() {
  chat.innerHTML = "New Chat Started";
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
