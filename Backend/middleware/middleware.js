

const express = require("express")
const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) =>{
    const token = req.header('authorization')
    if (!token){
     return res.status(404).json({msg:"Unauthorized Please Login Again.."})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()

    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"Error To Veryfying Token..."})
    }
}


module.exports={
    verifyToken
}