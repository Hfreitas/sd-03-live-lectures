const path = require('path');
const multer = require('multer');
const express = require('express');
const uploadToDisk = require('./upload-to-disk');
const uploadToMemory = require('./upload-to-memory');

const upload = multer({ dest: path.join(__dirname, 'uploads-many') });

const app = express();

app.use('/files', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', uploadToDisk);
app.post('/memory', uploadToMemory);
app.post('/many', upload.array('arquivo', 5), (req, res) => {
  const { files } = req;

  res.status(201)
    .json({ files });
});

app.get('/ping', (_req, res) => {
  res.status(200).json({ ok: true });
});

const PORT = 3000;
app.listen(3000, () => { console.log(`Listening on port ${PORT}`); });
