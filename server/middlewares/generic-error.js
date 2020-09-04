module.export = (err, _req, res, _next) => {
  res.status(500).json({ error: err.message, stack: err.stack });
}