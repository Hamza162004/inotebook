import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import { useNavigate } from 'react-router-dom';

const Note = (props) => {
    const {note,toggleNote} = props
    const context = useContext(NoteContext);
    const {deleteNote,fetchNotes} = context;
    const navigate = useNavigate()
      useEffect(()=>{
        if(localStorage.getItem('token')){
          fetchNotes();
        }else{
          navigate('/login')
        }
      },[])
      
  return (
    <>
    <div className="card col-md-3 mx-4 my-3">
    <div className="card-body">
      <h3 className="card-title">{note.title}</h3>
      <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
      <p className="card-text">{note.description}</p> 
      <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{toggleNote(note)}} style={{color:"blue"}}></i>
      <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id); props.showAlert('Note was Deleted Successfully','success')}} style={{color:"red"}}></i>
    </div>
  </div>
  </>
  )
}

export default Note
