import { Context } from "koa";
import { getManager } from "typeorm";
import { Movie } from "../entity/Movie";

export async function GetMovieByMovie(context: Context) {
    //get a repository
    const MovieRepo = getManager().getRepository(Movie);
    //get context content
    const { subtask_num } = context.request.query;
    const unjudged_movie = await MovieRepo.find({ user_id: -1 });
    //find the unjudge_movie
    context.body = { payload: "" };

    var arrayList = new Array(subtask_num);
    for (var j = 0; j < subtask_num; j++) {
        const movie = unjudged_movie[j];
        arrayList[j] = {};
        arrayList[j]["subtask_id"] = movie.subtask_id;
        arrayList[j]["content"] = movie.content;
    }
    context.body["payload"] = arrayList;
}
