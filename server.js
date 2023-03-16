const app = require('./app');
const hostname = '127.0.0.1';
const port = 5080;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
