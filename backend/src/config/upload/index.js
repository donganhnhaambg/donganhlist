const multer = require('multer');

const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/image/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/file/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadImage = multer({ storage: storageImage});
const uploadFile = multer({storage: storageFile})

module.exports = {uploadImage, uploadFile};