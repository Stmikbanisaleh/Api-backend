const express = require('express');
const Joi = require('joi');
const moment = require('moment');
const fs = require('fs');
const sopSchema = require('../models/sop_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addsop', checkauth, async (req, res) => {
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
    nama_judul: Joi.string().required(),
    tgl_posting: Joi.string().required(),
  });
  const schema = {
    judul: req.body.judul,
    nama_judul: req.body.nama_judul,
    tgl_posting: req.body.tgl_posting,
  };
  try {
    Joi.validate(schema, payload, () => {
      sopSchema.create({
        judul: req.body.judul,
        nama_judul: req.body.nama_judul,
        nama_file: name_file,
        tgl_posting: req.body.tgl_posting,
      }).then((data) => {
        res.json({
          status: 200,
          data,
          message: 'SOP berhasil ditambahkan',
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

router.post('/getsop', checkauth, (req, res) => {
  sopSchema.findAndCountAll().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getsopbyid', checkauth, (req, res) => {
  sopSchema.findAndCountAll({
    where: {
      id_sop: req.body.id_sop,
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

router.post('/updatesop', checkauth, (req, res) => {
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

    sopSchema.update(_file, {
      where: {
        id_sop: req.body.id_sop
      }
    })
  }

  const payload = {
    judul: req.body.judul,
    nama_judul: req.body.nama_judul,
    tgl_posting: req.body.tgl_posting,
  }

  let validate = Joi.object().keys({
    judul: Joi.string().required(),
    nama_judul: Joi.string().required(),
    tgl_posting: Joi.date().required(),
  });
  Joi.validate(payload, validate, (error) => {
    sopSchema.update(payload, {
      where: {
        id_sop: req.body.id_sop
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

router.post('/deletesop', checkauth, async (req, res) => {
  let validate = Joi.object().keys({
    id_sop: Joi.number().required(),
  });

  const payload = {
    id_sop: req.body.id_sop,
  }

  Joi.validate(payload, validate, (error) => {
    sopSchema.destroy({
      where: {
        id_sop: req.body.id_sop,
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
