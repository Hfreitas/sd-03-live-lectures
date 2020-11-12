const workers = require('./workers');

const factory = (services) => ({
  workers: workers(services),
});

module.exports = { factory };
