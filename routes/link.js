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
  const dot = '.';
  const name_file = `${req.body.logo}${name}${dot}${type}`;
  fs.writeFileSync(`./public/file/${req.body.logo}${name}${dot}${type}`, base64Data, 'base64', () => {
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
          message: 'Link berhasil ditambahkan',
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

router.post('/getlink', checkauth, (req, res) => {
  linkSchema.findAndCountAll().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getlinkbyid', checkauth, (req, res) => {
  linkSchema.findAndCountAll({
    where: {
      id_link: req.body.id_link,
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

router.post('/updatelink', checkauth, (req, res) => {
  if(req.body.logo){
    const date = new Date();
    const name = moment(date).format('hhmmiiss');
    const base64Data = req.body.file_base64;
    const type = req.body.file_type;
    const dot = '.';
    const name_file = `${req.body.logo}${name}${dot}${type}`;
    fs.writeFileSync(`./public/file/${req.body.logo}${name}${dot}${type}`, base64Data, 'base64', () => {
    });

    const _file = {
      logo: name_file,
    }

    linkSchema.update(_file, {
      where: {
        id_link: req.body.id_link
      }
    })
  }

  const payload = {
    kategori: req.body.kategori,
    nama_link: req.body.nama_link,
    url_web: req.body.url_web,
  }

  let validate = Joi.object().keys({
    nama_link: Joi.string().required(),
    url_web: Joi.string().required(),
    kategori: Joi.string().required(),
  });
  Joi.validate(payload, validate, (error) => {
    linkSchema.update(payload, {
      where: {
        id_link: req.body.id_link
      }
    }).then((data) => {
      res.status(200).json({
        'status': 200,
        'message' : 'Update Succesfully'
      })
    })
    if (error) {
      res.status(400).json({
        'status': 400,
        'messages' : '' + error,
      })
    }
  })
})

router.post('/deletelink', checkauth, async (req, res) => {
  let validate = Joi.object().keys({
    id_link: Joi.number().required(),
  });

  const payload = {
    id_link: req.body.id_link,
  }

  Joi.validate(payload, validate, (error) => {
    linkSchema.destroy({
      where: {
        id_link: req.body.id_link,
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
