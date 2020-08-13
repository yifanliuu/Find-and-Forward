import { Context } from "koa";
import { getManager } from "typeorm";
import { User } from "../entity/User";

/*5 GET
GetUserByUser
select user user_id*/

export async function getUserByUser(context: Context) {
    const UserRepo = getManager().getRepository(User);
    //const uid = (context as any).params.id;
    const { username, password } = context.request.query;
    //console.log(context.request.query);
    //console.log(username, password);
    var user = {};
    const userinfo = await UserRepo.findOne({
        username: username,
        password: password,
    });
    if (userinfo == undefined) {
        context.body = 404;
        return;
    }
    user["user_id"] = userinfo.user_id;
    user["address"] = userinfo.address;
    user["username"] = userinfo.username;
    user["balance"] = userinfo.balance;
    context.body = { payload: user };
}
