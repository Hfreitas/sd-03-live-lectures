const app = require('./app');

const config = require('./config');

app
  .factory(config)
  .then((appIntance) => {
    const PORT = process.env.PORT || 3000;

    appIntance.listen(PORT, () => {
      console.log(`Ouvindo a porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
