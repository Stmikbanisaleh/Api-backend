/* eslint-disable camelcase */
const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const moment = require('moment');
const halamanSchema = require('../models/halaman_model');
const checkauth = require('../middleware/validation');


const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addhalaman', checkauth, async (req, res) => {
  const date = new Date();
  const name = moment(date).format('hhmmiiss');
  const base64Data = req.body.gambar_base64;
  const type = req.body.gambar_type;
  const name_file = `${req.body.gambar}${name}.${type}`;
  fs.writeFileSync(`./public/file/${req.body.gambar}${name}.${type}`, base64Data, 'base64', () => {
  });

  const payload = Joi.object({
    judul: Joi.string().required(),
    judul_seo: Joi.string().required(),
    isi_halaman: Joi.string().required(),
    tgl_posting: Joi.date().required(),
    username: Joi.string().required(),
  });
  const schema = {
    judul: req.body.judul,
    judul_seo: req.body.judul_seo,
    isi_halaman: req.body.isi_halaman,
    tgl_posting: req.body.tgl_posting,
    username: req.body.username,
  };


  try {
    Joi.validate(schema, payload, () => {
      halamanSchema.create({
        judul: req.body.judul,
        judul_seo: req.body.judul_seo,
        isi_halaman: req.body.isi_halaman,
        tgl_posting: req.body.tgl_posting,
        gambar: name_file,
        username: req.body.username,
      }).then((data) => {
        res.json({
          status: 200,
          data,
          message: 'Halaman berhasil ditambahkan',
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

router.post('/deletehalaman', checkauth, async (req, res) => {
  const validate = Joi.object().keys({
    id_halaman: Joi.number().required(),
  });

  const payload = {
    id_halaman: req.body.id_halaman,
  };

  Joi.validate(payload, validate, (error) => {
    halamanSchema.destroy({
      where: {
        id_halaman: req.body.id_halaman,
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

router.post('/gethalaman', checkauth, (req, res) => {
  halamanSchema.findAndCountAll().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});


router.post('/updatehalaman', checkauth, (req, res) => {
  const validate = Joi.object().keys({
    judul: Joi.string().required(),
    judul_seo: Joi.string().required(),
    isi_halaman: Joi.string().required(),
    gambar: Joi.string(),
  });

  const payload = {
    judul: req.body.judul,
    judul_seo: req.body.judul_seo,
    isi_halaman: req.body.isi_halaman,
    gambar: req.body.gambar,
  };

  Joi.validate(payload, validate, () => {
    if (req.body.gambar) {
      const date = new Date();
      const name = moment(date).format('hhmmiiss');
      const base64Data = req.body.gambar_base64;
      const type = req.body.gambar_type;
      const name_file = `${req.body.gambar}${name}.${type}`;
      fs.writeFileSync(`./public/file/${req.body.gambar}${name}.${type}`, base64Data, 'base64', () => {
      });
      halamanSchema.update({
        judul: req.body.judul,
        judul_seo: req.body.judul_seo,
        isi_halaman: req.body.isi_halaman,
        gambar: name_file,
      },
      {
        where: {
          id_halaman: req.body.id_halaman,
        },
      })
        .then((data) => {
          if (data === 1) {
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
      halamanSchema.update({
        judul: req.body.judul,
        judul_seo: req.body.judul_seo,
        isi_halaman: req.body.isi_halaman,
      },
      {
        where: {
          id_halaman: req.body.id_halaman,
        },
      })
        .then((data) => {
          if (data === 1) {
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

router.post('/gethalamanbyid', checkauth, (req, res) => {
  halamanSchema.findAndCountAll({
    where: {
      id_halaman: req.body.id_halaman,
    },
  })
    .then((data) => {
      if (data.length < 1) {
        res.status(404).json({
          message: 'Not Found',
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        status: 500,
      });
    });
});
module.exports = router;
