import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn,Double} from "typeorm";
@Entity()
export class Message{
	@PrimaryGeneratedColumn()
	invite_id:number;

	@Column()
	invitor_id:number;

	@Column()
	invitee_id:number;

	@Column()
	task_id:number;

	@Column()
	result:number;
}