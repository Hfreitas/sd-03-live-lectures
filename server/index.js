const express = require('express');
const bodyParser = require('body-parser');

const authorRouter = require('./routers/authorRouter');
const errorMiddleware = require('./middlewares/errors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/authors', authorRouter);

const PORT = 3000;
app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
