import axios from "axios";
const config = require("../config");
const { client_id, client_secrets, request_token_url } = config.github;

export const auth = (server: any) => {
  server.use(async (ctx: any, next: any) => {
    if (ctx.path === "/auth") {
      const code = ctx.query.code;
      if (!code) {
        ctx.body = "code not exist";
        return;
      }
      const result:any = await axios({
        method: "POST",
        url: request_token_url,
        data: {
          client_id,
          client_secret:client_secrets,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      });
      if(result.status === 200){
        ctx.session.githubAuth = result.data;
        ctx.redirect('/')
      }else{
        ctx.body = `request token failed ${result.message}`
      }
    } else {
      await next();
    }
  });
};
