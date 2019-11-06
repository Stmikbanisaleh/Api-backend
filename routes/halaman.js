const express = require('express');
const Joi = require('joi');
const halamanSchema = require('../models/halaman_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addhalaman', checkauth, async (req, res) => {
  const payload = Joi.object({
    judul: Joi.string().required(),
    judul_seo: Joi.string().required(),
    isi_halaman: Joi.string().required(),
    tgl_posting: Joi.date().required(),
    gambar: Joi.string().required(),
    username: Joi.string().required(),
  });
  const schema = {
    judul: req.body.judul,
    judul_seo: req.body.judul_seo,
    isi_halaman: req.body.isi_halaman,
    tgl_posting: req.body.tgl_posting,
    gambar: req.body.gambar,
    username: req.body.username,
  };


  try {
    Joi.validate(schema, payload, (error) => {
      const sukses = halamanSchema.create(schema);
      if (sukses) {
        res.status(201).json({
          status: 200,
          messages: 'Halaman berhasil ditambahkan',
          data: halamanSchema,
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
