const express = require('express');
const Joi = require('joi');
const identitasSchema = require('../models/identitas_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addidentitas', checkauth, async (req, res) => {
  const payload = Joi.object({
    nama_website: Joi.string().required(),
    email: Joi.date().required(),
    url: Joi.string().required(),
    satker: Joi.string().required(),
    facebook: Joi.string().required(),
    google: Joi.string().required(),
    twitter: Joi.string().required(),
    rekening: Joi.string().required(),
    no_telp: Joi.string().required(),
    meta_deskripsi: Joi.string().required(),
    meta_keyword: Joi.string().required(),
    favicon: Joi.string().required(),
  });
  const schema = {
    nama_website: req.body.nama_website,
    email: req.body.email,
    url: req.body.url,
    satker: req.body.satker,
    facebook: req.body.facebook,
    google: req.body.google,
    twitter: req.body.twitter,
    rekening: req.body.rekening,
    no_telp: req.body.no_telp,
    meta_deskripsi: req.body.meta_deskripsi,
    meta_keyword: req.body.meta_keyword,
    favicon: req.body.favicon,
  };


  try {
    Joi.validate(schema, payload, () => {
      identitasSchema.create({
        nama_website: req.body.nama_website,
        email: req.body.email,
        url: req.body.url,
        satker: req.body.satker,
        facebook: req.body.facebook,
        google: req.body.google,
        twitter: req.body.twitter,
        rekening: req.body.rekening,
        no_telp: req.body.no_telp,
        meta_deskripsi: req.body.meta_deskripsi,
        meta_keyword: req.body.meta_keyword,
        favicon: req.body.favicon,
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

router.post('/getidentitasbyid', checkauth, (req, res) => {
  identitasSchema.findAndCountAll({
    where: {
      id_identitas: req.body.id_identitas,
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
      // });x
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        status: 500,
      });
    });
});

router.post('/updateidentitas', checkauth, (req, res) => {

  const payload = {
    nama_website: req.body.nama_website,
    email: req.body.email,
    url: req.body.url,
    satker: req.body.satker,
    facebook: req.body.facebook,
    google: req.body.google,
    twitter: req.body.twitter,
    rekening: req.body.rekening,
    no_telp: req.body.no_telp,
    meta_deskripsi: req.body.meta_deskripsi,
    meta_keyword: req.body.meta_keyword,
    favicon: req.body.favicon,
  }

  let validate = Joi.object().keys({
    nama_website: Joi.string().required(),
    email: Joi.string().required(),
    url: Joi.string().required(),
    satker: Joi.string().required(),
    facebook: Joi.string().required(),
    google : Joi.string().required(),
    twitter : Joi.string().required(),
    rekening : Joi.string().required(),
    no_telp: Joi.string().required(),
    meta_deskripsi: Joi.string().required(),
    meta_keyword: Joi.string().required(),
    favicon: Joi.string().required(),
  });
  Joi.validate(payload, validate, (error) => {
    identitasSchema.update(payload, {
      where: {
        id_identitas: req.body.id_identitas
      }
    }).then((data) => {
      res.status(200).json({
        'status': 200,
        'message' : 'Update Succesfully'
      })
    })
    if (error) {
      res.status(400).json({
        'status': 'Required' +error,
        'messages': error,
      })
    }
  })
})

router.post('/deleteidentitas', checkauth, async (req, res) => {
  let validate = Joi.object().keys({
    id_identitas: Joi.number().required(),
  });

  const payload = {
    id_identitas: req.body.id_identitas,
  }

  Joi.validate(payload, validate, (error) => {
    identitasSchema.destroy({
      where: {
        id_identitas: req.body.id_identitas,
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

router.post('/getidentitas', checkauth, (req, res) => {
  identitasSchema.findAndCountAll().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

module.exports = router;
