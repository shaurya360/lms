// In your server/utils/multer.js (or wherever your multer is configured)
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Import fs for directory creation

const uploadDir = '/tmp/uploads'; // This is the temporary, writable directory on Vercel

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the '/tmp/uploads' directory exists before Multer tries to write to it.
    // It's good practice to create it if it doesn't exist.
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating temporary upload directory:', err);
        return cb(err);
      }
      cb(null, uploadDir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

export default upload;
