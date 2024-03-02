import React, {useState } from "react";
import NoteContext from "./NoteContext";

const NoteState =  (props) => {
    const initial = [{}]
    const [notes,setnotes] = useState(initial);
    
    const fetchNotes = async()=>{
      const response = await fetch("http://localhost:5000/api/notes/fetchNotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        }
      });
      const data = await response.json(); 
      console.log(data)
      setnotes(data)
    }

    const addnote = async (title,description,tag) =>{
      const response = await fetch(`http://localhost:5000/api/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body : JSON.stringify({title : title,description : description,tag : tag})
      });
      const data = await response.json(); 
      console.log(data)
    }

    const deleteNote = async(id) =>{
      console.log("Deleting note with id " + id)
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setnotes(newNotes)
      const response = await fetch(`http://localhost:5000/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        }
      });
      const data = await response.json(); 
      console.log(data)
    }

    const editNote = async(id,title,description,tag) =>{
      console.log("Editing note with id " + id)
      const response = await fetch(`http://localhost:5000/api/notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body : JSON.stringify({title,description,tag})
      });
      const data = await response.json(); 
      console.log(data)
    }
   
    return(
       
            <NoteContext.Provider value={{notes,addnote,deleteNote,fetchNotes,editNote}}>
                {props.children}
            </NoteContext.Provider>
       
    )
}

export default NoteState