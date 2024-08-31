import express from "express";
const prometheusMiddleware = require('express-prometheus-middleware');
//import promClient from "prom-client"; we don't need to use here 
const app = express();

app.use(prometheusMiddleware({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,// Collects default metrics such as memory, CPU usage, etc.
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],// Histogram buckets for request duration->response sizes
  }));

app.get('/user',async(req,res)=>{
    await new Promise((resolve) => setTimeout(resolve, 1000));
    res.status(200).json({
        name:"akshat"
    })
});

app.listen(3000);