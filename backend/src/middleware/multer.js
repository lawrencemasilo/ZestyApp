const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // directory for storing files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // file name
    },
});

const upload = multer({
    storage,
    limits: { filesize: 16 * 1024 * 1024 }, // 16MB file size limit
});

module.exports = upload;