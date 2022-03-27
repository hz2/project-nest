import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    private connection: Connection
  ) { }

  create(createMenuDto: CreateMenuDto) {
    if (! createMenuDto.path ) {
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
    return `This action returns all menu`;
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
}
