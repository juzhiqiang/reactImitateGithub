const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");
import { auth } from "./auth";
// import { RedisSessionStore } from "./session-store";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get("/a/:id", async (ctx: any) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id },
    });
    ctx.respond = false;
  });
  
  server.keys = ['secret'];
  server.use(
    session(
      {
        key: "koa:sess",
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
      },
      server
    )
  );
  server.use(router.routes());
  auth(server);

  server.use(async (ctx: any, next: any) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.listen(3000, () => {
    console.log("3001 start");
  });
});

export default () => {};
