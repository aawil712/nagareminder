// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Get todos from storage
let todos = window.electronAPI.getTodos();

// Render todos
function renderTodos() {
  todoList.innerHTML = '';
  
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(index));
    
    const todoText = document.createElement('span');
    todoText.className = `todo-text ${todo.completed ? 'completed' : ''}`;
    todoText.textContent = todo.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'DELETE';
    deleteBtn.addEventListener('click', () => deleteTodo(index));
    
    li.appendChild(checkbox);
    li.appendChild(todoText);
    li.appendChild(deleteBtn);
    
    todoList.appendChild(li);
  });
}

// Add new todo
function addTodo(text) {
  todos.push({ text, completed: false });
  saveTodos();
  renderTodos();
}

// Toggle todo completion
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Save todos to storage
function saveTodos() {
  window.electronAPI.saveTodos(todos);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      addTodo(text);
      todoInput.value = '';
    }
  });
  
  // Initial render
  renderTodos();
}); 