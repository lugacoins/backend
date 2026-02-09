const app = require('./app');
const { port } = require('./config/env');

app.listen(port, () => {
  console.log(`LUGACOINS backend listening on port ${port}`);
});
