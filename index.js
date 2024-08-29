const { doSomeHeavyTask } = require('./util.js');
const express = require("express");
//importing prom-client
const promClient = require('prom-client');

const app = express();

//step 1 Prometheus
//collecting default metrics of our server
const collectDefaultMetrics = promClient.collectDefaultMetrics;
//registering it
collectDefaultMetrics({register:promClient.register});


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

//step 2 Prometheus
//api to provide all collected metrics
app.get('/metrics',async(req,res)=>{
//we had set the content type into headers
 res.setHeader('Content-Type',promClient.register.contentType);
 //get the metrics from promp client
 const metrics = await promClient.register.metrics();
 //return the metrics in reponse
 res.send(metrics);
})

app.listen(port,()=>{
    console.log("server running fine")
})