import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { NewCountryInput } from './dto/new-country.input';
import { Country } from './entities/country';
import { Xzqh } from './entities/xzqh';
import { Gua, GuaSet } from './entities/gua';
import { Phone, CPhone } from "./entities/phone";


@Injectable()
export class LabService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(Xzqh) private xzqhRepository: Repository<Xzqh>,
    @InjectRepository(Gua) private guaRepository: Repository<Gua>,
  ) { }

  public async getAllCountry(): Promise<Country[]> {
    const countrys = await this.countryRepository.find({});

    if (!countrys) throw new NotFoundException();

    return countrys;
  }

  public async findCountryByIso(iso?: string): Promise<Country> {
    const r = await this.countryRepository.findOne({
      iso: iso
    })
    if (!r) throw new NotFoundException();
    return r;
  }



  // gua
  public async findGua(keyarr?: string[]): Promise<GuaSet> {
    const r = await this.guaRepository.find({
      where: keyarr.map(x => ({ key: x }))
    })
    if (!r) throw new NotFoundException();
    const guaSet: GuaSet = Object.fromEntries(keyarr.map((x, i) => [r[i].key, { ...r[i] }]))
    return guaSet;
  }

  public async findOneGua(key?: string): Promise<Gua> {
    const r = await this.guaRepository.find({
      key
    })
    if (!r) throw new NotFoundException();
    console.log('r', r);

    return r[0];
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

  public async getAreaByCode(code: string): Promise<string[]> {
    const province = code.substring(0, 2) + '0000'
    const city = code.substring(0, 4) + '00'
    const items = await this.xzqhRepository.find({
      where: [
        { code: province },
        { code: city },
        { code },
      ],
    });
    if (!items) throw new NotFoundException();

    return items.map(x => x.name);
  }

  public async queryPhone(num: string): Promise<CPhone> {
    const result = Phone(num)
    if (!result) throw new NotFoundException();
    return result
  }
  // public async getAllArea(): Promise<Xzqh[]> {
  //   const areas = await this.xzqhRepository.find({});

  //   if (!areas) throw new NotFoundException();

  //   return areas;
  // }

}