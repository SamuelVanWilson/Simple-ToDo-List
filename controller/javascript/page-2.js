import { user } from "./page-1.js";

let form = document.getElementById('formToDo'); // Mengganti selector ke form
let toDo = document.getElementById('toDoBox');
let inputField = document.getElementById('inputField');
let username = document.getElementById('username');
let notif = document.getElementById('notif');
let tombol = document.getElementById('li');
let navigasi = document.querySelectorAll('li>a')

let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

function createParagraph(todo, isCompleted) {
  let paragraf = document.createElement('p');
  let checkBox = document.createElement('input')
  let div = document.createElement('div')
  checkBox.setAttribute('type', 'checkbox')
  paragraf.innerText = todo;
  paragraf.classList.add('paragrafStyle');
  div.classList.add('boxTodoStyle')
  toDo.appendChild(div)
  div.appendChild(paragraf);
  div.appendChild(checkBox)

  if (isCompleted) {
    paragraf.style.textDecoration = "line-through";
  }

  let deleteTimeout;
  div.addEventListener('click', () => {
    if (!isCompleted) {
      paragraf.style.textDecoration = "line-through";
      isCompleted = true;
      deleteTimeout = setTimeout(() => {
        toDoList = toDoList.filter(t => t.todo !== todo);
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
        toDo.removeChild(div);
      }, 1000);
    } else {
      clearTimeout(deleteTimeout);
      paragraf.style.textDecoration = "none";
      isCompleted = false;
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

form.addEventListener('submit', (event) => {
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

tombol.addEventListener('click', (e) => {
  notif.classList.toggle('disable');
  e.preventDefault()
});

navigasi.forEach(e => {
  e.addEventListener('click', (event)=>{
    event.preventDefault();
    return alert("Fitur belum tersedia, pembuatnya sedang malass");
  })
});