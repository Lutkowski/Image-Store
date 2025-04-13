import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

export const UploadFileInterceptor = FileInterceptor('file', {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const uploadFolder = './uploads';
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
      }
      callback(null, uploadFolder);
    },
    filename: (req, file, callback) => {
      const timestamp = Date.now();
      const randomNumber = Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `file${timestamp}and${randomNumber}${ext}`);
    },
  }),
});
