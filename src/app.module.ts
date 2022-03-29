import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions, Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { GraphModule } from './graph/graph.module';
import { ChatModule } from './chat/chat.module';
import { GraphQLModule } from '@nestjs/graphql';
// import { RecipesModule } from './recipes/recipes.module';
// import { GraphModule } from './graph/graph.module';
import { LabModule } from './lab/lab.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PublicModule } from './public/public.module';
import { MenuModule } from './sys/menu/menu.module';


import { Admin } from "./admin.entity";
import {JwtModule} from "@nestjs/jwt";


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }), UserModule, ChatModule ,
  
  
    // RecipesModule,
    // GraphModule,
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      // installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    LabModule,
    AuthModule,
    UsersModule,
    PublicModule,
    MenuModule,
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
