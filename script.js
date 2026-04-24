// ===== ELEMENTS =====
const screens = ["welcome","intro","login","app"];
const chat = document.getElementById("chat");
const input = document.getElementById("input");

let userName = "User";
let blockedCount = 0;

// ===== SCREEN CONTROL =====
function show(id){
  screens.forEach(s => document.getElementById(s).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ===== LOGIN =====
function login(){
  const name = document.getElementById("name").value.trim() || "User";
  const pass = document.getElementById("pass")?.value || "123";

  if(!pass){
    alert("Enter password");
    return;
  }

  userName = name;

  document.getElementById("user").innerText = userName;
  document.getElementById("hi").innerText = "Hi " + userName;
  document.getElementById("av").innerText = userName[0].toUpperCase();

  show("app");

  newChat();
}

// ===== CHAT =====
async function send(){
  const text = input.value.trim();
  if(!text) return;

  addMsg(text,"user");
  input.value = "";

  addTyping();

  const res = await fetch("/api/chat", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message:text})
  });

  const data = await res.json();

  removeTyping();
  addMsg(data.reply,"bot");
}
    addMsg(generateReply(text),"bot");

  },700);
}

// ===== MESSAGE UI =====
function addMsg(text,type){
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = (type==="user" ? "You: " : "Zyvaron: ") + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ===== TYPING =====
function addTyping(){
  const div = document.createElement("div");
  div.id = "typing";
  div.className = "msg bot";
  div.innerText = "Zyvaron is thinking...";
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping(){
  const t = document.getElementById("typing");
  if(t) t.remove();
}

// ===== DEMO AI =====
function generateReply(t){
  const x = t.toLowerCase();

  if(x.includes("hello") || x.includes("hi"))
    return "Hello " + userName + "! How can I help you?";

  if(x.includes("code"))
    return "I support HTML, CSS, JavaScript, Python, Java, C, C++, React and more.";

  if(x.includes("website"))
    return "You are building Zyvaron.AI. Next step: connect real AI API.";

  if(x.includes("money"))
    return "Use freemium model: free users + paid premium tools.";

  return "Demo response: " + t;
}

// ===== SAFETY =====
function isBlocked(t){
  const bad = ["porn","sex","xxx","18+","nude"];
  return bad.some(w => t.toLowerCase().includes(w));
}

// ===== TOOLS =====
function toggleTools(){
  document.getElementById("tools").classList.toggle("show");
}

function msg(t){
  addMsg(t + " tool coming soon","bot");
}

function newChat(){
  chat.innerHTML = "";
  addMsg("✨ New chat started. Ask anything.","bot");
}

// ===== RECENT CHATS =====
function saveRecent(text){
  let arr = JSON.parse(localStorage.getItem("zyvaronChat") || "[]");
  arr.unshift(text);
  arr = [...new Set(arr)].slice(0,8);
  localStorage.setItem("zyvaronChat", JSON.stringify(arr));
}

// ===== ENTER KEY =====
input.addEventListener("keydown", e=>{
  if(e.key === "Enter") send();
});

// ===== SOCIAL LOGIN DEMO =====
function socialLogin(type){
  alert(type + " login needs Firebase setup");
}
