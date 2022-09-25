import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";

const Noteitem = (props) => {
    const context= useContext(noteContext);
    const {deleteNote}= context
    const {note,updateNote} = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-header" >
                    <h4 className="py-1">{note.title}</h4>
                </div>
                <div className="card-body">
                    <h5 className="py-1"><em><strong>{note.tag}</strong></em></h5>
                    <p>{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(note._id);props.showAlert("Note Deleted Successfully.","success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}


export default Noteitem
