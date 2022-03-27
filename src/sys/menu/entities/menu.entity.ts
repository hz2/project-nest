import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
