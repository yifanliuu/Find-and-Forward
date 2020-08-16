import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    subtask_id: number;

    @Column({
        default: -1,
        type: "int",
    })
    user_id: number;

    @Column({
        type: "text",
    })
    content: string;

    @Column({
        type: "int",
        default: -1,
    })
    result: number;

    @Column({
        type: "int",
    })
    task_id: number;
}
