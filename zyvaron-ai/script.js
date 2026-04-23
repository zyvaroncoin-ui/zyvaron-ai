const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app-screen");
const loginForm = document.getElementById("login-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

startBtn.addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  loginScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  const userMessage = document.createElement("div");
  userMessage.className = "user-message";
  userMessage.textContent = message;
  chatBox.appendChild(userMessage);

  userInput.value = "";

  const botMessage = document.createElement("div");
  botMessage.className = "bot-message";
  botMessage.textContent = "Typing...";
  chatBox.appendChild(botMessage);

  setTimeout(() => {
    botMessage.textContent =
      "Zyvaron AI is thinking... (Real AI API will be connected soon)";
  }, 1200);

  chatBox.scrollTop = chatBox.scrollHeight;
}
function showMessage(text) {
  const botMessage = document.createElement("div");
  botMessage.className = "bot-message";
  botMessage.textContent = text;
  chatBox.appendChild(botMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function newChat() {
  chatBox.innerHTML =
    '<div class="bot-message">Hello! New chat started. Ask Zyvaron anything.</div>';
}

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
