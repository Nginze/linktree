const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/login', passport.authenticate('local'), (req,res)=>{
    if(req.user){
        res.json({email:req.user.email, passowrd:req.user.password, ok:true})
       
        
       
    }
    
    else{
        res.json({ok:false})
    }
    
})

module.exports = router