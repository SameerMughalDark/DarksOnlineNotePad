import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState =(props)=>{
    let darkNotes=[
        {
            "_id": "64d7c4c034181c62ad1c94fb",
            "user": "64ce0f809550d39c33d68fd0",
            "title": "Karma First Note",
            "description": "Hi My name is Karma dekho koi aa raha hai karmaa",
            "tag": "karma Nostaligic darama",
            "timeStamp": "2023-08-12T17:43:28.746Z",
            "__v": 0
        },
        {
            "_id": "64d7c4e934181c62ad1c94fd",
            "user": "64ce0f809550d39c33d68fd0",
            "title": "Karma Secound Note",
            "description": "Asslam-0-Aliekum! Now I want to become a Muslim Karma",
            "tag": "karma Nostaligic darama Now In Halal(Mode)",
            "timeStamp": "2023-08-12T17:44:09.931Z",
            "__v": 0
        }
    ]
    const [notes, setNotes]=useState(darkNotes);
    return(
        
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;