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
  const date = new Date();
  const name = moment(date).format('hhmmiiss');
  const base64Data = req.body.file_base64;
  const type = req.body.file_type;
  fs.writeFileSync(`./public/file/${req.body.file}${name}${type}`, base64Data, 'base64', () => {
  });

  
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

router.post('/deletesop', checkauth, async (req, res) => {
  let validate = Joi.object().keys({
    id_sop: Joi.number().required(),
  });

  const payload = {
    id_sop: req.body.id_sop,
  }

  Joi.validate(payload, validate, (error) => {
    sopSchema.destroy({
      where: {
        id_sop: req.body.id_sop,
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
