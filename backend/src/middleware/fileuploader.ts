const path = require("path");
const multer = require('multer');

var storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/images");
    },
    filename: (req, file, cb) => {
        let filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    },
});

var checkFileType = function (file, cb) {
    const fileTypes = /jpeg|jpg|png|/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!", false);
    }
};

var upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

module.exports = upload;