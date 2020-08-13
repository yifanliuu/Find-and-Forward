import { Entity, Column, PrimaryColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryColumn()
    user_id: number;

    @Column()
    address: string;

    @Column()
    username: string;

    @Column()
    balance: number;

    @Column({
        default: "123456",
    })
    password: string;
}
