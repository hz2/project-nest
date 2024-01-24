import { PartialType } from '@nestjs/mapped-types';
import { CreateDatahubDto } from './create-datahub.dto';

export class UpdateDatahubDto extends PartialType(CreateDatahubDto) {}
