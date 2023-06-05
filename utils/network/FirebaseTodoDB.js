import axios from 'axios';

const BACKEND_URL = 'https://todonotes-f7dc9-default-rtdb.firebaseio.com';

export async function storeTodo(todoData) {
    const response = await axios.put(BACKEND_URL + `/todos/${todoData["id"]}.json`, todoData);
    const id = response.data.name;
    return id;
}

export async function fetchTodosOnline() {
    const response = await axios.get(BACKEND_URL + '/todos.json');

    const todos = [];

    for (const key in response.data) {
        const todoObj = {
            id: response.data[key].id,
            title: response.data[key].title,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
            scheduledDate: response.data[key].scheduledDate,
            todoState: response.data[key].todoState
        };
        todos.push(todoObj);
    }

    return todos;
}

export function updateTodoOnline(id, todoData) {
    return axios.put(BACKEND_URL + `/todos/${id}.json`, todoData);
}

export function deleteTodoOnline(id) {
    return axios.delete(BACKEND_URL + `/todos/${id}.json`);
}