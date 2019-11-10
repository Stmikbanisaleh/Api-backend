/* eslint-disable camelcase */
const express = require('express');
const Joi = require('joi');
const moment = require('moment');
const fs = require('fs');
const agendaSchema = require('../models/agenda_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addagenda', checkauth, async (req, res) => {
  const date = new Date();
  const name = moment(date).format('hhmmiiss');
  const base64Data = req.body.gambar_base64;
  const type = req.body.gambar_type;
  const name_file = `${req.body.foto}${name}.${type}`;
  fs.writeFileSync(`./public/file/${req.body.foto}${name}.${type}`, base64Data, 'base64', () => {
  });

  const payload = Joi.object({
    tanggal_awal: Joi.string().required(),
    tanggal_akhir: Joi.string().required(),
    nama_agenda: Joi.date().required(),
    keterangan: Joi.string().required(),
  });
  const schema = {
    tanggal_awal: req.body.tanggal_awal,
    tanggal_akhir: req.body.tanggal_akhir,
    nama_agenda: req.body.nama_agenda,
    keterangan: req.body.keterangan,
  };

  try {
    Joi.validate(schema, payload, () => {
      agendaSchema.create({
        tanggal_awal: req.body.tanggal_awal,
        tanggal_akhir: req.body.tanggal_akhir,
        nama_agenda: req.body.nama_agenda,
        keterangan: req.body.keterangan,
        foto: name_file,
      }).then((data) => {
        res.json({
          status: 200,
          data,
          message: 'Agenda berhasil ditambahkan',
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

router.post('/deleteagenda', checkauth, async (req, res) => {
  const validate = Joi.object().keys({
    id_agenda: Joi.number().required(),
  });

  const payload = {
    id_agenda: req.body.id_agenda,
  };

  Joi.validate(payload, validate, (error) => {
    agendaSchema.destroy({
      where: {
        id_agenda: req.body.id_agenda,
      },
    })
      .then(() => {
        res.status(200).json(
          {
            status: 200,
            message: 'Delete Succesfully',
          },
        );
      });
    if (error) {
      res.status(400).json({
        status: 'Required',
        messages: error.message,
      });
    }
  });
});

router.post('/getagenda', checkauth, (req, res) => {
  agendaSchema.sequelize.query('SELECT * '
  + 'FROM `agenda` '
  + 'order by id_agenda DESC').then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

module.exports = router;
