const { Router } = require('express');
const rescue = require('express-rescue');

module.exports = (services) => {
  const workerRouter = Router();

  workerRouter.get(
    '/:id',
    rescue(async (req, res) => {
      const { id } = req.params;

      const worker = await services.workers.findById(id);

      if (worker.error) {
        return res.status(404).json(worker);
      }

      return res.status(200).json(worker);
    })
  );

  return workerRouter;
};
