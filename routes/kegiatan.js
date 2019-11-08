const express = require('express');
const Joi = require('joi');
const kegiatanSchema = require('../models/kegiatan_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addkegiatan', checkauth, async (req, res) => {
  const payload = Joi.object({
    id_posisi: Joi.string().required(),
    nama_kegiatan: Joi.string().required(),
    tempat: Joi.date().required(),
    gambar: Joi.string().required(),
    tanggal: Joi.string().required(),
  });
  const schema = {
    id_posisi: req.body.id_posisi,
    nama_kegiatan: req.body.nama_kegiatan,
    tempat: req.body.tempat,
    gambar: req.body.gambar,
    tanggal: req.body.tanggal,
  };


  try {
    Joi.validate(schema, payload, () => {
      kegiatanSchema.create({
      id_posisi: req.body.id_posisi,
      nama_kegiatan: req.body.nama_kegiatan,
      tempat: req.body.tempat,
      gambar: req.body.gambar,
      tanggal: req.body.tanggal,
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