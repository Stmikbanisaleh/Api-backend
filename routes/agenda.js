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
      if (req.body.foto) {
        const date = new Date();
        const name = moment(date).format('hhmmiiss');
        const base64Data = req.body.gambar_base64;
        const type = req.body.gambar_type;
        const name_file = `${req.body.foto}${name}.${type}`;
        fs.writeFileSync(`./public/file/${req.body.foto}${name}.${type}`, base64Data, 'base64', () => {
        });
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
      } else {
        agendaSchema.create({
          tanggal_awal: req.body.tanggal_awal,
          tanggal_akhir: req.body.tanggal_akhir,
          nama_agenda: req.body.nama_agenda,
          keterangan: req.body.keterangan,
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
      }
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

router.post('/getagendabyid', checkauth, (req, res) => {
  agendaSchema.findAndCountAll({
    where: {
      id_agenda: req.body.id_agenda,
    },
  }).then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});


router.post('/updateagenda', checkauth, (req, res) => {
  const validate = Joi.object().keys({
    nama_agenda: Joi.string().required(),
    keterangan: Joi.date().required(),
    tanggal_awal: Joi.string().required(),
    tanggal_akhir: Joi.string().required(),
  });

  const payload = {
    nama_agenda: req.body.nama_agenda,
    keterangan: req.body.keterangan,
    tanggal_awal: req.body.tanggal_awal,
    tanggal_akhir: req.body.tanggal_akhir,
  };

  Joi.validate(payload, validate, () => {
    if (req.body.foto) {
      const date = new Date();
      const name = moment(date).format('hhmmiiss');
      const base64Data = req.body.gambar_base64;
      const type = req.body.gambar_type;
      const name_file = `${req.body.foto}${name}.${type}`;
      fs.writeFileSync(`./public/file/${req.body.foto}${name}.${type}`, base64Data, 'base64', () => {
      });
      agendaSchema.update({
        nama_agenda: req.body.nama_agenda,
        keterangan: req.body.keterangan,
        tanggal_awal: req.body.tanggal_awal,
        tanggal_akhir: req.body.tanggal_akhir,
        foto: name_file,
      },
      {
        where: {
          id_agenda: req.body.id_agenda,
        },
      })
        .then((data) => {
          if (data === 0) {
            res.status(404).json({
              message: 'Not Found',
              status: 404,
            });
          } else {
            res.status(200).json({
              message: 'Update Succesfully',
              status: 200,
            });
          }
        }).catch((e) => {
          res.status(500).json({
            status: 500,
            messages: e.message,
          });
        });
    } else {
      agendaSchema.update({
        id_posisi: req.body.id_posisi,
        keterangan: req.body.keterangan,
        tanggal_awal: req.body.tanggal_awal,
        tanggal_akhir: req.body.tanggal_akhir,
      },
      {
        where: {
          id_agenda: req.body.id_agenda,
        },
      })
        .then((data) => {
          if (data === 0) {
            res.status(404).json({
              message: 'Not Found',
              status: 404,
            });
          } else {
            res.status(200).json({
              message: 'Update Succesfully',
              status: 200,
            });
          }
        }).catch((e) => {
          res.status(500).json({
            status: 500,
            messages: e.message,
          });
        });
    }
  });
});

module.exports = router;
