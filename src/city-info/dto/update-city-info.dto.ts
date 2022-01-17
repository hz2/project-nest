import { PartialType } from '@nestjs/mapped-types';
import { CreateCityInfoDto } from './create-city-info.dto';

export class UpdateCityInfoDto extends PartialType(CreateCityInfoDto) {}
