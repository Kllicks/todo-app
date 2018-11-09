

function todoToItem(todoObject) {
    return `
        <li class="todo-list-item">
            <a href="#">
                ${todoObject.names}
            </a>
        </li>

    `;
}

function todoList(arrayOfTodos) {
    const todoItems = arrayOfTodos.map(todoToItem).join(``);
    return `
        <ul>${todoItems}</ul>
    `;
}

module.exports = todoList;