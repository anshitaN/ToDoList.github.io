// var dt = new Date();
// document.getElementById("datetime").innerHTML = dt.toLocaleString();
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck);
const filterOption=document.querySelector(".filter-todo");
filterOption.addEventListener('click', filterTodo);
 document.addEventListener("DOMContentLoaded", getTodos);

function addTodo(e) {
  //Prevent natural behaviour
  e.preventDefault();
  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText=todoInput.value;
  saveLocalTodos(todoInput.value);
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value=" ";


  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="ri-check-line"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="ri-delete-bin-fill"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //attach final Todo
  todoList.appendChild(todoDiv);



}


function deleteCheck(e)
{
  const item=e.target;
  if(item.classList[0]==='trash-btn')
  {
    const todo=item.parentElement;
    todo.classList.add("fall")
    todo.addEventListener("transitionend", function(){
      todo.remove();
    });
  
  }

  if(item.classList[0]==='complete-btn'){
    const todo=item.parentElement;
    todo.classList.toggle('completed');
  }
}
function filterTodo(e)
{
  const todos=todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display="flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display="flex";
        }
        else{
          todo.style.display="none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")){
          todo.style.display="flex";
        }
        else{
          todo.style.display="none";
        }
        break;
    }

  });
}
function saveLocalTodos(todo)
{
  let todos;
  if(localStorage.getItem("todos")===null)
  {
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){
  let todos;
  if(localStorage.getItem('todos')===null)
  {
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText=todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
   //Add todo to local storage
   todoInput.value=" ";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="ri-check-line"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="ri-delete-bin-fill"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  })

}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}



