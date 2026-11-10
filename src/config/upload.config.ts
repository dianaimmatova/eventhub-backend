import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface.js';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const imageUploadOptions: MulterOptions = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, unique + extname(file.originalname));
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new BadRequestException('Только JPG и PNG'), false);
        }
    },
};