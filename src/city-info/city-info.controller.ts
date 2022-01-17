import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityInfoService } from './city-info.service';
import { CreateCityInfoDto } from './dto/create-city-info.dto';
import { UpdateCityInfoDto } from './dto/update-city-info.dto';

@Controller('city-info')
export class CityInfoController {
  constructor(private readonly cityInfoService: CityInfoService) {}

  @Post('/create')
  create(@Body() createCityInfoDto: CreateCityInfoDto) {
    return this.cityInfoService.create(createCityInfoDto);
  }

  @Get()
  findAll() {
    return this.cityInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityInfoDto: UpdateCityInfoDto) {
    return this.cityInfoService.update(+id, updateCityInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityInfoService.remove(+id);
  }
}
