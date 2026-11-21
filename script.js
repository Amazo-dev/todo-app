const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');
const totalText = document.getElementById('total');
const clearBtn = document.getElementById('clearBtn');

// Load from localStorage or start with empty array
let todos = JSON.parse(localStorage.getItem('myTodos')) || [];

const save = () => {
    localStorage.setItem('myTodos', JSON.stringify(todos));
};

const render = () => {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
      const li= document.createElement('li');
      if (todo.done) li.classList.add('done');
      li.innerHTML = `<span>${todo.text}</span> <button>Delete</button>`;

      // 1. Click text = mark done
      li.querySelector('span').addEventListener('click', () => {
        console.log('You clicked text number', index);
        todos[index].done = !todos[index].done;
        save();
        render();
      });

      // 2. Click Delete = remove that one
      li.querySelector('button').addEventListener('click', () => {
        console.log('You clicked delete for', index);
        todos.splice(index, 1);    // remove 1 item at this position
        save();
        render();
      });

      li.querySelector('span').addEventListener('click', () => {
        todos = todos.filter((_, i) => i !== index);
        save(); render();
      });

      list.appendChild(li)
    });
    
    totalText.textContent = `Total: ${todos.length}`;
};

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    todos = [...todos, { text, done: false }];
    input.value = '';
    save(); render();
});

input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") addBtn.click();
});

clearBtn.addEventListener('click', () => {
    console.log('clear clicked');
    todos = []; // clear everything
    save();
     render();
});

render();


