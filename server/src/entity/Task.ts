import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    summary: string;

    @Column()
    photo_path: string;

    @Column({
        type: "datetime",
    })
    deadline: Date;

    @Column()
    content: string;

    @Column()
    creator: number;

    @Column()
    subtask_num: number;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    submit_time: Date;

    @Column({
        type: "int",
    })
    money: number;
}
