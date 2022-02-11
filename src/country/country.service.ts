import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { NewCountryInput } from './dto/new-country.input';
  import { Country } from './entities/country';
  
  @Injectable()
  export class CountryService {
    constructor(
      @InjectRepository(Country) private countryRepository: Repository<Country>,
    ) {}
  
    public async getAllCountrys(): Promise<Country[]> {
      const countrys = await this.countryRepository.find({});
  
      if (!countrys) throw new NotFoundException();
  
      return countrys;
    }
  
    public async addCountry(newCountryData: NewCountryInput): Promise<Country> {
      const newCountry = this.countryRepository.create(newCountryData);
      await this.countryRepository.save(newCountry).catch((err) => {
        new InternalServerErrorException();
      });
      return newCountry;
    }
  }