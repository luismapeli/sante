const mongoose = require('mongoose');
const geocoder = require('../../utils/geocoder');

const ClinicaPSchema = new mongoose.Schema({
  clinicaPId: {
        type: String,
        required: [true, 'Please add a clinica ID'],
        unique: true,
        trim: true,
        maxlength: [10, 'Clinica ID must be less than 10 chars']
      },
      description: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: [true, 'Please add an address']
      },
      location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

// Geocode & create location
ClinicaPSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  

    this.address = undefined;
    next();
});

module.exports = mongoose.model('ClinicaP', ClinicaPSchema);