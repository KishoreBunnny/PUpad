const mongoose=require('mongoose');


const NoteSchema=new mongoose.Schema({
    code:{
        type:String,
        required: true
    },
    text:{
        type:String
    }
},{
    timestamps:true

});

const Notes=mongoose.model('NoteSchmea',NoteSchema);

module.exports=Notes;
