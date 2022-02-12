import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewCountryInput } from './dto/new-country.input';
import { Country } from './entities/country';
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
  public async country(@Args('iso') iso: string): Promise<Country> {
    return await this.CountryService.findCountryByIso(iso).catch((err) => {
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