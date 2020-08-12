import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    Double,
} from "typeorm";
@Entity()
export class Task {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    summary: string;

    @Column()
    photo_path: string;

    @Column()
    deadline: string;

    @Column()
    content: string;

    @Column()
    creator: number;

    @Column()
    subtask_num: number;
}
