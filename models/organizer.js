const mongoose= require('mongoose')

const organizerSchema = new mongoose.Schema({
    name: {
    type: String,
    trim:true,
    required: true
    },
    email: {
    type: String,
    trim:true,
    required: true
     },
    password: {
    type: String,
    trim:true,
    required: true
    }
})

module.exports= mongoose.model('organizer',organizerSchema) 
