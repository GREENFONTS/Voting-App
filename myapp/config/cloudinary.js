const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'elevio',
  api_key: "441632273511282",
  api_secret: 'QZ_pdgzLjbs90_CinCMIkUYAxis',
});

module.exports = cloudinary;