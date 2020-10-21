module.exports = (environment) => (err, req, res, next) => {
  if (environment === 'development') {
    console.error(err);
  }

  res.status(500).json({ message: err.message });
};
