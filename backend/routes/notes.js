const express=require ('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Notes= require('../model/Notes');
const { body, validationResult } = require('express-validator');



// Endpoint#1 for fetching notes of user that is currently online
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
    const notes= await  Notes.find({user:req.user.id})
    res.json(notes);
} catch (error) {
    console.error(error.message);
     res.status(500).send("Internal Error")   
}
})
// Endpoint#2 for Add-Note of user that is currently online
router.post('/addnote',fetchuser,[
    body("title","Please Enter Title of at-least 6Characters").isLength({min:5}),
    body("description","Please Enter Description of at-least 6Characters").isLength({min:5}),
],async(req,res)=>{
    try {
        
  
      // array destructring ki help sy mei req.body sy any wala data apny scehma ki help sy notes ki collection mein daal doo ga laikn jwt sy or fetchuser waly hamary function sy or auth-token ki help sy mei usi user ka note banao gaa jo online ho ga
      const {title,description,tag}=req.body;

    const validationError=validationResult(req);
    if(!validationError.isEmpty()){
        res.status(400).send({error:validationError.array()})
    }
    const note= new Notes({
        title,description,tag, user:req.user.id,
    })
    const savemyNotes= await note.save();
      res.json(savemyNotes);
    } catch (error) {
        console.error(error.message);
     res.status(500).send("Internal Error")   
    }
})

// Endpoint#3 for Updating - Notes of user that is currently online
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
        
   
    const {title,description,tag}=req.body;

    // creating new note after updating
    const updatedNote={};
    if(title){updatedNote.title=title};
    if(description){updatedNote.description=description};
    if(tag){updatedNote.tag=tag};
    // Find the note by its id and also check the user that is login is that his own note that he is trying to update
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not-Found")}
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("You are Not-Allowed to Access Other Notes")
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:updatedNote},{new:true});
    res.json({note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error")   
}
})

// Endpoint#4 for Deleting-Notes of user that is currently online

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

    try {
 
        // const {title,description,tag}=req.body;
    
       
        // Find the note by its id and also check the user that is login is that his own note that he is trying to update
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not-Found")}
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("You are Not-Allowed to Access Other Notes")
        }
        note=await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"note is deleted"+note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")   
    }


})

module.exports=router;
