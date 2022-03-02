import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'gua' })
@ObjectType()
export class Gua {
  @PrimaryGeneratedColumn("increment")
  @Field()
  pkey: number;

  @Column()
  @Field()
  key: string;

  @Column()
  @Field()
  qian: string;

  @Column()
  @Field()
  dui: string;

  @Column()
  @Field()
  li: string;

  @Column()
  @Field()
  zhen: string;

  @Column()
  @Field()
  xun: string;

  @Column()
  @Field()
  kan: string;

  @Column()
  @Field()
  gen: string;

  @Column()
  @Field()
  kun: string;

  @Column()
  @Field()
  remark: string;

}

@ObjectType({ description: 'guaset' })
export class GuaSet {
  @Field(type => Gua)
  color?: Gua;

  @Field(type => Gua)
  text?: Gua;

}
