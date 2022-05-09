import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Menu {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    text: string;

    @Column()
    path: string;

    @Column()
    component?: string;

    @Column()
    icon: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: 0 })
    parentId: number;

    @Column({ default: 0 })
    type: number;

    @Column({ default: 0 })
    sort: number;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}
