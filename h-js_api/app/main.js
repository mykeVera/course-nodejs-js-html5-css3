const loadInitialTemplate = () => {
    const template = `
        <h1>Usuarios</h1>
        <form id="user-form">
            <div>
                <label for="username">Nombre:</label>
                <input id="username" name="username" />
            </div>
            <div>
                <label for="lastname">Apellido:</label>
                <input id="lastname" name="lastname" />
            </div>
            <button type="submit">Agregar Usuario</button>
        </form>
        <ul id="user-list"></ul>
    `;
    const body = document.querySelector('body');
    body.innerHTML = template;
}

const getUsers = async () => {
    const response = await fetch('/users');
    const users = await response.json();
    const template = users => `
        <li>${users.username} ${users.lastname} <button data-id="${users._id}">Eliminar</button></li>
    `;
    const userList = document.getElementById('user-list');
    userList.innerHTML = users.map(user => template(user)).join('');
    users.forEach(user => {
        const userNode = document.querySelector(`button[data-id="${user._id}"]`);
        userNode.onclick = async () => {
            await fetch(`/users/${user._id}`, {
                method: 'DELETE'
            });
            userNode.parentNode.remove();
            alert('Usuario eliminado');
        };
    });
}

const addFormListener = () => {
    const userform = document.getElementById('user-form');
    userform.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(userform);
        const data = Object.fromEntries(formData.entries());
        await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        userform.reset();
        getUsers();
    }
}

window.onload = () => {
    loadInitialTemplate();
    addFormListener();
    getUsers();
}