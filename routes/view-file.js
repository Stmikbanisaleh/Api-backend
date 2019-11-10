require('dotenv').config();

const bcrypt = require('bcrypt');
const express = require('express');
const Joi = require('joi');
const moment = require('moment');
const fs = require('fs');
const checkauth = require('../middleware/validation');

const router = express.Router();
const salt = process.env.SALT;

/* GET users listing. */
router.get('/file/:name', checkauth, async (req, res) => {
    const name = req.params.name
    const url = `./public/file/${name}`
    // console.log(url);
    res.download(url); // Set disposition and send it.
});

module.exports = router;