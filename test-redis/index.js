const Redis = require('ioredis');

// 连接redis
const redis = new Redis({
    prot: 6379
});

const test = async () => {
    // 查找所有数据
    const keys = await redis.keys('*');
    await redis.set('kdq', 123)
    console.log(keys);
}
test()