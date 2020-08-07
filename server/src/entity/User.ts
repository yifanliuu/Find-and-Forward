import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn,Double} from "typeorm";
@Entity()
export class User{
	@PrimaryColumn()
	user_id:number;

	@Column()
	address:string;

	@Column()
	username:string;

	@Column()
	balance:number;
}