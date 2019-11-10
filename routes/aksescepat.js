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

router.post('/getaksescepat', checkauth, (req, res) => {
  aksescepatSchema.findAndCountAll().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getaksescepatbyid', checkauth, (req, res) => {
  aksescepatSchema.findAndCountAll({
    where: {
      id_akses: req.body.id_akses,
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

router.post('/updateaksescepat', checkauth, (req, res) => {

  const payload = {
    nama_link: req.body.nama_link,
    url: req.body.url,
  }

  let validate = Joi.object().keys({
    nama_link: Joi.string().required(),
    url: Joi.string().required(),
  });
  Joi.validate(payload, validate, (error) => {
    aksescepatSchema.update(payload, {
      where: {
        id_akses: req.body.id_akses
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

router.post('/deleteaksescepat', checkauth, async (req, res) => {
  let validate = Joi.object().keys({
    id_akses: Joi.number().required(),
  });

  const payload = {
    id_akses: req.body.id_akses,
  }

  Joi.validate(payload, validate, (error) => {
    aksescepatSchema.destroy({
      where: {
        id_akses: req.body.id_akses,
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
