const express = require('express');
const Joi = require('joi');
const moment = require('moment');
const fs = require('fs');
const kegiatanSchema = require('../models/kegiatan_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addkegiatan', checkauth, async (req, res) => {
  const date = new Date();
  const name = moment(date).format('hhmmiiss');
  const base64Data = req.body.gambar_base64;
  const type = req.body.gambar_type;
  const name_file = `${req.body.gambar}${name}${type}`;
  fs.writeFileSync(`./public/file/${req.body.gambar}${name}${type}`, base64Data, 'base64', () => {
  });

  
  const payload = Joi.object({
    id_posisi: Joi.string().required(),
    nama_kegiatan: Joi.string().required(),
    tempat: Joi.date().required(),
    tanggal: Joi.string().required(),
  });
  const schema = {
    id_posisi: req.body.id_posisi,
    nama_kegiatan: req.body.nama_kegiatan,
    tempat: req.body.tempat,
    tanggal: req.body.tanggal,
  };


  try {
    Joi.validate(schema, payload, () => {
      kegiatanSchema.create({
      id_posisi: req.body.id_posisi,
      nama_kegiatan: req.body.nama_kegiatan,
      tempat: req.body.tempat,
      gambar: name_file,
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

router.post('/deletekegiatan', checkauth, async (req, res) => {
  let validate = Joi.object().keys({
    id_kegiatan: Joi.number().required(),
  });

  const payload = {
    id_kegiatan: req.body.id_kegiatan,
  }

  Joi.validate(payload, validate, (error) => {
    kegiatanSchema.destroy({
      where: {
        id_kegiatan: req.body.id_kegiatan,
      }
    })
      .then((data) => {
          res.status(200).json(
            {
              status: 200,
              message: 'Delete Succesfully'
            }
          )
      })
    if (error) {
      res.status(400).json({
        'status': 'Required',
        'messages': error.message,
      })
    }
  });
})

module.exports = router;
