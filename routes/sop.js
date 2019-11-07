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
    Joi.validate(schema, payload, () => {
      sopSchema.create({
        judul: req.body.judul,
        nama_judul: req.body.nama_judul,
        nama_file: req.body.nama_file,
        tgl_posting: req.body.tgl_posting,
      }).then((data) => {
        res.json({
          status: 200,
          data,
          message: 'SOP berhasil ditambahkan',
        });
      }).catch((error) => {
        res.status(500).json({
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
