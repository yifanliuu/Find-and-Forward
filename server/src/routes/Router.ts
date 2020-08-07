import * as Router from "koa-router";
import { getTaskByUser } from "../controller/GetTaskByUser";
import { getTaskByTask } from "../controller/GetTaskByTask";
import { getContribByUser } from "../controller/GetContribByUser";
import { getRewardByUser } from "../controller/GetRewardByUser";
import { getUserByUser } from "../controller/GetUserByUser";
import { getMessageByUser } from "../controller/GetMessageByUser";
import { UpdateMessage } from "../controller/UpdateMessage";
import { GetFriendByUser } from "../controller/GetFriendByUser";
import { InsertMessage } from "../controller/InsertMessage";
import { GetMovieByMovie } from "../controller/GetMovieByMovie";
import { GetAllUserContribByTask } from "../controller/GetAllUserContribByTask";
import { RewardForwarding } from "../controller/RewardForwarding";
import { UpdateMovie } from "../controller/UpdateMovie";

const NewRouter = new Router();

NewRouter["get"]("/task", getTaskByUser);
NewRouter["get"]("/task/detail/:id", getTaskByTask);
NewRouter["get"]("/contrib", getContribByUser);
NewRouter["get"]("/reward", getRewardByUser);
NewRouter["get"]("/user/info", getUserByUser);
NewRouter["get"]("/message", getMessageByUser);
NewRouter["patch"]("/message", UpdateMessage);
NewRouter["get"]("/friends", GetFriendByUser);
NewRouter["post"]("/invite", InsertMessage);
NewRouter["get"]("/task/content", GetMovieByMovie);
NewRouter["get"]("/task/admin/contrib", GetAllUserContribByTask);
NewRouter["post"]("/task/admin/reward", RewardForwarding);
NewRouter["patch"]("/task/content", UpdateMovie);

export default NewRouter;
