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
    Joi.validate(schema, payload, (error) => {
      const sukses = menuSchema.create(schema);
      if (sukses) {
        res.status(201).json({
          status: 200,
          messages: 'Menu berhasil ditambahkan',
          data: menuSchema,
        });
      }
      if (error) {
        res.status(422).json({
          error: error.message,
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'ERROR',
      messages: error.message,
      data: {},
    });
  }
});

module.exports = router;
