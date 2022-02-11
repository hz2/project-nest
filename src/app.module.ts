import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions, Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityInfoModule } from './city-info/city-info.module';
import { UserModule } from './user/user.module';
// import { GraphModule } from './graph/graph.module';
import { ChatModule } from './chat/chat.module';
import { GraphQLModule } from '@nestjs/graphql';
// import { RecipesModule } from './recipes/recipes.module';
// import { GraphModule } from './graph/graph.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }), CityInfoModule, UserModule, ChatModule ,
  
  
    // RecipesModule,
    // GraphModule,
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      // installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
