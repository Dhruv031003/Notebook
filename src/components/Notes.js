import React, { useContext, useEffect, useRef, useState } from 'react'
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import noteContext from '../Context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate=useNavigate("")
    const context = useContext(noteContext)

    const { notes, getNotes, editNote } = context;
    
    useEffect(() => {
        if(localStorage.getItem('token')!==null){
            getNotes() 
        }
        else{
            navigate("/login")
        }
        //eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const ref = useRef(null)
    const refClose = useRef(null)

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Note Updated Successfully.","success")
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label my-1">Title</label>
                                    <input onChange={onChange} type="text" minLength={5} required value={note.etitle} name="etitle" className="form-control" id="etitle" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="noteDescription" className="form-label my-1">Description</label>
                                    <input onChange={onChange} type="text" minLength={5} required value={note.edescription} className="form-control" id="edesc" name='edescription' />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="noteDescription" className="form-label my-1">Tag</label>
                                    <input onChange={onChange} type="text" value={note.etag} className="form-control" id='etag' name='etag' />
                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <h5 className="mx-2 my-2">
                    {notes.length === 0 && "No notes to display"}
                </h5>
                {notes.map((note) => {
                    return <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
