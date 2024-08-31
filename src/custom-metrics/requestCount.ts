import client from "prom-client";
import { NextFunction, Request, Response } from "express";

const reqCounter = new client.Counter({
    name:"req_count",
    help:"Total request Count",
    labelNames:["method","route","status_code"]
});


// Register the metric with the Prometheus client registry
client.register.registerMetric(reqCounter);

export const reqCount = (req: Request, res: Response, next: NextFunction)=>{
    const startTime = Date.now();

    //wait for response to come back-> response has an event listener called finish which we can listen on
    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);

        // Increment request counter, inc function provided by prom-client
        reqCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
    });

    next();
}