import React, { useContext,useRef,useState } from 'react'
import NoteContext from '../context/NoteContext'
import Note from './Note';

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes,  editNote, fetchNotes } = context;

  const toggleNote = (note) => {
    ref.current.click();
    setnote(note)
    console.log(note)
  }
  const ref = useRef(null);
  const closeref = useRef(null);

  const [note,setnote] = useState({_id : "", title : "" , description : "" , tag : ""})
  const HandleSubmit = async(e) =>{
    e.preventDefault();
    await editNote(note._id , note.title,note.description,note.tag)
    closeref.current.click();
    fetchNotes();
    props.showAlert('Note was Updated Successfully','success')
    console.log(notes)
  }

  const onchange = (e) =>{
    setnote({...note , [e.target.name] : e.target.value})
  }
  return (
    <>
      
      <button type="button" style={{display:'none'}} ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" value={note.title} name='title' required minLength={5}  id="title" onChange={onchange}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id='description' value={note.description} required minLength={5} name='description' onChange={onchange}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="text" className="form-control" name='tag' value={note.tag} id="tag" required onChange={onchange}></input>
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={closeref} data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.title.length <5 || note.description.length<5} className="btn btn-primary"  onClick={HandleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your notes</h1>
        <hr />
        {notes.map((note) => {
          return (
            <Note note={note} toggleNote={toggleNote} key={note._id} showAlert={props.showAlert}/>
          )
        })}
      </div>
    </>
  )
}

export default Notes
