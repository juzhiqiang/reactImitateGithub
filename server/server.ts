const Koa = require("koa");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  server.use(async (ctx: any, next: any) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.listen(3000, () => {
    console.log("3000 start");
  });
});
