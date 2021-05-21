const express = require('express');
const { getClinicas, addClinica } = require('../controller/clinicas');
const router = express.Router();

router.route('/').get(getClinicas).post(addClinica);

module.exports = router;