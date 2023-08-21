import React, { useContext, useEffect, useRef } from 'react'
// imorting NoteContext for using it in useContext to use as a contextApI
import NoteContext from '../context/notes/NoteContext'
import Noteitems from './Noteitems';
import AddNote from './AddNote';
import { useState } from 'react';



export default function Home() {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
  const onChange = (e) => [
    setNote({...note,[e.target.name]: e.target.value})


  ]
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    ref.current.click();

  }
  return (
    <>

      <div className="container">
        <AddNote />
        <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Launch static backdrop modal
        </button>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Edit Your Note</h5>
                <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-1">

                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle}  />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" aria-describedby="emailHelp" name="edescription" onChange={onChange} value={note.edescription}  />
                  </div>
                  <div className="mb-1">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" aria-describedby="emailHelp" name="etag" onChange={onChange} value={note.etag} />
                  </div>


                  <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="submit"  className="btn btn-primary my-3" onClick={handleClick}>Update-Note</button>
                </form>
              </div>

            </div>
          </div>
        </div>
        <div className="container my-3">
          <h2>Your-Notes:</h2>
          <div className="row ">
            <div className="container mx-2">
              <h6>{notes.length===0 && "Notes are Empty Add Your Firs Note"}</h6>
            </div>
            {notes.map((note) => {
              return <Noteitems note={note} updateNote={updateNote} key={note._id} />

            })}
          </div>
        </div>
      </div>
    </>
  )
}

