const Clinica = require('../model/Clinica')

exports.getClinicas = async (req, res, next) =>{
    try {
        const clinicas = await Clinica.find();

        return res.status(200).json({
            success: true,
            count: clinicas.length,
            data: clinicas
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc  Create a clinica
// @route POST /api/v1/clinicas
// @access Public
exports.addClinica = async (req, res, next) => {
    try {
      const clinica = await Clinica.create(req.body);
  
      return res.status(201).json({
        success: true,
        data: clinica
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Esta clinica já existi' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };