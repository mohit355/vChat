const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".container");
var audio = new Audio("ring.mp3");
const names = prompt("Enter your name to join the chat ");

socket.emit("new-user-joined", names);

const append = (message, position) => {
  const msgElement = document.createElement("div");
  msgElement.innerHTML = message;
  msgElement.classList.add("message");
  msgElement.classList.add(position);
  messageContainer.append(msgElement);
  if (position == "left") {
    audio.play();
  }
};

socket.on("user-joined", (data) => {
  append(`${data} joined the chat`, "left");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = "";
  if (messageInput != "") {
    message = messageInput.value;
  } else {
    alert("message box is empty");
  }

  append(`you: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = " ";
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("chat-left", (name) => {
  append(`${name} left the chat`, "left");
});
