const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    // name:String,
    image:String
})

const imageModel= mongoose.model("image",imageSchema)
module.exports=imageModel;