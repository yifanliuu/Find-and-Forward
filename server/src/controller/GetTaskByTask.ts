import { Context } from "koa";
import { getManager } from "typeorm";
import { Task } from "../entity/Task";
import { User } from "../entity/User";

/*
2 GET
GetTaskByTask
select task task_id
*/
export async function getTaskByTask(context: Context) {
    // get a repository
    const TaskRepo = getManager().getRepository(Task);
    const UserRepo = getManager().getRepository(User);

    const taskid = (context as any).params.id;

    const task = await TaskRepo.find({ id: taskid });
    const user = await UserRepo.findOne({ user_id: task[0]["creator"] });

    // load all todos
    //const todos = await todoRepo.find();
    // return all todos

    var taskinfo = {};
    taskinfo["id"] = task[0]["id"];
    taskinfo["title"] = task[0]["title"];
    taskinfo["summary"] = task[0]["summary"];
    taskinfo["photo_path"] = task[0]["photo_path"];
    taskinfo["deadline"] = task[0]["deadline"];
    taskinfo["content"] = task[0]["content"];

    taskinfo["creator"] = user.username;

    const taskinfo2 = { task: taskinfo };
    context.body = { payload: taskinfo2 };
}
