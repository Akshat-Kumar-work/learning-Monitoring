import express from "express";
import { CountReq } from "./custom-metrics/requestCount";
import { ActiverUserGauge } from "./custom-metrics/customGauge";
import client from "prom-client";
import { reqDuration } from "./custom-metrics/customHistogram";

const app = express();

app.use(express.json());

//using custom middleware
app.use(CountReq);
app.use(ActiverUserGauge)
app.use(reqDuration);

app.get("/user", (req, res) => {
    res.send({
        name: "John Doe",
        age: 25,
    });
});

app.post("/user", (req, res) => {
    const user = req.body;
    res.send({
        ...user,
        id: 1,
    });
});

//exposing metrics endpoint
app.get('/metrics',async(req,res)=>{

 //setting header name as Content-Type and value
 //  (client.register.contentType)=> it is used to get the current metrics from prom client registry
    res.setHeader('Content-Type',client.register.contentType);

    //get the registered metrics from prom client
    const metrics = await client.register.metrics();
    
    res.send(metrics);
})

app.listen(8000);