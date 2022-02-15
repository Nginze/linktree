const express = require('express')
const User = require('../User.js')
const router = express.Router()

router.post('/signup',(req,res)=>{
    console.log(req.isAuthenticated())
   
    var newUser = new User({
        email:req.body.email,
        password:req.body.password
    })
    newUser.save()
        .then((user)=>{
            req.login(user, (err)=>{
                if(err){
                    console.log(err)
                }
                else{
                   
                    console.log(req.isAuthenticated())
                    console.log(req.session )
                    res.json({email:user.email, passowrd:user.password, ok:true})
                    console.log(`${user} saved to database and logged in`)
                    
                }
            })
         

            
        })
        .catch((err)=>{
            res.json({ok:false})
            console.log(err)
        })
        
    
})

module.exports = router