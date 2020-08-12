import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    Double,
} from "typeorm";
@Entity()
export class Movie {
    @PrimaryColumn()
    subtask_id: number;

    @Column()
    user_id: number;

    @Column()
    content: string;

    @Column()
    result: number;

    @Column()
    task_id: number;
}
