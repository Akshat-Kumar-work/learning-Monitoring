# Prometheus using express-prometheus-middleware
- It's built on top of prom-client
- Quick integration, automatic metrics , ease to use
- Less customization , limited scope
- We can use it when we want basic HTTP metrics in our express server

- Types of metrics in Prometheus

Counter-> It is a cumulative metrics which only increases,example is counting no. of http requests

Gauge-> It is a metric that can go up and down,example is measuring the current memory usage, active numbers of users, basically numbers of active request, we don't track it for http server but we track it for websockets server that how many websockets server currently activea

Histogram->It is a req duration, response size and counts them in configurable buckets,example is measuring http request
It provide all the response time present in bucket-> means the req which took that much time or fall under that much time

bucket in histogram  provide data of req for all response time, which req took

sum in histogram gives you the total accumulated value of the observed metric (total duration).

count in histogram gives you the number of observations (total requests).

- Install the library
```
npm install express-prometheus-middleware
```

