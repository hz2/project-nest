import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewCountryInput } from './dto/new-country.input';
import { Country } from './entities/country';
import { CPhone } from "./entities/phone";
import { CountryService } from './country.service';

@Resolver()
export class CountryResolver {
  constructor(private CountryService: CountryService) { }

  @Query(() => [Country])
  public async countrys(): Promise<Country[]> {
    return await this.CountryService.getAllCountry().catch((err) => {
      throw err;
    });
  }

  @Query(() => [Country])
  public async currency(): Promise<Country[]> {
    return await this.CountryService.getAllCurrency().catch((err) => {
      throw err;
    });
  }

  @Query(() => Country)
  public async country(@Args('iso', { nullable: true }) iso?: string): Promise<Country> {
    return await this.CountryService.findCountryByIso(iso).catch((err) => {
      throw err;
    });
  }

  @Query(() => [String])
  public async area(@Args('code') code: string): Promise<string[]> {
    return await this.CountryService.getAreaByCode(code).catch((err) => {
      throw err;
    });
  }

  @Query(() => CPhone)
  public async phone(@Args('num', { nullable: true }) num?: string): Promise<CPhone> {
    return await this.CountryService.queryPhone(num).catch((err) => {
      throw err;
    });
  }


  // @Mutation(() => Country)
  // public async addNewCountry(
  //   @Args('newCountryData') newCountryData: NewCountryInput,
  // ): Promise<Country> {
  //   return await this.CountryService.addCountry(newCountryData).catch((err) => {
  //     throw err;
  //   });
  // }
}