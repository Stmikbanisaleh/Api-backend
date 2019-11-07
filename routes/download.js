const express = require('express');
const Joi = require('joi');
const downloadSchema = require('../models/download_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/adddownload', checkauth, async (req, res) => {
  const payload = Joi.object({
    judul: Joi.string().required(),
    nama_file: Joi.string().required(),
    tgl_posting: Joi.string().required(),
    hits: Joi.string().required(),
  });
  const schema = {
    judul: req.body.judul,
    nama_file: req.body.nama_file,
    tgl_posting: req.body.tgl_posting,
    hits: req.body.hits,
  };


  try {
    Joi.validate(schema, payload, (error) => {
      const sukses = downloadSchema.create(schema);
      if (sukses) {
        res.status(201).json({
          status: 200,
          messages: 'Download berhasil ditambahkan',
          data: downloadSchema,
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
