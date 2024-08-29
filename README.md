# PROMETHEUS
- It is an monitoring tool for metrics
- We have to setup prometheus into our code because it is self hosted
- Does not have agents same as Newrelic

- Install prom-client
```
  npm i prom-client
```

- Collect default metrics of server by adding this into main index.js
```
  const collectDefaultMetrics = promClient.collectDefaultMetrics;
```

- Register the collected metrics
```
  collectDefaultMetrics({register:promClient.register});
```

- Create api route to provide all collected metrics
```
app.get('/metrics',async(req,res)=>{
  //we had set the content type into headers
 res.setHeader('Content-Type',promClient.register.contentType);
 //get the metrics from promp client
 const metrics = await promClient.register.metrics();
 //return the metrics in reponse
 res.send(metrics);
})
```

- Create prometheus-config.yml file and put the bellow data init
```
global:
 scrape_interval: 4s #scrap the data after every 4 seconds

scrape_configs:
 -job_name: prometheus
  static_configs:
    -targets: [" 192.168.1.16:8000"] #from this local-host/ourIPaddress:port
```

- Create docker-compose.yaml for prometheus server
```
version: "3"

services:
  prom-server:
   image: prom/prometheus
   ports:
     - 9090:9090
   volumes:
     - ./prometheus-config.yml:/etc/prometheus/prometheus.yaml
```

# GRAFANA
- It is used for metrics-visualization 
- It uses the metrics which was scrapped by prometheus server
- It integrate the prometheus into its service

- To run the grafana image directly into docker from CLI
```
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
```
- To run from docker-compose
```
  grafana:
    image: grafana/grafana-oss
    container_name: grafana
    ports:
      - 3000:3000
    restart: always
```
