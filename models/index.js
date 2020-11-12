const workers = require('./workers');

function factory(connection) {
  return {
    workers: workers(connection),
  };
}

module.exports = { factory };
