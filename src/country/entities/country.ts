import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'country' })
@ObjectType()
export class Country {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  iso: string;

  @Column()
  @Field()
  emoji: string;

  @Column()
  @Field()
  unicode: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  zh: string;

  @Column()
  @Field()
  country: string;

  @Column()
  @Field()
  currency: string;

  @Column()
  @Field()
  currency_name: string;

  @Column()
  @Field()
  currency_code: string;

  // @Column()
  // @Field()
  // priority: number;

  // @Column()
  // @Field()
  // completed: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}