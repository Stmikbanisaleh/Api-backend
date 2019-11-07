const express = require('express');
const Joi = require('joi');
const aksescepatSchema = require('../models/aksescepat_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addaksescepat', checkauth, async (req, res) => {
  const payload = Joi.object({
    nama_link: Joi.string().required(),
    url: Joi.string().required(),
  });
  const schema = {
    nama_link: req.body.nama_link,
    url: req.body.url,
  };


  try {
    Joi.validate(schema, payload, (error) => {
      const sukses = aksescepatSchema.create(schema);
      if (sukses) {
        res.status(201).json({
          status: 200,
          messages: 'Akses cepat berhasil ditambahkan',
          data: aksescepatSchema,
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
