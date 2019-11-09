const express = require('express');
const beritaSchema = require('../models/berita_model');
const menuSchema = require('../models/menu_model');
const sopSchema = require('../models/sop_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.post('/berita', checkauth, (req, res) => {
  beritaSchema.count().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/menu', checkauth, (req, res) => {
  menuSchema.count().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/sop', checkauth, (req, res) => {
  sopSchema.count().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

module.exports = router;
