import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    let darkNotes = [];
    let logedInUser="Unknown-User";
    const [notes, setNotes] = useState(darkNotes);
    const [currentUser, setCurrentUser] = useState(logedInUser);
        // function for gettign Information of loged in user with help of auth-token
        const logedinUserDetail=async()=>{
            const resp=await fetch("http://localhost:5000/api/auth/getuser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                
                // body:JSON.stringify({})
            });
            let data=await resp.json();
            let currentUser=data.name;
            setCurrentUser(currentUser);
        }
    //Fetching all notes From API
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
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
                "auth-token": localStorage.getItem('token'),
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
                "auth-token": localStorage.getItem('token'),
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
                "auth-token": localStorage.getItem('token'),
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

        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, logedinUserDetail,currentUser}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;