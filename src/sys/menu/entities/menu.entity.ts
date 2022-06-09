import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Tree, TreeParent, TreeChildren } from 'typeorm';

@Entity({ name: 'menu' })
@Tree("nested-set")
export class Menu {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    text: string;

    @Column({ default: '' })
    path: string;

    @Column({ default: '' })
    component?: string;

    @Column({ default: '' })
    icon: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: 0 })
    type: number;

    @Column({ default: 0 })
    sort: number;

    @TreeParent()
    parent: Menu

    @TreeChildren()
    children: Menu[]

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}