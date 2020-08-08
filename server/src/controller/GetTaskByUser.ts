import { Context } from "koa";
import { getManager } from "typeorm";
import { Task } from "../entity/Task";
import { Contrib } from "../entity/Contrib";

export async function getTaskByUser(context: Context) {
    // get a repository
    //const todoRepo = getManager().getRepository(TodoList);
    const TaskRepo = getManager().getRepository(Task);
    //const uid = (context as any).params.id;
    const { user_id } = context.request.query;
    const uid = user_id;
    //let's say admin id is 9
    if (uid == 9) {
        const tasks = await TaskRepo.find();
        const tasklist = { task_list: tasks };
        context.body = { payload: tasklist };
        return;
    }
    const ContribRepo = getManager().getRepository(Contrib);
    const tasks = await ContribRepo.find({ where: { user_id: uid } });
    /*const tasks=await ContribRepo.createQueryBuilder()
  					.select("contrib")
  					.from(Contrib,"contrib")
  					.where("contrib.user_id =:id",{id:(context as any).params.id})
  					.getmany();*/
    // load all todos
    //const todos = await todoRepo.find();
    // return all todos

    //let j: number =0;
    //let tasklist : any[];
    var ctask: any;
    var tasklist = new Array(tasks.length);
    for (var i = 0; i < tasks.length; i++) {
        ctask = tasks[i];
        tasklist[i] = {};
        const curtaskid = ctask.task_id;
        const curtask = await TaskRepo.findOne({ id: curtaskid });
        tasklist[i]["id"] = curtask.id;
        tasklist[i]["title"] = curtask.title;
        tasklist[i]["summary"] = curtask.summary;
        tasklist[i]["deadline"] = curtask.deadline;
        tasklist[i]["photo_path"] = curtask.photo_path;
    }
    context.body = { payload: tasklist };

    //const tasklist = {"task_list":tasks};
}
