import { Injectable } from '@nestjs/common';
import { writeFile, createReadStream, createWriteStream } from 'fs';
import { promisify } from "util"
import { resolve } from "path"
const writeFileProm = promisify(writeFile)
@Injectable()
export class FileService {
    saveFile(file: Express.Multer.File,) {
        ""
    }
}
