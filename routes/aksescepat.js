const express = require('express');
const Joi = require('joi');
const aksescepatSchema = require('../models/aksescepat_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addaksescepat', checkauth, async (req, res) => {
  const payload = Joi.object({
    nama_link: Joi.string().required(),
    url: Joi.string().required(),
  });
  const schema = {
    nama_link: req.body.nama_link,
    url: req.body.url,
  };


  try {
    Joi.validate(schema, payload, () => {
      aksescepatSchema.create({
        nama_link: req.body.nama_link,
        url: req.body.url,
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
