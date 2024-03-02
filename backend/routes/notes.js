const express = require('express');
const router = express.Router();
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser')

router.get('/fetchNotes',fetchUser,async (req,res)=>{
    const notes = await Note.find({user : req.user.id})
    res.send(notes)
})

router.post('/addNote',fetchUser,[
    body('title','Add a title').exists(),
    body('description','Description should be min length 10').isLength({min:10})

],async (req,res)=>{
    const {title,tag,description} = req.body;
    const note = new Note({
        user:req.user.id,title,tag,description
    })
    const saved = await note.save();
    res.send(saved)
})

router.put('/updateNote/:id',fetchUser,async (req,res)=>{
    const {title,tag,description} = req.body;

    const newNote = {}
    if(title){newNote.title = title}
    if(tag){newNote.tag = tag}
    if(description){newNote.description = description}

    const note = await Note.findById(req.params.id)
    console.log(note)
    if(!note){
        return res.status(400).send('Note not found')
    }else{
        if(note.user.toString()!==req.user.id){
            return res.status(400).send('Updation not allowed')
        }
        const saved = await Note.findByIdAndUpdate(req.params.id, { $set:newNote }, {new:true})
        console.log(saved)
        res.status(200).send(saved)
    }
    
})

router.delete('/deleteNote/:id',fetchUser,async (req,res)=>{
   
    const note = await Note.findById(req.params.id)
    console.log(note)
    if(!note){
        return res.status(400).send('Note not found')
    }else{
        if(note.user.toString()!==req.user.id){
            return res.status(400).send('Deletion not allowed')
        }
        const saved = await Note.findByIdAndDelete(req.params.id)
        
        res.status(200).json({Status : "Success"})
    }
    
})

module.exports = router;