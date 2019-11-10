require('dotenv').config();
const express = require('express');
const Joi = require('joi');
const moment = require('moment');
const fs = require('fs');
const downloadSchema = require('../models/download_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

/* GET users listing. */
router.get('/download/:name', function (req, res, next) {
  const name = req.params.name
  const url = `./public/file/${name}`
  res.download(url); // Set disposition and send it.
});

router.post('/getdownload', checkauth, (req, res) => {
  downloadSchema.findAndCountAll().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getdownloadbyid', checkauth, (req, res) => {
  downloadSchema.findAndCountAll({
    where: {
      id_download: req.body.id_download,
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

router.post('/adddownload', checkauth, async (req, res) => {
  const date = new Date();
  const name = moment(date).format('hhmmiiss');
  const base64Data = req.body.file_base64;
  const type = req.body.file_type;
  const dot = '.';
  const name_file = `${req.body.nama_file}${name}${dot}${type}`;
  fs.writeFileSync(`./public/file/${req.body.nama_file}${name}${dot}${type}`, base64Data, 'base64', () => {
  });

  const payload = Joi.object({
    judul: Joi.string().required(),
    tgl_posting: Joi.string().required(),
    hits: Joi.string().required(),
  });
  const schema = {
    judul: req.body.judul,
    tgl_posting: req.body.tgl_posting,
    hits: req.body.hits,
  };

  try {
    Joi.validate(schema, payload, () => {
      downloadSchema.create({
        judul: req.body.judul,
        nama_file: name_file,
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

router.post('/updatedownload', checkauth, (req, res) => {
  if(req.body.nama_file){
    const date = new Date();
    const name = moment(date).format('hhmmiiss');
    const base64Data = req.body.file_base64;
    const type = req.body.file_type;
    const dot = '.';
    const name_file = `${req.body.nama_file}${name}${dot}${type}`;
    fs.writeFileSync(`./public/file/${req.body.nama_file}${name}${dot}${type}`, base64Data, 'base64', () => {
    });

    const _file = {
      nama_file: name_file,
    }

    downloadSchema.update(_file, {
      where: {
        id_download: req.body.id_download
      }
    })
  }

  const payload = {
    judul: req.body.judul,
    tgl_posting: req.body.tgl_posting,
    hits: req.body.hits,
  }

  let validate = Joi.object().keys({
    judul: Joi.string().required(),
    tgl_posting: Joi.date().required(),
    hits: Joi.string().required(),
  });
  Joi.validate(payload, validate, (error) => {
    downloadSchema.update(payload, {
      where: {
        id_download: req.body.id_download
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

router.post('/deletedownload', checkauth, async (req, res) => {
  let validate = Joi.object().keys({
    id_download: Joi.number().required(),
  });

  const payload = {
    id_download: req.body.id_download,
  }

  Joi.validate(payload, validate, (error) => {
    downloadSchema.destroy({
      where: {
        id_download: req.body.id_download,
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

router.post('/deletedownload', checkauth, async (req, res) => {
  let validate = Joi.object().keys({
    id_download: Joi.number().required(),
  });

  const payload = {
    id_download: req.body.id_download,
  }

  Joi.validate(payload, validate, (error) => {
    downloadSchema.destroy({
      where: {
        id_download: req.body.id_download,
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
