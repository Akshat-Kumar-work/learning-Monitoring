# Prometheus using express-prometheus-middleware
- It's built on top of prom-client
- Quick integration, automatic metrics , ease to use
- Less customization , limited scope
- We can use it when we want basic HTTP metrics in our express server
- Types of metrics in Prometheus
Counter-> It is a cumulative metrics which only increases,example is counting no. of http req
Gauge-> It is a metric that can go up and down,example is measuring the current memory usage, active numbers of users
Histogram->It is a req duration, response size and counts them in configurable buckets,example is measuring http request

- Install the library
```
npm install express-prometheus-middleware
```

