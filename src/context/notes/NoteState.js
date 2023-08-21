import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    let darkNotes = [];
    const [notes, setNotes] = useState(darkNotes);
    //Fetching all notes From API
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZTBmODA5NTUwZDM5YzMzZDY4ZmQwIn0sImlhdCI6MTY5MTIyNTk4NH0.255-ihHwJg63VHn5HlFRqU6aSrSZdAQCEKMtY3WRN-4",
            },
            // body:JSON.stringify({title,description,tag})
        });
        const data = await response.json();
        // console.log(data)
        setNotes(data);


    }

    // Add Note Function
    const addNote = async (title, description, tag) => {
        const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZTBmODA5NTUwZDM5YzMzZDY4ZmQwIn0sImlhdCI6MTY5MTIyNTk4NH0.255-ihHwJg63VHn5HlFRqU6aSrSZdAQCEKMtY3WRN-4",
            },
            body:  JSON.stringify({ title, description, tag })
        });
        const data = await response.json();
        setNotes(notes.concat(data))
    }

    // Delete Note Function
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZTBmODA5NTUwZDM5YzMzZDY4ZmQwIn0sImlhdCI6MTY5MTIyNTk4NH0.255-ihHwJg63VHn5HlFRqU6aSrSZdAQCEKMtY3WRN-4",
            },

            // body:JSON.stringify({title,description,tag})
        });
         await response.json();
        // means filter all those notes whoose id doesn't match with clickable item id so all notes remain except the that whoose click by us
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit Note Function
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZTBmODA5NTUwZDM5YzMzZDY4ZmQwIn0sImlhdCI6MTY5MTIyNTk4NH0.255-ihHwJg63VHn5HlFRqU6aSrSZdAQCEKMtY3WRN-4",
            },
            body: JSON.stringify({ title, description, tag })
        });
        await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }
    return (

        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;