const express = require('express')
const connectDB = require('./config/connectDB')
const authRouter =require('./routes/authRouter')
const app = express()
//middleware
app.use(express.json())
app.use('/api/auth',authRouter)


require('dotenv').config({path:'./config/.env'})

// connect DB
connectDB()





//start the server
const PORT= process.env.PORT|| 5000
app.listen(PORT, err=>err? console.error(err):
console.log(`the server is running on port ${PORT}`))