import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: `./public/upload/`,
                filename(req, file, callback) {
                    callback(null, '1.png');
                },
            }),
        }),
    ],
    providers: [FileService],
    controllers: [FileController],
})
export class FileModule {}
