const express = require('express');
const Joi = require('joi');
const sopSchema = require('../models/sop_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addsop', checkauth, async (req, res) => {
  const payload = Joi.object({
    judul: Joi.string().required(),
    nama_judul: Joi.string().required(),
    nama_file: Joi.date().required(),
    tgl_posting: Joi.string().required(),
  });
  const schema = {
    judul: req.body.judul,
    nama_judul: req.body.nama_judul,
    nama_file: req.body.nama_file,
    tgl_posting: req.body.tgl_posting,
  };


  try {
    Joi.validate(schema, payload, (error) => {
      const sukses = sopSchema.create(schema);
      if (sukses) {
        res.status(201).json({
          status: 200,
          messages: 'Sop berhasil ditambahkan',
          data: sopSchema,
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
