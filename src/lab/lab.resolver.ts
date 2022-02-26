import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewCountryInput } from './dto/new-country.input';
import { Country } from './entities/country';
import { CPhone } from "./entities/phone";
import { Gua } from './entities/gua';
import { LabService } from './lab.service';

@Resolver()
export class LabResolver {
  constructor(private LabService: LabService) { }

  @Query(() => [Country])
  public async countrys(): Promise<Country[]> {
    return await this.LabService.getAllCountry().catch((err) => {
      throw err;
    });
  }

  @Query(() => [Country])
  public async currency(): Promise<Country[]> {
    return await this.LabService.getAllCurrency().catch((err) => {
      throw err;
    });
  }

  @Query(() => Country)
  public async country(@Args('iso', { nullable: true }) iso?: string): Promise<Country> {
    return await this.LabService.findCountryByIso(iso).catch((err) => {
      throw err;
    });
  }

  @Query(() => Gua)
  public async gua(@Args('key', { nullable: true }) key?: string): Promise<Gua> {
    return await this.LabService.findGua(key).catch((err) => {
      throw err;
    });
  }

  @Query(() => [String])
  public async area(@Args('code') code: string): Promise<string[]> {
    return await this.LabService.getAreaByCode(code).catch((err) => {
      throw err;
    });
  }

  @Query(() => CPhone)
  public async phone(@Args('num', { nullable: true }) num?: string): Promise<CPhone> {
    return await this.LabService.queryPhone(num).catch((err) => {
      throw err;
    });
  }


  // @Mutation(() => Country)
  // public async addNewCountry(
  //   @Args('newCountryData') newCountryData: NewCountryInput,
  // ): Promise<Country> {
  //   return await this.LabService.addCountry(newCountryData).catch((err) => {
  //     throw err;
  //   });
  // }
}