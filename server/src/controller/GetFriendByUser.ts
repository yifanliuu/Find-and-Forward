import {Context} from "koa";
import {getManager} from "typeorm";
import {User} from "../entity/User";
import {Friend} from "../entity/Friend";
import {Contrib} from "../entity/Contrib";

export async function GetFriendByUser(context: Context) {
    //get repository
    const FriendRepo = getManager().getRepository(Friend);
    const ContribRepo = getManager().getRepository(Contrib);
    const UserRepo = getManager().getRepository(User);
    //get context content
    //const {user_id, task_id} = context.request.body;
    const {user_id, task_id} = context.request.query;
    //get friend_list
    const friend_list = await FriendRepo.find({user_id_1 : user_id});
    context.body = {"payload" : ""};
    //let arrayList: any[];
    //construct the context by loop
    var arrayList = new Array(friend_list.length);
    for (var j=0;j<friend_list.length;j++) {
        arrayList[j] = {};
        const friend = friend_list[j];
        arrayList[j]["id"] = friend.user_id_2;
        const user_id = friend.user_id_2;
        const user = await UserRepo.findOne({user_id : friend.user_id_2});
        arrayList[j]["name"] = user.username;
        const contrib = await ContribRepo.findOne({task_id : task_id, user_id : friend.user_id_2});

        if (contrib != null)
            arrayList[j]["status"] = 0;
        else
            arrayList[j]["status"] = 1;
    }
    context.body["payload"] = arrayList;
}