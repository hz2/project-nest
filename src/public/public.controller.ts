import { Controller, Get, Post, Headers, Ip, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicService } from './public.service';
import { CreatePublicDto } from './dto/create-public.dto';
import { UpdatePublicDto } from './dto/update-public.dto';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) { }

  @Post('/feedback')
  create(@Body() createPublicDto: CreatePublicDto, @Headers() header: Headers, @Ip() ip: string) {
    return this.publicService.create(createPublicDto, header, ip);
  }

  @Get('/getFeedBackList')
  findAll(@Param() param) {
    return this.publicService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicDto: UpdatePublicDto) {
    return this.publicService.update(+id, updatePublicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicService.remove(+id);
  }
}
