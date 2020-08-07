import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn,Double} from "typeorm";
@Entity()
export class Friend{
	@PrimaryColumn()
	user_id_1:number;

	@PrimaryColumn()
	user_id_2:number;
}