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

  create(createPublicDto: CreatePublicDto) {
    if ( ! createPublicDto.content ) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `content 必填`,
      }, HttpStatus.BAD_REQUEST);
    }
    try {
      this.publicRepository.save(createPublicDto);
      return '成功！'
    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all public`;
  }

  findOne(id: number) {
    return `This action returns a #${id} public`;
  }

  update(id: number, updatePublicDto: UpdatePublicDto) {
    return `This action updates a #${id} public`;
  }

  remove(id: number) {
    return `This action removes a #${id} public`;
  }
}
