import { createContext, useEffect, useState } from "react";
import { deleteTodoItem, fetchTodos, insertTodo, updateTodoItem } from "../utils/database/TodoDatabase";
import { storeTodo, updateTodoOnline } from "../utils/network/FirebaseTodoDB";

const TodoType = {
    TODO: 'todo',
    COMPLETED: 'completed'
}

export const TodosContext = createContext({
    todos: [],
    addTodo: ({ title, description, scheduledDate}) => { },
    updateTodo: (id, { title, description, scheduledDate, todoState}) => { },
    deleteTodo: (id) => { }
})

function TodosContextProvider({ children }) {

    const [todosList, setTodosList] = useState([])

    useEffect(()=>{
        async function loadTodos(){
            const todos = await fetchTodos()
            setTodosList(todos)
        }

        loadTodos()
    }, [])

    function addTodo({ title, description, scheduledDate}) {
        const createDate = new Date();

        const formattedCreationDate = createDate.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });

        const id = (Math.random() * 10000000).toString().split(".")[0]

        const newValues = {
            id: id,
            title: title,
            description: description,
            date: formattedCreationDate,
            scheduledDate: scheduledDate,
            todoState: TodoType.TODO
        }

        todosList.unshift(newValues)
        setTodosList(todosList)

        insertTodo(newValues.id, newValues.title, newValues.description, newValues.scheduledDate, newValues.date, newValues.todoState).then((result)=>{
            console.log(result)
        })

        storeTodo(newValues)
        return id
    }

    function updateTodo(id, {title, description, scheduledDate, todoState}) {
        const todoIndex = todosList.findIndex((item) => item.id === id.toString())
        const currentTodo = todosList[todoIndex]
        const date = new Date();


        const formattedDate = date.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });

        const newTodo = {
            ...currentTodo,
            title: title ?? currentTodo.title,
            description: description ?? currentTodo.description,
            date: formattedDate,
            scheduledDate: scheduledDate ?? currentTodo.scheduledDate,
            todoState: todoState ?? currentTodo.todoState
        }

        todosList[todoIndex] = newTodo

        updateTodoItem(newTodo.id, newTodo.title, newTodo.description, newTodo.scheduledDate, newTodo.date, newTodo.todoState).then((result)=>{
            console.log(result)
        })

        updateTodoOnline(newTodo.id, newTodo)
    }

    function deleteTodo(id) {
        todosList.filter((item) => item.id !== id)
        deleteTodoItem(id)
    }

    const value = {
        todos: todosList,
        addTodo: addTodo,
        updateTodo: updateTodo,
        deleteTodo: deleteTodo
    }

    return (
        <TodosContext.Provider value={value}>
            {children}
        </TodosContext.Provider>
    )
}

export default TodosContextProvider