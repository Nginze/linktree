const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./User')
const verifyPassword = require('./passwordConfig')
const { deserializeUser } = require('passport')

module.exports = function(passport){passport.use('local', new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
    },
    (email,password, done) => {
         User.findOne({email:email})
            .then((user) => {

                if(!user){
                    return done(null, false)
                }
                if(verifyPassword(user.password, password)){
                    return done(null, user)
                }
                else{
                    return done(null, false)
                }
            
            })
             .catch(err => console.log(err))
                
            
     })
)

passport.serializeUser((user,done)=>{
    console.log('serializeuser')
    console.log(user)
    return done(null,user)
})

passport.deserializeUser((user, done)=>{
    console.log("deserializeUser")
    console.log(user)
    User.findOne({_id:user._id})
        .then((user)=>{
            
            return done(null,user)
        })
        .catch(err => console.log(err))
})
}