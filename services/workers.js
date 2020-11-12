module.exports = (models) => ({
  findById: async (id) => {
    return models.workers.findById(id).then(
      (worker) =>
        worker || {
          error: true,
          code: 'worker_not_found',
          message: `Worker with ID ${id} was not found`,
        }
    );
  },
  create: async (name, phone, email, address) => {
    const existingWorker = await models.workers.findByEmail(email);

    if (existingWorker) {
      return {
        error: true,
        code: 'worker_exists',
        message: `Worker with email ${email} already exists`,
      };
    }

    return models.workers.create(name, phone, email, address);
  },
});
