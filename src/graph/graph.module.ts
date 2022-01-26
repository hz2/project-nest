import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    // GraphQLModule.forRootAsync({
    //   useFactory: () => ({
    //     typePaths: ['./**/*.graphql'],
    //   }),
    // }),
  ],
  // providers: [GraphResolver, GraphService]
})
export class GraphModule { }
