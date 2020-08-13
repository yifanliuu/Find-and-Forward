import { Context } from "koa";
import { getManager } from "typeorm";
import { Task } from "../entity/Task"; 
import { Contrib } from "../entity/Contrib";
import { User } from "../entity/User";

export async function RewardForwarding(context: Context) {
    //get message repository
    const ContribRepo = getManager().getRepository(Contrib);
    const UserRepo = getManager().getRepository(User);
	const TaskRepo = getManager().getRepository(Task);
    //get context content
    const { admin_id, task_id } = context.request.body;
    const admin = await UserRepo.findOne({ user_id: admin_id });
	const task = await TaskRepo.findOne({ id: task_id })
    context.body = { payload: "" };
    var money = 0;
    try {
        const contrib_list = await ContribRepo.find({ task_id: task_id });
        for (var j = 0; j < contrib_list.length; j++) {
            const contrib = contrib_list[j];
            const user_id = contrib.user_id;
            const user = await UserRepo.findOne({ user_id: user_id });
            await UserRepo.update(user, {
                balance: user.balance + contrib.reward,
            });
            money = money + contrib.reward;
            //await UserRepo.update(admin, {balance : admin.balance - contrib.reward});
        }
        await UserRepo.update(admin, { balance: admin.balance + task.subtask_num * task.subtask_num - money});
        context.body["payload"] = { success: true, message: "奖励发放成功" };
    } catch (error) {
        context.body = 404;
    }
}
