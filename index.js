const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers/pokedexController');
const checkAuthToken = require('./middlewares/auth');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(checkAuthToken);

app.get('/pokemon/:id', controllers.getPokemonById);
app.get('/type/:id', controllers.getAllByTypeId);
app.get('/item/:term', controllers.searchItemsByName);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
