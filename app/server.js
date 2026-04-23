const express = require('express');
const app = express();

const {
  httpRequestsTotal,
  httpErrorsTotal,
  httpRequestDuration,
  register,
} = require('./metrics');

app.get('/', (req, res) => {
  const end = httpRequestDuration.startTimer();

  try {
    res.send('Hello from monitoring app');

    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status: 200,
    });
  } catch (err) {
    httpErrorsTotal.inc();

    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status: 500,
    });

    res.status(500).send('Error');
  } finally {
    end();
  }
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/error', (req, res) => {
  httpErrorsTotal.inc();

  httpRequestsTotal.inc({
    method: req.method,
    route: req.path,
    status: 500,
  });

  res.status(500).send('Forced error');
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
