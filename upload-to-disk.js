const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (_req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = [
  upload.single('arquivo'),
  (req, res) => {
    const { body, file, headers } = req;

    res.status(201).json({
      file,
      body,
      headers,
    });
  },
];
