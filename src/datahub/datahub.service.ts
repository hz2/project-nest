import { Injectable } from '@nestjs/common';
import { CreateDatahubDto } from './dto/create-datahub.dto';
import { UpdateDatahubDto } from './dto/update-datahub.dto';

@Injectable()
export class DatahubService {
  create(createDatahubDto: CreateDatahubDto) {
    return 'This action adds a new datahub';
  }

  findAll() {
    return `This action returns all datahub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datahub`;
  }

  update(id: number, updateDatahubDto: UpdateDatahubDto) {
    return `This action updates a #${id} datahub`;
  }

  remove(id: number) {
    return `This action removes a #${id} datahub`;
  }
}
