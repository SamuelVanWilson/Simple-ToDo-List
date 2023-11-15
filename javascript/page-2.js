import { user } from "./page-1.js";
let button = document.getElementById('btn')
let toDo = document.getElementById('toDoBox')
let inputField = document.getElementById('inputField')
let username = document.getElementById('username')
let notif = document.getElementById('notif')
let tombol = document.getElementById('tombol')

tombol.addEventListener('click', () => {
    notif.classList.toggle('disable')
})
username.innerText = user
button.addEventListener('submit', (event) => {
    if (inputField.value.trim() === "") {
        alert("Input tidak boleh kosong atau berisi spasi");
        inputField.value = "";
        event.preventDefault();
        return
    } 
        let paragraf = document.createElement('p')
        paragraf.innerText = inputField.value
        paragraf.classList.add('paragrafStyle')
        toDo.appendChild(paragraf)
        inputField.value = "";
        event.preventDefault()
    
        let isCompleted = false; 
        let deleteTimeout;
        
        paragraf.addEventListener('click', () => {
            if (!isCompleted) {
                paragraf.style.textDecoration = "line-through";
                isCompleted = true;
                console.log(isCompleted)
                deleteTimeout = setTimeout(() => {
                    toDo.removeChild(paragraf);
                }, 1000);
            } else {
                clearTimeout(deleteTimeout);
                paragraf.style.textDecoration = "none"; 
                isCompleted = false; 
                console.log(isCompleted)
            }
        });
    })
console.log(user)

