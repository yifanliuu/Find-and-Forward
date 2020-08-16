import { Context } from "koa";
import { getManager } from "typeorm";
import { Task } from "../entity/Task";

export async function getTaskByCreator(context: Context) {
    const { user_id } = context.request.query;
    const uid = user_id;

    const TaskRepo = getManager().getRepository(Task);
    const tasks = await TaskRepo.find({ where: { creator: uid } });

    var tasklist = new Array(tasks.length);
    for (var i = 0; i < tasks.length; i++) {
        tasklist[i] = {};
        const curtask = tasks[i];
        tasklist[i]["id"] = curtask.id;
        tasklist[i]["title"] = curtask.title;
        tasklist[i]["summary"] = curtask.summary;
        tasklist[i]["deadline"] = curtask.deadline.toISOString().substr(0, 10);
        tasklist[i]["photo_path"] = curtask.photo_path;
    }
    context.body = { payload: tasklist };
}
