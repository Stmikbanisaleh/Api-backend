/* eslint-disable camelcase */
const express = require('express');
const Joi = require('joi');
const moment = require('moment');
const fs = require('fs');
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
  const name_file = `${req.body.gambar}${name}.${type}`;
  fs.writeFileSync(`./public/file/${req.body.gambar}${name}.${type}`, base64Data, 'base64', () => {
  });

  const payload = Joi.object({
    username: Joi.string().required(),
    id_posisi: Joi.string().required(),
    judul: Joi.date().required(),
    sub_judul: Joi.string().required(),
    youtube: Joi.string().required(),
    judul_seo: Joi.string().required(),
    isi_berita: Joi.string().required(),
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
        gambar: name_file,
        keterangan_gambar: req.body.keterangan_gambar,
        tanggal: req.body.tanggal,
      }).then((data) => {
        res.json({
          status: 200,
          data,
          message: 'Berita berhasil ditambahkan',
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

router.post('/deleteberita', checkauth, async (req, res) => {
  const validate = Joi.object().keys({
    id_berita: Joi.number().required(),
  });

  const payload = {
    id_berita: req.body.id_berita,
  };

  Joi.validate(payload, validate, (error) => {
    beritaSchema.destroy({
      where: {
        id_berita: req.body.id_berita,
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

router.post('/getberita', checkauth, (req, res) => {
  beritaSchema.sequelize.query('SELECT `berita`.*,`posisi`.`id_posisi`,`posisi`.`nama_web` '
  + 'FROM `berita` '
  + 'JOIN `posisi` ON `posisi`.`id_posisi` = `berita`.`id_posisi` '
  + 'ORDER BY `berita`.`id_berita` DESC').then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getberitabyid', checkauth, (req, res) => {
  beritaSchema.findAndCountAll({
    where: {
      id_berita: req.body.id_berita,
    },
  }).then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getposisi', checkauth, (req, res) => {
  beritaSchema.sequelize.query('select id_posisi, nama_web from posisi').then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/deleteberita', checkauth, async (req, res) => {
  const validate = Joi.object().keys({
    id_berita: Joi.number().required(),
  });

  const payload = {
    id_berita: req.body.id_berita,
  };

  Joi.validate(payload, validate, (error) => {
    beritaSchema.destroy({
      where: {
        id_berita: req.body.id_berita,
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

router.post('/updateberita', checkauth, (req, res) => {
  const validate = Joi.object().keys({
    username: Joi.string().required(),
    id_posisi: Joi.string().required(),
    judul: Joi.date().required(),
    sub_judul: Joi.string().required(),
    youtube: Joi.string().required(),
    judul_seo: Joi.string().required(),
    isi_berita: Joi.string().required(),
    keterangan_gambar: Joi.string().required(),
  });

  const payload = {
    username: req.body.username,
    id_posisi: req.body.id_posisi,
    judul: req.body.judul,
    sub_judul: req.body.sub_judul,
    youtube: req.body.youtube,
    judul_seo: req.body.judul_seo,
    isi_berita: req.body.isi_berita,
    keterangan_gambar: req.body.keterangan_gambar,
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
      beritaSchema.update({
        username: req.body.username,
        id_posisi: req.body.id_posisi,
        judul: req.body.judul,
        sub_judul: req.body.sub_judul,
        youtube: req.body.youtube,
        judul_seo: req.body.judul_seo,
        isi_berita: req.body.isi_berita,
        gambar: name_file,
        keterangan_gambar: req.body.keterangan_gambar,
      },
      {
        where: {
          id_berita: req.body.id_berita,
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
      beritaSchema.update({
        username: req.body.username,
        id_posisi: req.body.id_posisi,
        judul: req.body.judul,
        sub_judul: req.body.sub_judul,
        youtube: req.body.youtube,
        judul_seo: req.body.judul_seo,
        isi_berita: req.body.isi_berita,
        keterangan_gambar: req.body.keterangan_gambar,
      },
      {
        where: {
          id_berita: req.body.id_berita,
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
