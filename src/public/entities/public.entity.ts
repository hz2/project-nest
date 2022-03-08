import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Public {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    content: string;

    @Column({ default: ''})
    author: string;

    @Column({ default: ''})
    platform: string;

    @Column({ default: ''})
    email: string;

    @Column({ default: ''})
    useragent: string;

    @Column({ default: ''})
    ip: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
