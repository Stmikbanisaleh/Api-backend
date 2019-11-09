const express = require('express');
const Joi = require('joi');
const moment = require('moment');
const fs = require('fs');
const linkSchema = require('../models/link_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addlink', checkauth, async (req, res) => {
  const date = new Date();
  const name = moment(date).format('hhmmiiss');
  const base64Data = req.body.file_base64;
  const type = req.body.file_type;
  const name_file = `${req.body.logo}${name}${type}`;
  fs.writeFileSync(`./public/file/${req.body.logo}${name}${type}`, base64Data, 'base64', () => {
  });


  const payload = Joi.object({
    kategori: Joi.string().required(),
    nama_link: Joi.string().required(),
    url_web: Joi.date().required(),
  });
  const schema = {
    kategori: req.body.kategori,
    nama_link: req.body.nama_link,
    url_web: req.body.url_web,
  };


  try {
    Joi.validate(schema, payload, () => {
      linkSchema.create({
        kategori: req.body.kategori,
        nama_link: req.body.nama_link,
        url_web: req.body.url_web,
        logo: name_file,
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
