import * as SQLite from 'expo-sqlite'


const database = SQLite.openDatabase('todos.db');

export function init() {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS todos (
            id TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            scheduledDate TEXT NOT NULL,
            date TEXT NOT NULL,
            todoState TEXT NOT NULL
          )`,
          [],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  
    return promise;
  }

  export function insertTodo(id, title, description, scheduledDate, date, todoState) {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO todos (id, title, description, scheduledDate, date, todoState) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            id,
            title,
            description,
            scheduledDate,
            date,
            todoState
          ],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  
    return promise;
  }

  export function fetchTodos() {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM todos',
          [],
          (_, result) => {
            const todos = [];
  
            for (const dp of result.rows._array) {
            todos.push(
                {
                    id: dp.id,
                    title: dp.title,
                    description: dp.description,
                    scheduledDate: dp.scheduledDate,
                    date: dp.date,
                    todoState: dp.todoState
                }
              );
            }
            resolve(todos);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  
    return promise;
  }

  export function fetchTodo(id) {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM todos WHERE id = ?',
          [id],
          (_, result) => {
            const dp = result.rows._array[0];
            const todo = {
                id: dp.id,
                title: dp.title,
                description: dp.description,
                scheduledDate: dp.scheduledDate,
                date: dp.date,
                todoState: dp.todoState
            }
            
            resolve(todo);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  
    return promise;
  }

  export function updateTodoItem(id, title, description, scheduledDate, date, todoState) {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `UPDATE todos SET id = ?, title = ?, description = ?, scheduledDate = ?, date = ?, todoState = ?`,
          [
            id,
            title,
            description,
            scheduledDate,
            date,
            todoState
          ],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  
    return promise;
  }

  export function deleteTodoItem(id){
    const promise = new Promise((resolve, reject)=>{
        database.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM todos where id = ?',
                [id],
                (_, result) => {
                    resolve(result)
                },
                (_, error) => {
                    reject(error);
                }
            )
        })
    })

    return promise
  }