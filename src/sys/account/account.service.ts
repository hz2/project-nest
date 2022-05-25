import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Admin as Account } from '@/auth/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

const filterPwd = ({ password,...item}:Account)=> item;

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private connection: Connection
  ) { }

  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  async findAll() {
    const r = await this.accountRepository.find();
    return r.map(x=>filterPwd(x))
  }

  async findOne(id: number) {
    const r = await this.accountRepository.find({id});
    return filterPwd(r[0])
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
