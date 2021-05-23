const ClinicaP = require('../model/ClinicaP')

exports.getClinicasP = async (req, res, next) =>{
    try {
        const clinicasP = await ClinicaP.find();

        return res.status(200).json({
            success: true,
            count: clinicasP.length,
            data: clinicasP
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc  Create a clinica
// @route POST /api/v1/clinicas
// @access Public
exports.addClinicaP = async (req, res, next) => {
    try {
      const clinicaP = await ClinicaP.create(req.body);
  
      return res.status(201).json({
        success: true,
        data: clinicaP
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Esta clinica já existi' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };