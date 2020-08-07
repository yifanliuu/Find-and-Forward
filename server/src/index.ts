import "reflect-metadata";
import { createConnection } from "typeorm";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import NewRouter from "./routes/Router";

createConnection()
    .then(async (connection) => {
        // create koa app
        const server = new Koa();

        // run app
        server.use(bodyParser());
        server.use(NewRouter.routes());
        server.use(NewRouter.allowedMethods());

        server.listen(3000, () => {
            console.log("Api is listening on port 3000.");
        });
    })
    .catch((error) => console.log(error));
