const express = require('express');
const morgan = require('morgan')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined'))
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
