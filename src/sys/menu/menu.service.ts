import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

var Minio = require('minio')



type MenuWithChild = Menu & {
  children?: MenuWithChild[]
}
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    private connection: Connection
  ) { }

  create(createMenuDto: CreateMenuDto) {
    if (!createMenuDto.path) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `必填`,
      }, HttpStatus.BAD_REQUEST);
    }
    this.menuRepository.save({
      ...createMenuDto
    });
  }

  findAll() {
    return this.menuRepository.find();
  }

  async findAllTree() {
    const menuAll: MenuWithChild[] = await this.menuRepository.find();
    const menuChildrenList = [... new Set(menuAll.map((x: Menu) => x.parentId))]
    menuAll.forEach(x => { menuChildrenList.includes(x.id) ? x.children = menuAll.filter(y => y.parentId === x.id) : void 0 })
    return menuAll.filter(x=>x.parentId===0)
  }

  findOne(id: number) {
    return this.menuRepository.findOne(id);
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }

  upload(){

    var minioClient = new Minio.Client({
      endPoint: '0xc8.com',
      port: 9001,
      useSSL: true,
      accessKey: 'h__',
      secretKey: 'CvufvYwuBc2kA8e'
  });

  var file = './public.subscriber.ts'

  // Make a bucket called europetrip.
  minioClient.makeBucket('europetrip', 'us-east-1', function(err) {
      if (err) return console.log(err)
  
      console.log('Bucket created successfully in "us-east-1".')
  
      var metaData = {
          'Content-Type': 'application/octet-stream',
          'X-Amz-Meta-Testing': 1234,
          'example': 5678
      }
      // Using fPutObject API upload your file to the bucket europetrip.
      minioClient.fPutObject('europetrip', 'photos-europe.tar', file, metaData, function(err, etag) {
        if (err) return console.log(err)
        console.log('File uploaded successfully.')
      });
  });

    
  }
}
