const app = require('./app');
const config = require('./config');

app
  .factory(config)
  .then((appInstance) => {
    appInstance.listen(config.port, () => {
      console.log(`Ouvindo na porta ${config.port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
