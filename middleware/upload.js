const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/awsConfig');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, `uploads/${Date.now()}_${file.originalname}`);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
}).single('image');

module.exports = upload;
