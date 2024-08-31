import express from "express";
const app = express();

app.get('/user',(req,res)=>{
    res.json({
        name:"akshat"
    })
})

app.post('/user',(req,res)=>{
    res.json({
        name:"akshat"
    })
})

app.listen(3000);