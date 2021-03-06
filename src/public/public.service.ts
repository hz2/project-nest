import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';
import { Public } from "./entities/public.entity"

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(Public)
    private publicRepository: Repository<Public>,
    private connection: Connection
  ) { }

  create(createPublicDto: CreatePublicDto, header: Headers, ip: string) {
    if (!createPublicDto.content) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `content 必填`,
      }, HttpStatus.BAD_REQUEST);
    }
    let realip = '';
    if ( ip === '127.0.0.1') {
      realip = header['x-real-ip']
    } else {
      realip = ip
    }
    try {
      this.publicRepository.save({
        ...createPublicDto,
        userAgent: header['user-agent'],
        ip: realip
      });
      return '成功！'
    } catch (error) {

    }
  }

  findAll(param) {
    return this.publicRepository.find(param);
  }

  findOne(id: number) {
    return this.publicRepository.findOne(id);
  }

  update(id: number, updatePublicDto: UpdatePublicDto) {
    return `This action updates a #${id} public`;
  }

  remove(id: number) {
    return `This action removes a #${id} public`;
  }
}
