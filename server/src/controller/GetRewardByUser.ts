import { Context } from "koa";
import { getManager } from "typeorm";
import { Task } from "../entity/Task";
import { Contrib } from "../entity/Contrib";

/*4 GET
GetRewardByUser
select contrib user_id
select task task_id
*/

export async function getRewardByUser(context: Context) {
    //const uid = (context as any).params.id;
    const { user_id } = context.request.query;
    const uid = user_id;
    const TaskRepo = getManager().getRepository(Task);
    const ContribRepo = getManager().getRepository(Contrib);
    const tasks = await ContribRepo.find({ where: { user_id: uid } });
    var tasklt = new Array(tasks.length);
    var ctask;
    for (var i = 0; i < tasks.length; i++) {
        ctask = tasks[i];
        const tid = ctask.task_id;
        tasklt[i] = {};
        const taskinfo = await TaskRepo.findOne({ id: tid });
        tasklt[i]["task_title"] = taskinfo.title;
        tasklt[i]["deadline"] = taskinfo.deadline.toISOString().substr(0, 10);
        /*tasklt[i]["work_contrib"]=ctask.work_contrib;
  	tasklt[i]["invite_contrib"]=ctask.invite_contrib;
  	tasklt[i]["total_contrib"]=ctask.total_contrib;*/
        tasklt[i]["reward"] = ctask.reward;
        tasklt[i]["is_given_reward"] = ctask.is_given_reward;
    }
    const tasklist = { list: tasklt };
    context.body = { payload: tasklist };
}
