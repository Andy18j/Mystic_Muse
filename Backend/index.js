const express = require('express')
const cors = require("cors")
const { connections } = require('./config/db')
const { userRouter } = require('./routes/user.routes')
const { productRouter } = require('./routes/products.routes')
require('dotenv').config()


const app = express()
app.use(express.json())
app.use(cors())
app.use('/user',userRouter)
app.use('/product',productRouter)

app.get('/',(req,res)=>{
    res.send('welcome To the Mystic muse Collections')
})



app.listen(process.env.PORT,async()=>{
    try{
        await connections
        console.log('Connected TO The DB..')

    }
    catch(err){
        console.log(err)
        console.log('Not Connected To The DB')
    }
    console.log(`port is running on the ${process.env.PORT}`)
})