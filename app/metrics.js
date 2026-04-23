const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const httpErrorsTotal = new client.Counter({
  name: 'http_errors_total',
  help: 'Total HTTP errors',
});


const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Request duration',
  buckets: [0.1, 0.5, 1, 2],
});

module.exports = {
  httpRequestsTotal,
  httpErrorsTotal,
  httpRequestDuration,
  register: client.register,
};
