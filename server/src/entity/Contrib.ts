import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn,Double} from "typeorm";
@Entity()
export class Contrib{
	@PrimaryColumn()
	task_id:number;

	@PrimaryColumn()
	user_id:number;

	@Column()
	invitor_id:number;

	@Column()
	work_contrib:number;

	@Column()
	invite_contrib: number;

	@Column()
	total_contrib: number;

	@Column()
	reward: number;
}