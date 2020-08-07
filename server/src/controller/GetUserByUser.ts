import {Context} from "koa";
import {getManager} from "typeorm";
import {User} from "../entity/User";

/*5 GET
GetUserByUser
select user user_id*/

export async function getUserByUser(context: Context){
	const UserRepo = getManager().getRepository(User);
	//const uid = (context as any).params.id;
	const {user_id}=context.request.query;
	const uid=user_id;
	var user={};
	const userinfo=await UserRepo.findOne({user_id:uid});
	user["address"]=userinfo.address;
	user["username"]=userinfo.username;
	user["balance"]=userinfo.balance;
  	context.body= {"payload":user};
}