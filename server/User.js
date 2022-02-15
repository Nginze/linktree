const mongoose = require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    links:[{
        title:{
            type:String, 
            required:true
        },
        url:{
            type:String,
            required:true
        }

    }]
})
var User = mongoose.model("LinktreeUser", userSchema)

module.exports = User