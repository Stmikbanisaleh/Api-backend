const express = require('express');
const Joi = require('joi');
const albumSchema = require('../models/album_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addalbum', checkauth, async (req, res) => {
  const payload = Joi.object({
    keterangan: Joi.string().required(),
    gambar: Joi.string().required(),
    tgl_posting: Joi.date().required(),
    username: Joi.string().required(),
  });
  const schema = {
    keterangan: req.body.keterangan,
    gambar: req.body.gambar,
    tgl_posting: req.body.tgl_posting,
    username: req.body.username,
  };


  try {
    Joi.validate(schema, payload, () => {
      albumSchema.create({
        keterangan: req.body.keterangan,
        gambar: req.body.gambar,
        tgl_posting: req.body.tgl_posting,
        username: req.body.username,
      }).then((data) => {
        res.json({
          status: 200,
          data,
          message: 'Menu berhasil ditambahkan',
        });
      }).catch((error) => {
        res.status(500).json({
          status: 500,
          error: error.message,
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }

});

module.exports = router;
