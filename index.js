
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');  //image aces
const path=require('path');


mongoose.connect('mongodb://localhost:27017/image-curd')

 
const app=express();
app.use(cors());
app.use(express.json());
// miidle
app.use(express.static('public'))


const imageSchema = new mongoose.Schema({
    // name:String,
    image:String
})

const imageModel= mongoose.model("image",imageSchema)
module.exports=imageModel;
// here specify storage ie,multer.diskStorage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{   
        cb(null, 'public/images')    
    },
    filename:(req, file, cb)=>{   
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})


// assign storage in storage
const upload=multer({
    storage: storage
})



// app.post('/upload', upload.single('file'),(res,req)=>{
// console.log(req.file);
// })
 app.post('/upload', upload.single('file'), (req, res) => {

  
    
     imageModel.create({image:req.file.filename})
    .then(result => res.json(result))    
     .catch(err => console.log(err))
    
   console.log(req.file);
    
 });



app.get('/getimage',(req,res)=>{
    imageModel.find()
    .then(image => res.json(image))
    .catch(err => res.json(err))
   
})

app.listen(2000,()=>{
    console.log('server is running');
})



