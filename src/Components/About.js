import {React,useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function About() {
  const darkContext = useContext(NoteContext);
  const {notes}=darkContext;
  return (
    <div className="container">
        A0A!
        <br/>
        My Name is Sameer Abbas Mughal and I Developed this Web-Application for Practice Purpose. 
        <h1>Name:{notes.map((note)=>{return note.description+".\n"})}</h1> 
     
    </div>
  )
}
