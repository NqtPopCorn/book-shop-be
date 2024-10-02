const { Router } = require('express');
const express = require('express');

const router = Router();

router.use('/images', express.static('public/img'));

module.exports = router;