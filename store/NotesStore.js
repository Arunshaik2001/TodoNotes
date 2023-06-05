import { createContext, useEffect, useState } from "react";
import { deleteNoteItem, fetchNotes, insertNoteItem, updateNoteItem } from "../utils/database/NoteDatabase";

export const NotesContext = createContext({
    notes: [],
    addNote: ({ title, description }) => { },
    updateNote: (id, { title, description }) => { },
    deleteNote: (id) => { }
})

function NotesContextProvider({ children }) {

    const [notesList, setNotesList] = useState([])

    useEffect(()=>{
        async function loadNotes(){
            const notes = await fetchNotes()
            setNotesList(notes)
        }

        loadNotes()
    }, [])

    function addNote({ title, description }) {
        const date = new Date();

        const formattedDate = date.toLocaleString("en-GB", {
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
            date: formattedDate
        }

        notesList.unshift(newValues)
        setNotesList(notesList)

        insertNoteItem(newValues.id, newValues.title, newValues.description, newValues.date).then((result)=>{
            console.log(result)
        })
    }

    function updateNote(id, { title, description }) {
        const noteIndex = notesList.findIndex((item) => item.id === id)
        const currentNote = notesList[noteIndex]
        const date = new Date();

        const formattedDate = date.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });

        const newNote = {
            ...currentNote,
            title: title ?? currentNote.title,
            description: description ?? currentNote.description,
            date: formattedDate,
        }

        notesList[noteIndex] = newNote

        updateNoteItem(newNote.id, newNote.title, newNote.description, newTodo.date).then((result)=>{
            console.log(result)
        })
    }

    function deleteNote(id) {
        notesList.filter((item) => item.id !== id)
        deleteNoteItem(id)
    }

    const value = {
        notes: notesList,
        addNote: addNote,
        updateNote: updateNote,
        deleteNote: deleteNote
    }

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesContextProvider