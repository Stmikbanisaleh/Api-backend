const express = require('express');
const Joi = require('joi');
const moment = require('moment');
const fs = require('fs');
const albumSchema = require('../models/album_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addalbum', checkauth, async (req, res) => {
  const date = new Date();
  const name = moment(date).format('hhmmiiss');
  const base64Data = req.body.gambar_base64;
  const type = req.body.gambar_type;
  const name_file = `${req.body.gambar}${name}${type}`;
  fs.writeFileSync(`./public/file/${req.body.gambar}${name}${type}`, base64Data, 'base64', () => {
  });

  
  const payload = Joi.object({
    keterangan: Joi.string().required(),
    tgl_posting: Joi.date().required(),
    username: Joi.string().required(),
  });
  const schema = {
    keterangan: req.body.keterangan,
    tgl_posting: req.body.tgl_posting,
    username: req.body.username,
  };


  try {
    Joi.validate(schema, payload, () => {
      albumSchema.create({
        keterangan: req.body.keterangan,
        gambar: name_file,
        tgl_posting: req.body.tgl_posting,
        username: req.body.username,
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

router.post('/deletealbum', checkauth, async (req, res) => {
  let validate = Joi.object().keys({
    id_album: Joi.number().required(),
  });

  const payload = {
    id_album: req.body.id_album,
  }

  Joi.validate(payload, validate, (error) => {
    albumSchema.destroy({
      where: {
        id_album: req.body.id_album,
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
