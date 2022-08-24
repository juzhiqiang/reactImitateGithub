import { Button } from "antd";
import getConfig from "next/config";

export default () => {
  const { publicRuntimeConfig } = getConfig();
  console.log(publicRuntimeConfig.OAUTH_URL);
  return (
    <>
      <Button>51215</Button>
      <a href={publicRuntimeConfig.OAUTH_URL}>登录</a>
    </>
  );
};
