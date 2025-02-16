const multer = require('multer');
const path = require('path');
const fileFilter = require('../utils/fileFilter');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/"); // directory for storing files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // unique suffix
        const ext = path.extname(file.originalname); // extract file extension
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // set file name
    },
});

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 16 * 1024 * 1024 }, // 16MB file size limit
});

module.exports = upload;