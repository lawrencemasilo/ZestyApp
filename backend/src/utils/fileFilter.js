/**
 * File filter function for Multer.
 * Filters upload files based on their MIME type.
 * 
 * @param {Request} req - The Express request object
 * @param {File} file - The file object to be uploaded
 * @param {Function} cb - The callback function to indicate success or error
 */

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file
        cb(new Error("Unsupported file type. Only PDF, JPEG, and PNG files are allowed."), false);
    }
};

module.exports = fileFilter;