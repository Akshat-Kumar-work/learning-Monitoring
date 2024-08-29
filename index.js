const { doSomeHeavyTask } = require('./util.js');
const express = require("express");

const app = express();


const port = 8000;

app.get('/',(req,res)=>{
    return res.json ({message:'hello from home route'})
});


app.get('/slow',async(req,res)=>{
    try{
        const timeTaken = await doSomeHeavyTask();
    return res.status(200).json({
        status:"Success",
        message:`Heavy task completed in ${timeTaken} ms`
    })
    }catch(error){
        return res.status(500).json({error:"Internal server errror"});
    }
})

app.listen(port,()=>{
    console.log("server running fine")
})