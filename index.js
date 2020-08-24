const express = require('express');
const mysqlx = require('@mysql/xdevapi');
const bodyParser = require('body-parser');
const catController = require('./controllers/cats');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, _, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/ping', (_req, res) => res.send('Pong!'));

app.get('/cats', catController.listCats);

app.post('/cats', catController.newCat);

app.get('/cats/:id', catController.catDetails);

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});