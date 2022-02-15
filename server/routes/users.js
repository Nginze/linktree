const express = require('express')
const router = express.Router()
const User = require('../User')
const passport = require('passport')
require('../passportConfig')(passport)

router.get('/users/:user',(req,res)=>{
    
    email = req.params.user + "@gmail.com"
    User.findOne({email:email})
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.post('/links/:user',(req, res)=>{
  
    email = req.params.user + "@gmail.com"
    User.findOneAndUpdate({email:email},{
        $push : {
            links:{
                title:req.body.title,
                url:req.body.url
            }
        }
    })
        .then(()=>{
            console.log('link added ')
        })
})
router.post('/logout/:user', (req,res)=>{
  
    email = req.params.user + "@gmail.com"
    User.findOne({email:email})
    .then((user) => {
        req.logout(user,(err)=>{
            if(err){
                res.json({ok:true})
                console.log(err)
            }
            else{
                res.json({ok:true})
                console.log(req.isAuthenticated())
            }
        })
    
    })
     .catch(err => console.log(err))
})
module.exports= router