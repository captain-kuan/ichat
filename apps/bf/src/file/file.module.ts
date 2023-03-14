import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from "path"
@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: `./public/upload/`,
                filename(req, file, callback) {
                    const filename = `${new Date().getTime() + extname(file.originalname)}`
                    callback(null, filename);
                },
            }),
        }),
    ],
    providers: [FileService],
    controllers: [FileController],
})
export class FileModule { }
