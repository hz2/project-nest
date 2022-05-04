import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    mobile: string;

    @Column()
    sex: string;

    @Column()
    birthday: Date;

    @Column()
    address: Date;
}
