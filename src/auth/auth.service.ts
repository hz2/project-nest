import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    // private readonly jwtService: JwtService,
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.adminRepository.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
  async create(data: any): Promise<Admin> {
    return this.adminRepository.save(data);
  }

  async update(data: any): Promise<Admin> {
    return this.adminRepository.save(data);
  }

  async findOne(condition: any): Promise<Admin> {
    return this.adminRepository.findOne(condition);
  }
}