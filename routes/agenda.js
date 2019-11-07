const express = require('express');
const Joi = require('joi');
const agendaSchema = require('../models/agenda_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addagenda', checkauth, async (req, res) => {
  const payload = Joi.object({
    tanggal_awal: Joi.string().required(),
    tanggal_akhir: Joi.string().required(),
    nama_agenda: Joi.date().required(),
    keterangan: Joi.string().required(),
    foto: Joi.string().required(),
  });
  const schema = {
    tanggal_awal: req.body.tanggal_awal,
    tanggal_akhir: req.body.tanggal_akhir,
    nama_agenda: req.body.nama_agenda,
    keterangan: req.body.keterangan,
    foto: req.body.foto,
  };


  try {
    Joi.validate(schema, payload, (error) => {
      const sukses = agendaSchema.create(schema);
      if (sukses) {
        res.status(201).json({
          status: 200,
          messages: 'Agenda berhasil ditambahkan',
          data: agendaSchema,
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
