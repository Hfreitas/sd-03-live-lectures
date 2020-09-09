const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = [
  upload.single('arquivo'),
  async (req, res) => {
    const { body, file } = req;

    await fs.writeFile(path.join(__dirname, 'uploads', `memory-${file.originalname}`), file.buffer);

    res.status(200)
      .json({ body, file });
  },
];
