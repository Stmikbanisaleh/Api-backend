const express = require('express');
const Joi = require('joi');
const downloadSchema = require('../models/download_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/adddownload', checkauth, async (req, res) => {
  const date = new Date();
  const name = moment(date).format('hhmmiiss');
  const base64Data = req.body.file_base64;
  const type = req.body.file_type;
  fs.writeFileSync(`./public/file/${req.body.file}${name}${type}`, base64Data, 'base64', () => {
  });


  const payload = Joi.object({
    judul: Joi.string().required(),
    nama_file: Joi.string().required(),
    tgl_posting: Joi.string().required(),
    hits: Joi.string().required(),
  });
  const schema = {
    judul: req.body.judul,
    nama_file: req.body.nama_file,
    tgl_posting: req.body.tgl_posting,
    hits: req.body.hits,
  };


  try {
    Joi.validate(schema, payload, () => {
      downloadSchema.create({
        judul: req.body.judul,
        nama_file: req.body.nama_file,
        tgl_posting: req.body.tgl_posting,
        hits: req.body.hits,
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
