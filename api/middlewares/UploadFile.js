const multer = require('multer');

//-------- Function to create the storage
const storage = multer.memoryStorage();

// Allowed image mime types
const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];

//------- Create the Upload File function to upload the files
const UploadFile = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2 MB (you can change this limit)
    },
    fileFilter: (req, file, cb) => {
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed!'), false);
        }
    }
}).single('file');

module.exports = UploadFile;