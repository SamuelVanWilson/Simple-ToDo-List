import { user } from "./page-1.js";

let button = document.getElementById('btn');
let toDo = document.getElementById('toDoBox');
let inputField = document.getElementById('inputField');
let username = document.getElementById('username');
let notif = document.getElementById('notif');
let tombol = document.getElementById('tombol');

let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

function createParagraph(todo, isCompleted) {
  let paragraf = document.createElement('p');
  paragraf.innerText = todo;
  paragraf.classList.add('paragrafStyle');
  toDo.appendChild(paragraf);

  if (isCompleted) {
    paragraf.style.textDecoration = "line-through";
  }

  let deleteTimeout;
  paragraf.addEventListener('click', () => {
    if (!isCompleted) {
      paragraf.style.textDecoration = "line-through";
      isCompleted = true;
      console.log(isCompleted);
      deleteTimeout = setTimeout(() => {
        toDoList = toDoList.filter(t => t.todo !== todo);
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
        toDo.removeChild(paragraf);
      }, 1000);
    } else {
      clearTimeout(deleteTimeout);
      paragraf.style.textDecoration = "none";
      isCompleted = false;
      console.log(isCompleted);
    }

    toDoList.find(t => t.todo === todo).isCompleted = isCompleted;
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  });

  return paragraf;
}

toDoList.forEach(todoObj => {
  createParagraph(todoObj.todo, todoObj.isCompleted);
});

username.innerText = user;

tombol.addEventListener('click', () => {
  notif.classList.toggle('disable');
});

button.addEventListener('submit', (event) => {
  event.preventDefault();

  if (inputField.value.trim() === "") {
    alert("Input tidak boleh kosong atau berisi spasi");
    inputField.value = "";
    return;
  }

  let todoObj = { todo: inputField.value, isCompleted: false };
  let paragraf = createParagraph(todoObj.todo, todoObj.isCompleted);
  toDoList.push(todoObj);

  localStorage.setItem('toDoList', JSON.stringify(toDoList));

  inputField.value = "";
});
