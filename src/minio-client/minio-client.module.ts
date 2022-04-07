import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import config from '@root/minio.config';
const { endPoint, port, useSSL, accessKey, secretKey } = config
@Module({
  imports: [
    MinioModule.register({
      endPoint, port, useSSL, accessKey, secretKey
    })
  ],
  providers: [MinioClientService],
  exports: [MinioClientService]
})
export class MinioClientModule { }

