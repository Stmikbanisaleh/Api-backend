const express = require('express');
const Joi = require('joi');
const linkSchema = require('../models/link_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addlink', checkauth, async (req, res) => {
  const payload = Joi.object({
    kategori: Joi.string().required(),
    nama_link: Joi.string().required(),
    url_web: Joi.date().required(),
    logo: Joi.string().required(),
  });
  const schema = {
    kategori: req.body.kategori,
    nama_link: req.body.nama_link,
    url_web: req.body.url_web,
    logo: req.body.logo,
  };


  try {
    Joi.validate(schema, payload, (error) => {
      const sukses = linkSchema.create(schema);
      if (sukses) {
        res.status(201).json({
          status: 200,
          messages: 'Link berhasil ditambahkan',
          data: linkSchema,
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
