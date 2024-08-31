import client from "prom-client";
import { NextFunction, Request, Response } from "express";

const activeUserGauge = new client.Gauge({
    name:"active_users",
    help:"Total number of user whoes request hasent resolved",
    labelNames:["method","route"]
});

// Register the metric with the Prometheus client registry
client.register.registerMetric(activeUserGauge);

export const ActiverUserGauge = (req: Request, res: Response, next: NextFunction)=>{


    activeUserGauge.inc({
        method: req.method,
        route: req.route ? req.route.path : req.path,
    });

    //wait for response to come back-> response has an event listener called finish which we can listen on
    res.on('finish', () => {     
        activeUserGauge.dec({
            method: req.method,
            route: req.route ? req.route.path : req.path,
        });
    });

    next();
}