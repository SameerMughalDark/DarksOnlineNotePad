import{ React, useContext,useState }from 'react'
import NoteContext from '../context/notes/NoteContext';



function AddNote() {
const context=useContext(NoteContext);
const {addNote}=context;
    const [note,setNotes]=useState({title:"",description:"",tag:""});
    const onChange=(e)=>{
        setNotes({...note,[e.target.name]: e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNotes({title:"",description:"",tag:""})
    }
  return (

    <form> 
    <div className="mb-3">
    <h2 align='center' className='my-3'>Add Your New Note Here:</h2>

      <label htmlFor="title" className="form-label">Title</label>
      <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title}/>
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <input type="text" className="form-control" id="description" aria-describedby="emailHelp" name="description" onChange={onChange} value={note.description} />
    </div>
    <div className="mb-3">
      <label htmlFor="tag" className="form-label">Tag</label>
      <input type="text" className="form-control" id="tag" aria-describedby="emailHelp" name="tag" onChange={onChange} value={note.tag}/>
    </div>

  
    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add-Note</button>
  </form>
  )
}

export default AddNote
