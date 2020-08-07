import {Context} from "koa";
import {getManager} from "typeorm";
import {Task} from "../entity/Task";
import {Message} from "../entity/Message"
import {User} from "../entity/User";
/*6 GET
GetMessageByUser
select message user_id
select task task_id*/
export async function getMessageByUser(context: Context){
  const {user_id}=context.request.query;
	const uid = user_id;
  const TaskRepo = getManager().getRepository(Task);
  const MessageRepo = getManager().getRepository(Message);
  const UserRepo = getManager().getRepository(User);
  const messages=await MessageRepo.find({invitee_id:uid});
  var messagelt= new Array(messages.length);
  var message;
  for(var i=0;i<messages.length;i++){
  	message=messages[i];
  	messagelt[i]={};
  	const taskinfo=await TaskRepo.findOne({id:message.task_id});
  	const tasktitle=taskinfo.title;
  	const userinfo=await UserRepo.findOne({user_id:message.invitor_id});
  	const invitor_name=userinfo.username;
  	messagelt[i]["invite_id"]=message.invite_id;
  	messagelt[i]["invitor_id"]=message.invitor_id;
  	messagelt[i]["invitor_name"]=invitor_name;
  	messagelt[i]["task_id"]=message.task_id;
  	messagelt[i]["task_title"]=tasktitle;
  	messagelt[i]["result"]=message.result;
  }
  const invite_list = {"invite_list":messagelt};
  context.body= {"payload":invite_list};

}