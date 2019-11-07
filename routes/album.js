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
    Joi.validate(schema, payload, (error) => {
      const sukses = albumSchema.create(schema);
      if (sukses) {
        res.status(201).json({
          status: 200,
          messages: 'Album berhasil ditambahkan',
          data: albumSchema,
        });
      }
      if (error) {
        res.status(422).json({
          error: error.message,
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'ERROR',
      messages: error.message,
      data: {},
    });
  }
});

module.exports = router;
