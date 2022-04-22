require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "di4mjqigh",
    api_key: "334366726244989",
    api_secret: "jNt76KNPCFjhVz_VBnpamM4u4uA",
});

module.exports = { cloudinary };