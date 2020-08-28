const express = require('express');
const bodyParser = require('body-parser');
const catController = require('./controllers/cats');
const { RSA_NO_PADDING } = require('constants');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());

app.use((req, _, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/ping', (_req, res) => res.send('Pong!'));

app.get('/cats', catController.listCats);

app.post('/cats', catController.newCat);

app.get('/cats/:id', catController.catDetails);

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});