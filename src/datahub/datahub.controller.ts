import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatahubService } from './datahub.service';
import { CreateDatahubDto } from './dto/create-datahub.dto';
import { UpdateDatahubDto } from './dto/update-datahub.dto';

@Controller('datahub')
export class DatahubController {
  constructor(private readonly datahubService: DatahubService) {}

  @Post()
  create(@Body() createDatahubDto: CreateDatahubDto) {
    return this.datahubService.create(createDatahubDto);
  }

  @Get()
  findAll() {
    return this.datahubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datahubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatahubDto: UpdateDatahubDto) {
    return this.datahubService.update(+id, updateDatahubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datahubService.remove(+id);
  }
}
