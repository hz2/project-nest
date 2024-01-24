import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Stream } from 'stream';
import { pubLink, baseBucket } from '@root/minio.config.json';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto'
import { NoResultCallback } from 'minio';

@Injectable()
export class MinioClientService {
    private readonly logger: Logger;
    private readonly baseBucket = baseBucket

    public get client() {
        return this.minio.client;
    }

    constructor(
        private readonly minio: MinioService,
    ) {
        this.logger = new Logger('MinioStorageService');
    }

    public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
        // if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
        //     throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
        // }
        let temp_filename = Date.now().toString()
        let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const metaData = {
            'Content-Type': file.mimetype,
            // 'X-Amz-Meta-Testing': 1234,
        };
        let filename = hashedFileName + ext
        const fileName: string = `web-storage/${filename}`;
        const fileBuffer = file.buffer;
        // metaData
        await this.client.putObject(baseBucket, fileName, fileBuffer, metaData).catch(err => {
            if (err) {
                console.log('e', err);
                throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
            }
        })
        return {
            url: `${pubLink}/${baseBucket}/${fileName}`
        }
    }

    async delete(objetName: string, baseBucket: string = this.baseBucket) {
        this.client.removeObject(baseBucket, objetName, function (err, res) {
            if (err) throw new HttpException("Oops Something wrong happend", HttpStatus.BAD_REQUEST)
        } as NoResultCallback)
    }
}

