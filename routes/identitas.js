const express = require('express');
const Joi = require('joi');
const identitasSchema = require('../models/identitas_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addidentitas', checkauth, async (req, res) => {
  const payload = Joi.object({
    nama_website: Joi.string().required(),
    email: Joi.date().required(),
    url: Joi.string().required(),
    satker: Joi.string().required(),
    facebook: Joi.string().required(),
    google: Joi.string().required(),
    twitter: Joi.string().required(),
    rekening: Joi.string().required(),
    no_telp: Joi.string().required(),
    meta_deskripsi: Joi.string().required(),
    meta_keyword: Joi.string().required(),
    favicon: Joi.string().required(),
  });
  const schema = {
    nama_website: req.body.nama_website,
    email: req.body.email,
    url: req.body.url,
    satker: req.body.satker,
    facebook: req.body.facebook,
    google: req.body.google,
    twitter: req.body.twitter,
    rekening: req.body.rekening,
    no_telp: req.body.no_telp,
    meta_deskripsi: req.body.meta_deskripsi,
    meta_keyword: req.body.meta_keyword,
    favicon: req.body.favicon,
  };


  try {
    Joi.validate(schema, payload, (error) => {
      const sukses = identitasSchema.create(schema);
      if (sukses) {
        res.status(201).json({
          status: 200,
          messages: 'Identitas berhasil ditambahkan',
          data: identitasSchema,
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
