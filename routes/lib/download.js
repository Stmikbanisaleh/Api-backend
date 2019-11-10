require('dotenv').config();

const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/download/:name', (req, res) => {
  const { name } = req.params;
  const url = `./public/file/${name}`;
  res.download(url); // Set disposition and send it.
});

module.exports = router;
