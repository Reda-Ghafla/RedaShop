const express = require('express');
const data = require('./data');

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

console.log(data);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
