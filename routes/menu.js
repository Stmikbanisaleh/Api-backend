const express = require('express');
const Joi = require('joi');
const menuSchema = require('../models/menu_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addmenu', checkauth, async (req, res) => {
  const payload = Joi.object({
    id_posisi: Joi.string().required(),
    id_parent: Joi.string().required(),
    nama_menu: Joi.date().required(),
    punya_sub: Joi.string().required(),
    link: Joi.string().required(),
    status_aktif: Joi.string().required(),
  });
  const schema = {
    id_posisi: req.body.id_posisi,
    id_parent: req.body.id_parent,
    nama_menu: req.body.nama_menu,
    punya_sub: req.body.punya_sub,
    link: req.body.link,
    status_aktif: req.body.status_aktif,
    urutan: req.body.urutan,
  };

try {
  Joi.validate(schema, payload, () => {
    menuSchema.create({
      id_posisi: req.body.id_posisi,
      id_parent: req.body.id_parent,
      nama_menu: req.body.nama_menu,
      punya_sub: req.body.punya_sub,
      link: req.body.link,
      status_aktif: req.body.status_aktif,
      urutan: req.body.urutan,
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
