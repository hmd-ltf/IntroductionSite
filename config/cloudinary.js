const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'hmdltf',
  api_key: 727487712534548,
  api_secret: '5bMjmVEXv1K5BwKSHaXFqL6NsVM',
});

module.exports = { cloudinary };
