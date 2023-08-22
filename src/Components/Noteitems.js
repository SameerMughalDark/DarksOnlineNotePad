import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

function Noteitems(props) {
  const context=useContext(NoteContext);

    const {deleteNote}=context
    const {note,updateNote}=props;
  return (
    <div className="col md-3">

    <div className="card my-2" style={{width:"300px"}} >
      
    <div className="card-body">
    <div className="iconsforactions" style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
      <div className="removeIcon" onClick={()=>{deleteNote(note._id)}}><i className="gg-remove"  ></i></div>
      <div className='editIcon'  onClick={()=>{updateNote(note)}}><i className="gg-pen"></i></div>
      </div>
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">{note.description}</p>
    </div>
  </div>
    </div>
  )
}

export default Noteitems

