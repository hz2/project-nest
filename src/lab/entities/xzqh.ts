import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'xzqh' })
@ObjectType()
export class Xzqh {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  code: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  cityCode: string;

  @Column()
  @Field()
  provinceCode: string;

  // @UpdateDateColumn()
  // @Field()
  // updatedAt: Date;
}