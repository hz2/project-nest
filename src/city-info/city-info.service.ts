import { Injectable } from '@nestjs/common';
import { CreateCityInfoDto } from './dto/create-city-info.dto';
import { UpdateCityInfoDto } from './dto/update-city-info.dto';

@Injectable()
export class CityInfoService {
  create(createCityInfoDto: CreateCityInfoDto) {
    console.log('CreateCityInfoDto', JSON.stringify( CreateCityInfoDto ) );
    
    return 'This action adds a new cityInfo';
  }

  findAll() {
    return `This action returns all cityInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cityInfo`;
  }

  update(id: number, updateCityInfoDto: UpdateCityInfoDto) {
    return `This action updates a #${id} cityInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} cityInfo`;
  }
}
