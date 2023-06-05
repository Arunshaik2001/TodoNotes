import * as SQLite from 'expo-sqlite'


const database = SQLite.openDatabase('notes.db');

export function initNoteDB() {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS notes (
            id TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            date TEXT NOT NULL
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

  export function insertNoteItem(id, title, description, date) {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO notes (id, title, description, date) VALUES (?, ?, ?, ?)`,
          [
            id,
            title,
            description,
            date
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

  export function fetchNotes() {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM notes',
          [],
          (_, result) => {
            const notes = [];
  
            for (const dp of result.rows._array) {
            notes.push(
                {
                    id: dp.id,
                    title: dp.title,
                    description: dp.description,
                    date: dp.date
                }
              );
            }
            resolve(notes);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  
    return promise;
  }

  export function fetchNote(id) {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM notes WHERE id = ?',
          [id],
          (_, result) => {
            const dp = result.rows._array[0];
            const note = {
                id: dp.id,
                title: dp.title,
                description: dp.description,
                date: dp.date
            }
            
            resolve(note);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  
    return promise;
  }

  export function updateNoteItem(id, title, description, date) {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `UPDATE notes SET id = ?, title = ?, description = ?, date = ?`,
          [
            id,
            title,
            description,
            date
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

  export function deleteNoteItem(id){
    const promise = new Promise((resolve, reject)=>{
        database.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM notes where id = ?',
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