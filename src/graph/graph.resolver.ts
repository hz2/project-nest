import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphService } from './graph.service';
import { CreateGraphInput } from './dto/create-graph.input';
import { UpdateGraphInput } from './dto/update-graph.input';

@Resolver('Graph')
export class GraphResolver {
  constructor(private readonly graphService: GraphService) {}

  @Mutation('createGraph')
  create(@Args('createGraphInput') createGraphInput: CreateGraphInput) {
    return this.graphService.create(createGraphInput);
  }

  @Query('graph')
  findAll() {
    return this.graphService.findAll();
  }

  @Query('graph')
  findOne(@Args('id') id: number) {
    return this.graphService.findOne(id);
  }

  @Mutation('updateGraph')
  update(@Args('updateGraphInput') updateGraphInput: UpdateGraphInput) {
    return this.graphService.update(updateGraphInput.id, updateGraphInput);
  }

  @Mutation('removeGraph')
  remove(@Args('id') id: number) {
    return this.graphService.remove(id);
  }
}
