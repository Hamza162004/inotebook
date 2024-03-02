import React, { useContext, useState,useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const context = useContext(NoteContext);
  const {addnote} = context;
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      
    }else{
      navigate('/login')
    }
  },[])

  const [note,setnote] = useState({title : "" , description : "" , tag : "Default"})
  const HandleSubmit = (e) =>{
    e.preventDefault();
    addnote(note.title,note.description,note.tag);
    setnote({title : "" , description : "" , tag : ""})
    props.showAlert('Note was Added Successfully','success')

  }

  const onchange = (e) =>{
    setnote({...note , [e.target.name] : e.target.value})
  }

 
 
  return (
    <>
    
      <div className="container">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" name='title' id="title" value={note.title} onChange={onchange} required minLength={5}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id='description' value={note.description} name='description' onChange={onchange} required minLength={5}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="text" className="form-control" name='tag' id="tag" value={note.tag} onChange={onchange} required ></input>
          </div>
          <button disabled={note.title.length <5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={HandleSubmit}>Submit</button>
        </form>
      </div>
     
    </>
  )
}

export default Home
