const redis = require("redis");
const application = require("../config/application.js");

let config = application.redis;

const client = redis.createClient(config.port, config.host, config.options);

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

// 监听错误信息
client.on('error', err => {
  console.error(err) // 打印监听到的错误信息
})
function redisCache() {}


/**
 * 设置值
 * @param key
 * @param value
 */
redisCache.set = function(key, value) {
  var data = {};
  data['data'] = value;
  let result =  client.set(key, JSON.stringify(data));
  if(result == 'OK'){
    return 1;
  }else {
    return 0;
  }
};

/**
 * 设置值的时候添加过期时间  时间单位为秒
 * @param key
 * @param value
 * @param time
 * @returns {Promise<ConvertArgumentType<RedisCommandReply<{transformArguments(key: RedisCommandArgument, value: (RedisCommandArgument | number), options?: SetOptions): RedisCommandArguments, FIRST_KEY_INDEX: number, transformReply(): (RedisCommandArgument | null)}>, CommandOptions<ClientCommandOptions>["returnBuffers"] extends true ? Buffer : string>>}
 */
redisCache.setDll = function(key, value,time) {
  var data = {};
  data['data'] = value;
  let result =  client.set(key, JSON.stringify(data), {
    EX: time,
    NX: true
  });
  if(result == 'OK'){
    return 1;
  }else {
    return 0;
  }
};

/**
 * 取值
 * @param key
 * @returns {Promise<any>}
 */
redisCache.get = async function(key){
    let data = await client.get(key);
  return JSON.parse(data)['data'];
};


/**
 * 设置某个key的过期时间  time单位为秒
 * @param key
 * @param time
 * @returns {Promise<ConvertArgumentType<RedisCommandReply<{transformReply: (reply: number) => boolean, FIRST_KEY_INDEX: number, transformArguments(key: RedisCommandArgument, seconds: number, mode?: ("NX" | "XX" | "GT" | "LT")): RedisCommandArguments}>, CommandOptions<ClientCommandOptions>["returnBuffers"] extends true ? Buffer : string>>}
 */
redisCache.expire = async function(key, time) {
    let result = await client.expire(key, time)
    if(result){
      return 1;
    }
    return 0;
};

/**
 * 删除redis的 key
 * @param key String类型  只能为String类型
 * @returns {Promise<number>}
 */
redisCache.delKey = async function(key){
  let result = await client.del(key+"");
  if(result){
    return 1;
  }
  return 0;
}

module.exports = redisCache;
