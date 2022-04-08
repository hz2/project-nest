import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { endPoint, port, useSSL, accessKey, secretKey } from '@root/minio.config.json';
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

