import { Context } from "koa";
import { getManager } from "typeorm";
import { Message } from "../entity/Message";
import { Contrib } from "../entity/Contrib";
import { Movie } from "../entity/Movie";

export async function UpdateMovie(context: Context) {
    //get message repository
    const MovieRepo = getManager().getRepository(Movie);
    const MessageRepo = getManager().getRepository(Message);
    const ContribRepo = getManager().getRepository(Contrib);

    //get context content
    const { subtask_list } = context.request.body;
    for (var i = 0; i < subtask_list.length; i++) {
        const subtask = subtask_list[i];
        const subtask_id = subtask["subtask_id"];
        const task_id = subtask["task_id"];
        const user_id = subtask["user_id"];
        const result = subtask["result"];
        //update movie
        const Movie = await MovieRepo.findOne({ subtask_id: subtask_id });
        await MovieRepo.update(Movie, { user_id: user_id, result: result });

        const Contrib_user = await ContribRepo.findOne({
            task_id: task_id,
            user_id: user_id,
        });

        //find invitor
        const Message = await MessageRepo.findOne({
            task_id: task_id,
            invitee_id: user_id,
            result: 1,
        });
        if (Message != null && Message.invitor_id != 9) {
            const Contrib_invitor = await ContribRepo.findOne({
                task_id: task_id,
                user_id: Message.invitor_id,
            });

            var min_before_contrib: any;
            if (Contrib_user.work_contrib < Contrib_invitor.work_contrib)
                min_before_contrib = Contrib_user.work_contrib;
            else min_before_contrib = Contrib_invitor.work_contrib;

            var min_now_contrib: any;
            if (Contrib_user.work_contrib + 1 < Contrib_invitor.work_contrib)
                min_now_contrib = Contrib_user.work_contrib + 1;
            else min_now_contrib = Contrib_invitor.work_contrib;

            Contrib_invitor.invite_contrib =
                Contrib_invitor.invite_contrib -
                min_before_contrib +
                min_now_contrib;
            Contrib_invitor.total_contrib =
                Contrib_invitor.work_contrib + Contrib_invitor.invite_contrib;
            Contrib_invitor.reward =
                Contrib_invitor.work_contrib * Contrib_invitor.work_contrib +
                Contrib_invitor.invite_contrib;
            await ContribRepo.save(Contrib_invitor);
        }
        //find invitee
        var invitor_change = 0;
        const Message_list = await MessageRepo.find({
            task_id: task_id,
            invitor_id: user_id,
            result: 1,
        });
        for (var j = 0; j < Message_list.length; j++) {
            const one_message = Message_list[j];
            const Contrib_invitee = await ContribRepo.findOne({
                task_id: task_id,
                user_id: one_message.invitee_id,
            });
            //update user invite_contrib
            var min_before_contrib: any;
            if (Contrib_user.work_contrib < Contrib_invitee.work_contrib)
                min_before_contrib = Contrib_user.work_contrib;
            else min_before_contrib = Contrib_invitee.work_contrib;

            var min_now_contrib: any;
            if (Contrib_user.work_contrib + 1 < Contrib_invitee.work_contrib)
                min_now_contrib = Contrib_user.work_contrib + 1;
            else min_now_contrib = Contrib_invitee.work_contrib;
            invitor_change =
                invitor_change - min_before_contrib + min_now_contrib;
        }

        Contrib_user.work_contrib = Contrib_user.work_contrib + 1;
        Contrib_user.invite_contrib =
            Contrib_user.invite_contrib + invitor_change;
        Contrib_user.total_contrib =
            Contrib_user.work_contrib + Contrib_user.invite_contrib;
        Contrib_user.reward =
            Contrib_user.work_contrib * Contrib_user.work_contrib +
            Contrib_user.invite_contrib;
        ContribRepo.save(Contrib_user);
    }
    context.body = { payload: { success: true } };
}
