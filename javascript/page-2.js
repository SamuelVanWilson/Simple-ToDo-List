import { user } from "./page-1.js";

let button = document.getElementById('btn');
let toDo = document.getElementById('toDoBox');
let inputField = document.getElementById('inputField');
let username = document.getElementById('username');
let notif = document.getElementById('notif');
let tombol = document.getElementById('tombol');

let toDoList = JSON.parse(sessionStorage.getItem('toDoList')) || [];

toDoList.forEach(todo => {
  let paragraf = document.createElement('p');
  paragraf.innerText = todo;
  paragraf.classList.add('paragrafStyle');
  toDo.appendChild(paragraf);
});

username.innerText = user;

tombol.addEventListener('click', () => {
  notif.classList.toggle('disable');
});

button.addEventListener('submit', (event) => {
  if (inputField.value.trim() === "") {
    alert("Input tidak boleh kosong atau berisi spasi");
    inputField.value = "";
    event.preventDefault();
    return;
  } 

  let paragraf = document.createElement('p');
  paragraf.innerText = inputField.value;
  paragraf.classList.add('paragrafStyle');
  toDo.appendChild(paragraf);
  inputField.value = "";
  event.preventDefault();

  toDoList.push(paragraf.innerText);

  sessionStorage.setItem('toDoList', JSON.stringify(toDoList));

  let isCompleted = false; 
  let deleteTimeout;

  paragraf.addEventListener('click', () => {
    if (!isCompleted) {
      paragraf.style.textDecoration = "line-through";
      isCompleted = true;
      console.log(isCompleted);
      deleteTimeout = setTimeout(() => {
        toDoList = toDoList.filter(todo => todo !== paragraf.innerText);
        sessionStorage.setItem('toDoList', JSON.stringify(toDoList));

        toDo.removeChild(paragraf);
      }, 1000);
    } else {
      clearTimeout(deleteTimeout);
      paragraf.style.textDecoration = "none"; 
      isCompleted = false; 
      console.log(isCompleted);
    }
  });
});
