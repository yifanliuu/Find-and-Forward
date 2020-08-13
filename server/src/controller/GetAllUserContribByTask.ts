import { Context } from "koa";
import { getManager } from "typeorm";
import { Movie } from "../entity/Movie";
import { User } from "../entity/User";
import { Contrib } from "../entity/Contrib";

export async function GetAllUserContribByTask(context: Context) {
    //get message repository
    const ContribRepo = getManager().getRepository(Contrib);
    const UserRepo = getManager().getRepository(User);
    //get context content
    const { task_id } = context.request.query;
    context.body = { payload: "" };
    try {
        const contrib_list = await ContribRepo.find({ task_id: task_id });
        var arrayList = new Array(contrib_list.length);
        for (var j = 0; j < contrib_list.length; j++) {
            const contrib = contrib_list[j];
            arrayList[j] = {};
            const user_id = contrib.user_id;
            const user = await UserRepo.findOne({ user_id: user_id });
            arrayList[j]["user_id"] = user.user_id;
            arrayList[j]["username"] = user.username;
            arrayList[j]["work_contrib"] = contrib.work_contrib;
            arrayList[j]["invite_contrib"] = contrib.invite_contrib;
            arrayList[j]["reward"] = contrib.reward;
            arrayList[j]["is_given_reward"] = contrib.is_given_reward;
        }
        context.body["payload"] = arrayList;
    } catch {
        context.status = 404;
    }
}
