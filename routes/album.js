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
  const dot = '.';
  const name_file = `${req.body.gambar}${name}${dot}${type}`;
  fs.writeFileSync(`./public/file/${req.body.gambar}${name}${dot}${type}`, base64Data, 'base64', () => {
  });

  
  const payload = Joi.object({
    judul_album: Joi.string().required(),
    album_seo: Joi.string().required(),
    keterangan: Joi.string().required(),
    tgl_posting: Joi.date().required(),
    username: Joi.string().required(),
  });
  const schema = {
    judul_album: req.body.judul_album,
    album_seo: req.body.album_seo,
    keterangan: req.body.keterangan,
    tgl_posting: req.body.tgl_posting,
    username: req.body.username,
    gambar: name_file,
  };


  try {
    Joi.validate(schema, payload, () => {
      albumSchema.create({
        judul_album: req.body.judul_album,
        album_seo: req.body.album_seo,
        keterangan: req.body.keterangan,
        tgl_posting: req.body.tgl_posting,
        username: req.body.username,
        gambar: name_file,
      }).then((data) => {
        res.json({
          status: 200,
          data,
          message: 'Album berhasil ditambahkan',
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

router.post('/getalbum', checkauth, (req, res) => {
  albumSchema.findAndCountAll().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getalbumbyid', checkauth, (req, res) => {
  albumSchema.findAndCountAll({
    where: {
      id_album: req.body.id_album,
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

router.post('/updatealbum', checkauth, (req, res) => {
  if(req.body.gambar){
    const date = new Date();
    const name = moment(date).format('hhmmiiss');
    const base64Data = req.body.gambar_base64;
    const type = req.body.gambar_type;
    const dot = '.';
    const name_file = `${req.body.gambar}${name}${dot}${type}`;
    fs.writeFileSync(`./public/file/${req.body.gambar}${name}${dot}${type}`, base64Data, 'base64', () => {
    });

    const _file = {
      gambar: name_file,
    }

    albumSchema.update(_file, {
      where: {
        id_album: req.body.id_album
      }
    })
  }

  const payload = {
    judul_album: req.body.judul_album,
    album_seo: req.body.album_seo,
    keterangan: req.body.keterangan,
    tgl_posting: req.body.tgl_posting,
    username: req.body.username,
  }

  let validate = Joi.object().keys({
    judul_album: Joi.string().required(),
    album_seo: Joi.string().required(),
    keterangan: Joi.string().required(),
    tgl_posting: Joi.date().required(),
    username: Joi.string().required(),
  });

  Joi.validate(payload, validate, (error) => {
    albumSchema.update(payload, {
      where: {
        id_album: req.body.id_album
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
