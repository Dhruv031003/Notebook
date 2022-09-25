import React,{useContext, useState} from 'react'
import noteContext from '../Context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context;
    
    const [note,setNote]=useState({title:"",description:"",tag:""})
    
    const handleClick=(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title:"",description:"",tag:""})
      props.showAlert("Note Added Successfully.","success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }

    return (
    <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label my-1">Title</label>
            <input onChange={onChange} type="text" name="title" value={note.title} className="form-control" id="title" />
          </div>
          <div className="mb-3">
            <label htmlFor="noteDescription" className="form-label my-1">Description</label>
            <input onChange={onChange} type="text" className="form-control" value={note.description} id="desc" name='description'/>
          </div>
          <div className="mb-3">
            <label htmlFor="noteDescription" className="form-label my-1">Tag</label>
            <input onChange={onChange} type="text" className="form-control" value={note.tag} id='tag' name='tag' />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}

export default AddNote
