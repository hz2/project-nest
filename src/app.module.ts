import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions, Connection } from 'typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
// import { GraphModule } from './graph/graph.module';
import { ChatModule } from './chat/chat.module';
import { GraphQLModule } from '@nestjs/graphql';
// import { RecipesModule } from './recipes/recipes.module';
// import { GraphModule } from './graph/graph.module';
import { LabModule } from './lab/lab.module';
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/public.module';
import { MenuModule } from './sys/menu/menu.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AccountModule } from './sys/account/account.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UserModule,
    ChatModule,
    // RecipesModule,
    // GraphModule,
    GraphQLModule.forRoot({
      playground: true,
      debug: process.env.NODE_ENV === 'development' ? true : false,
      // installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    LabModule,
    AuthModule,
    PublicModule,
    MenuModule,
    MinioClientModule,
    FileUploadModule,
    AccountModule
  ],
  controllers: [AppController]
})
export class AppModule {
  constructor(private connection: Connection) { }
}
