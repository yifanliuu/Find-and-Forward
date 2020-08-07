import {Context} from "koa";
import {getManager} from "typeorm";
import {Message} from "../entity/Message";
import {Contrib} from "../entity/Contrib";

export async function UpdateMessage(context: Context) {
    //get repository
    const MessageRepo = getManager().getRepository(Message);
    const ContribRepo = getManager().getRepository(Contrib);
    //get context content
    const {invite_id,  result} = context.request.body;
    //find message
    const message_update = await MessageRepo.findOne({invite_id : invite_id});
    context.body = {"payload" : ""};
    try {
        //update message
        await MessageRepo.update(message_update, {result : result});
        if (result == 1) {
            //insert contrib
            let contrib = new Contrib();
            contrib.task_id = message_update.task_id;
            contrib.user_id = message_update.invitee_id;
            contrib.invitor_id = message_update.invitor_id;
            contrib.work_contrib = contrib.invite_contrib = contrib.total_contrib = contrib.reward = 0;
            await ContribRepo.save(contrib);
        }
        context.body["payload"] = {"success": true, "message": '处理成功'};
    } catch (error) {
        context.status = 404;
    }
}