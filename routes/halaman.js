const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const moment = require('moment');
const halamanSchema = require('../models/halaman_model');
const checkauth = require('../middleware/validation');


const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addhalaman', checkauth, async (req, res) => {
  const date = new Date();
  const name = moment(date).format('hhmmiiss');
  const base64Data = req.body.gambar_base64;
  const type = req.body.gambar_type;
  fs.writeFileSync(`./public/file/${req.body.gambar}${name}${type}`, base64Data, 'base64', () => {
  });

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
