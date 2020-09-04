const express = require('express');
const bodyParser = require('body-parser');

const authorRouter = require('./routers/authorRouter');

const app = express();

app.use(bodyParser.json());

app.use('/authors', authorRouter);

const PORT = 3000;

app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });