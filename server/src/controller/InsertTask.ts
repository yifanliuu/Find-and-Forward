import {Context} from "koa";
import {getManager} from "typeorm";
import {Task} from "../entity/Task";
import {User} from "../entity/User";

export async function InsertTask(context : Context) {
    // get a repository
    const TaskRepo = getManager().getRepository(Task);
    //get context content
    const {id, title, summary, photo_path, deadline, content, creator, subtask_num} = context.request.body;
    let task = new Task();
	task.id = id;
	task.title = title;
	task.summary = summary;
	task.photo_path = photo_path;
	task.deadline = task.deadline;
	task.content = content;
	task.creator = creator;
	task.subtask_num = subtask_num;
    await TaskRepo.save(task);
	const creator = await UserRepo.findOne({user_id : creator);
	await UserRepo.update(creator, {balance : creator.balance - subtask_num * subtask_num});
    context.body = {"payload" : ""};
    context.body["payload"] = {"success" : true};
}