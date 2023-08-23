const mongoose=require('mongoose');
// const {schema}=mongoose.schema;

const notesSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }

})

module.exports= mongoose.model('notes', notesSchema);
