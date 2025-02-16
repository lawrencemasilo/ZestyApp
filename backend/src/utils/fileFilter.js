const path = require("path");

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

    const allowedExtensions = [".pdf", ".jpeg", ".jpg", ".png"];
    
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const isMimeTypeAllowed = allowedMimeTypes.includes(file.mimetype.toLowerCase());
    const isExtensionAllowed = allowedExtensions.includes(fileExtension);

    if (isMimeTypeAllowed && isExtensionAllowed) {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file
        console.error(`Rejected file: ${file.originalname} (MIME type: ${file.mimetype})`);
        cb(new Error(`Unsupported file type for ${file.originalname}. Only PDF, JPEG, and PNG files are allowed.`), false);
    }
};

module.exports = fileFilter;