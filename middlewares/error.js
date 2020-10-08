module.exports = (environment) => (err, _req, res, _next) => {
  if (!err.status)
    return res.status(500).json({ ok: false, message: err.message });

  if (environment === 'development') {
    console.error(err);
  }

  res.status(err.status).json({ ok: false, message: err.message });
};
