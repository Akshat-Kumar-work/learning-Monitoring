import client from "prom-client";
import { NextFunction, Request, Response } from "express";

const requestCounter = new client.Counter({
    name:"req_count",
    help:"Total request Count",
    labelNames:["method","route","status_code"]
});


// Register the metric with the Prometheus client registry
client.register.registerMetric(requestCounter);

export const CountReq = (req: Request, res: Response, next: NextFunction)=>{
    const startTime = Date.now();

    //wait for response to come back-> response has an event listener called finish which we can listen on
    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);

        // Increment request counter, inc function provided by prom-client
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
    });

    next();
}