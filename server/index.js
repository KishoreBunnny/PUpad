const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const port=process.env.PORT || 8001
const path=require('path');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false, 
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

const Notes=require('./Models/Notes.model')


const app=express();

const _dirname=path.resolve()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
  }));

app.post('/api/code', async (req,res)=>{
    const code=req.body.code
    const readCode=await Notes.findOne({code:code})
    
    
    if(!readCode){
        res.send({
            id:'NoCode'
        })
    }
    else{
        res.send({
           id:readCode._id
        })
    }
   
})

app.post('/api/edit/:codeId', async (req,res)=>{
    const code=req.params.codeId
    const CreatingCode=await Notes.findOne({code:code})
    if(!CreatingCode){

    const text=req.body.text;
    const note=await Notes.create({code:code,text:text})
    res.send({
        'text created':text,
        'id':note._id,
        'code':code
    })
    }
    
})

app.put('/api/edit/:codeId', async (req,res)=>{
    const code=req.params.codeId
    const text=req.body.text;
    const noCode=await Notes.findById(code)
    if(noCode){
        const note=await Notes.findByIdAndUpdate(code, { $set: { text: text } },{ new: true })
    res.send({
        ' updated text':text,
        //'code':code
    })
    }
    else{
        res.status(404).send({msg:'No code found'})
        console.log("No code found")
    }
})

app.get('/api/read/:codeId',async(req,res)=>{
    const code =req.params.codeId;
    const note= await Notes.findById(code)
    if(!note){
        res.status(404).send({msg:'No notes found on this code'})
    }
    else{
        const {text}=note
        res.send(text)
    }
})


app.use(express.static(path.join(_dirname,"/client/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"))
})


app.listen(port,()=>{
    console.log('Server is running ')
})