// retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoCount = document.querySelector("#todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.querySelector("#deleteButton");
// initializing
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTask);
  displayTask();
});
function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({
      text: newTask,
      disabled: false,
    });
  }
  saveToLocalStorage();
  todoInput.value = "";
  displayTask();
}
function displayTask() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("P");
    p.innerHTML = `
    <div class="todo-container">
      <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
      <p id ="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
    </div>
    `;
    p.querySelector(".todo-checkbox ").addEventListener("change", () => {
      toggleTask(index);
    });
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");
  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();
  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTask();
  });
}
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTask();
}
function deleteAllTask() {
  todo = [];
  displayTask();
  saveToLocalStorage();
  displayTask();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
