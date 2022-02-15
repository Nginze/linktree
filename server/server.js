const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const cors = require('cors')
const SignUp = require('./routes/signup')
const Login = require('./routes/login')
const Users = require('./routes/users')
const passport = require('passport')
const session = require('express-session')

var connection = mongoose.connect('mongodb+srv://Jonathan:guuk12jona@cluster0.vnne0.mongodb.net/linktreeUsers', { useNewUrlParser: true,  useUnifiedTopology: true  },(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('connected to db....')
    }
})
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: false ,
    cookie:{
      maxAge:6000,
      domain: 'localhost:3000'
    
    }
  }))

app.use(passport.initialize())
app.use(passport.session())

require('./passportConfig')(passport)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin : 'http://localhost:3000',
  credentials: true
}))
app.use(Login)
app.use(SignUp)
app.use(Users)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})