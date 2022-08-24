const getRedisSessionId = (sid: string) => {
  return `ssid:${sid}`;
};

export function RedisSessionStore(clients: any) {
  const client = clients;
  // 获取redis中数据
  const get = async (sid: string) => {
    const id = getRedisSessionId(sid);
    const data = await client.get(id);

    if (!data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const set = async (sid: string, sess: object, ttl: number) => {
    const id = getRedisSessionId(sid);
    if (typeof ttl === "number") {
      ttl = Math.ceil(ttl / 1000);
    }

    try {
      const sessionStr = JSON.stringify(sess);
      if (ttl) {
        await client.setex(id, ttl, sessionStr);
      } else {
        await client.set(id, sessionStr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const destroy = async (sid: string) => {
    const id = getRedisSessionId(sid);
    await client.del(id);
  };

  return { get, set, destroy };
}
