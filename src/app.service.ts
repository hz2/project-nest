import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./admin.entity";
import { Repository } from "typeorm";


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>
  ) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  async create(data: any): Promise<Admin> {
    return this.adminRepository.save(data);
  }

  async findOne(condition: any): Promise<Admin> {
    return this.adminRepository.findOne(condition);
  }
}
