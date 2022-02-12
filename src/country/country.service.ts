import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Not, Repository } from 'typeorm';
  import { NewCountryInput } from './dto/new-country.input';
  import { Country } from './entities/country';
  
  @Injectable()
  export class CountryService {
    constructor(
      @InjectRepository(Country) private countryRepository: Repository<Country>,
    ) {}
  
    public async getAllCountry(): Promise<Country[]> {
      const countrys = await this.countryRepository.find({});
  
      if (!countrys) throw new NotFoundException();
  
      return countrys;
    }

    public async findCountryByIso(iso:string): Promise<Country> {
      const country = await this.countryRepository.find({
        iso: iso
      })
      const r = country[0]  
      if (!r) throw new NotFoundException();  
      return r;
    }

    public async getAllCurrency(): Promise<Country[]> {
      const countrys = await this.countryRepository.find({
        currency: Not(""),
      });
  
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