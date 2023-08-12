import React, { useContext }  from 'react'
// imorting NoteContext for using it in useContext to use as a contextApI
import NoteContext from '../context/notes/NoteContext'
import Noteitems from './Noteitems';



export default function Home() {
  const context = useContext(NoteContext);
  const {notes,setNotes}=context;
  return (
    <>
   <div className="container">
    <h2>Your-Notes:</h2>
    <div className="container">
      <div className="row">

      {notes.map((note,index)=>{
        return <Noteitems note={note} key={index}/>
        
      })}
      </div>
    </div>
   </div>
    </>
  )
}

