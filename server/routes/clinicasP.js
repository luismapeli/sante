const express = require('express');
const { getClinicasP, addClinicaP } = require('../controller/clinicasP');
const router = express.Router();

router.route('/').get(getClinicasP).post(addClinicaP);

module.exports = router;