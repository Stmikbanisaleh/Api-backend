const express = require('express');
const Joi = require('joi');
const beritaSchema = require('../models/berita_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addberita', checkauth, async (req, res) => {
  const date = new Date();
  const name = moment(date).format('hhmmiiss');
  const base64Data = req.body.gambar_base64;
  const type = req.body.gambar_type;
  fs.writeFileSync(`./public/file/${req.body.gambar}${name}${type}`, base64Data, 'base64', () => {
  });

  
  const payload = Joi.object({
    username: Joi.string().required(),
    id_posisi: Joi.string().required(),
    judul: Joi.date().required(),
    sub_judul: Joi.string().required(),
    youtube: Joi.string().required(),
    judul_seo: Joi.string().required(),
    isi_berita: Joi.string().required(),
    gambar: Joi.string().required(),
    keterangan_gambar: Joi.string().required(),
    tanggal: Joi.string().required(),
  });
  const schema = {
    username: req.body.username,
    id_posisi: req.body.id_posisi,
    judul: req.body.judul,
    sub_judul: req.body.sub_judul,
    youtube: req.body.youtube,
    judul_seo: req.body.judul_seo,
    isi_berita: req.body.isi_berita,
    gambar: req.body.gambar,
    keterangan_gambar: req.body.keterangan_gambar,
    tanggal: req.body.tanggal,
  };


  try {
    Joi.validate(schema, payload, () => {
      beritaSchema.create({
        username: req.body.username,
        id_posisi: req.body.id_posisi,
        judul: req.body.judul,
        sub_judul: req.body.sub_judul,
        youtube: req.body.youtube,
        judul_seo: req.body.judul_seo,
        isi_berita: req.body.isi_berita,
        gambar: req.body.gambar,
        keterangan_gambar: req.body.keterangan_gambar,
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

module.exports = router;
