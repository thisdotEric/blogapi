import multer from 'multer';
import { generateFileName } from './file';

const STORAGE_BUCKET = './uploads/';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, STORAGE_BUCKET);
  },

  filename: function (_: any, file: any, cb: any) {
    cb(null, generateFileName(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
