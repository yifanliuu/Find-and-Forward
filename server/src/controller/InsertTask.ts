import { Context } from "koa";
import { getManager } from "typeorm";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { Movie } from "../entity/Movie";

export async function InsertTask(context: Context) {
    // get a repository
    const TaskRepo = getManager().getRepository(Task);
    const UserRepo = getManager().getRepository(User);
    const MovieRepo = getManager().getRepository(Movie);

    //get context content
    const {
        title,
        summary,
        photo_path,
        deadline,
        content,
        creator_id,
        subtask_num,
    } = context.request.body;

    const creator = await UserRepo.findOne({ user_id: creator_id });
    await UserRepo.update(creator, {
        balance: creator.balance - subtask_num * subtask_num,
    });

    let task = new Task();
    task.title = title;
    task.summary = summary;
    task.photo_path = photo_path;
    task.deadline = deadline;
    task.content = content;
    task.creator = creator_id;
    task.subtask_num = subtask_num;
    task.money = subtask_num * subtask_num;
    const newtask = await TaskRepo.save(task);

    for (let i = 0; i < subtask_num; i++) {
        let subtask = new Movie();
        subtask.task_id = newtask.id;
        subtask.content = `任务${newtask.id}的第${i + 1}个电影评论的内容`;
        await MovieRepo.save(subtask);
    }
    context.body = { payload: "" };
    context.body["payload"] = { success: true };
}
