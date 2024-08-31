
import { NextFunction, Request, Response } from "express";

import client from "prom-client";

export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});

// Register the metric with the Prometheus client registry
client.register.registerMetric(httpRequestDurationMicroseconds);

export const reqDuration = (req: Request, res: Response, next: NextFunction)=>{
    const startTime = Date.now();
  
    //wait for response to come back-> response has an event listener called finish which we can listen on
    res.on('finish', () => {     

        const endTime = Date.now();
        const duration = endTime - startTime;
    

        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, duration);
    });

    next();
}