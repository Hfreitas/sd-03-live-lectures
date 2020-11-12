const workers = require('./workers');

const factory = (models) => ({
  workers: workers(models),
});

module.exports = { factory };
