import {Context} from "koa";
import {getManager} from "typeorm";
import {Message} from "../entity/Message";

export async function InsertMessage(context : Context) {
    // get a repository
    const MessageRepo = getManager().getRepository(Message);
    //get context content
    const {user_id,  friend_id, task_id} = context.request.body;
    let message = new Message();
    message.invitor_id = user_id;
    message.invitee_id = friend_id;
    message.task_id = task_id;
    message.result = 0;
    try {
        await MessageRepo.save(message);
        context.body = {"payload" : ""};
        context.body["payload"] = {"success" : true};
    } catch {
        context.status = 404;
    }  
}