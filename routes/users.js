/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable-next-line object-shorthand */

require('dotenv').config();
const express = require('express');
const Joi = require('joi');

const { gettoken, register } = require('../lib/gateway');

// const axios = require('axios');

const router = express.Router();

// eslint-disable-next-line arrow-body-style
/* GET users listing. */
router.post('/login', (req, res) => {
  try {
    const validate = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const payload = {
      email: req.body.email,
      password: req.body.password,
    };

    Joi.validate(validate, payload, async () => {
      try {
        const data = await gettoken(req.body.email, req.body.password);
        res.status(200).json({
          error: false,
          data: data,
        });
      } catch (error) {
        res.status(400).json({
          status: 500,
          messages: error,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error,
      status: 500,
    });
  }
});

router.post('/register', async function (req, res) {
  const validate = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    role_id: Joi.number().required(),
  });

  const payload = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role_id: req.body.role_id,
  };

  Joi.validate(payload, validate, async () => {
    try {
      const data = await register(req.body.email, req.body.password, req.body.name, req.body.role_id);
      res.status(200).json({
        response: data,
      });
    } catch (error) {
      res.status(400).json({
        status: 500,
        messages: error,
      });
    }
  });
});
module.exports = router;
