import * as Router from "koa-router";
import {getTaskByUser} from "../controller/GetTaskByUser"
import {getTaskByTask} from "../controller/GetTaskByTask"
import {getContribByUser} from "../controller/GetContribByUser"
import {getRewardByUser} from "../controller/GetRewardByUser"
import {getUserByUser} from "../controller/GetUserByUser"
import {getMessageByUser} from "../controller/GetMessageByUser"
import {UpdateMessage} from "../controller/UpdateMessage"
import {GetFriendByUser} from "../controller/GetFriendByUser"
import {InsertMessage} from "../controller/InsertMessage"
import {GetMovieByMovie} from "../controller/GetMovieByMovie"
import {GetAllUserContribByTask} from "../controller/GetAllUserContribByTask"
import {RewardForwarding} from "../controller/RewardForwarding"
import {UpdateMovie} from "../controller/UpdateMovie"

const TodoListRouter = new Router();


TodoListRouter["get"]("/task", getTaskByUser);
TodoListRouter["get"]("/task/detail/:id", getTaskByTask);
TodoListRouter["get"]("/contrib",getContribByUser);
TodoListRouter["get"]("/reward", getRewardByUser);
TodoListRouter["get"]("/user/info",getUserByUser);
TodoListRouter["get"]("/message",getMessageByUser);
TodoListRouter["patch"]("/message",UpdateMessage);
TodoListRouter["get"]("/friends",GetFriendByUser);
TodoListRouter["post"]("/invite",InsertMessage);
TodoListRouter["get"]("/task/content",GetMovieByMovie);
TodoListRouter["get"]("/task/admin/contrib",GetAllUserContribByTask);
TodoListRouter["post"]("/task/admin/reward",RewardForwarding);
TodoListRouter["patch"]("/task/content",UpdateMovie);

export default TodoListRouter