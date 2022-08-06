# 关于Redis的使用的文档

## 1.安装Redis

> 因为redis的安装情况网上示例已经非常多了，我直接贴出来网址，对照着做，一般情况下都是可以安装成功的
> [WINDOWS安装地址点我](https://blog.csdn.net/qq_41521682/article/details/122788722)
>[LINUX安装地址点我](https://blog.csdn.net/m0_67265654/article/details/123653172)

## 2.Redis的密码设置

> redis是一个缓存中间件，链接时候需要host,port,password，如何更改redis的密码，网上也很多教程了，我直接贴一个地址好了，无论是windows还是linux，配置文件修改redis的密码都是一样的，只不过redis.conf文件地址不一样
> [更改redis的密码点我](https://blog.csdn.net/weixin_33550394/article/details/119556868)

## 3.本项目中使用方式

##### 3.1 redis的配置文件
>在server/config/application.js里
大致结构为：

```
redis: {
	//redis的服务地址
    host: "127.0.0.1",
    //redis的端口，默认为6379
    port: 6379,
    options: {
      //redis的密码，如果你本地的redis没有密码的话，直接给密码注释掉
      // password: "myredispassword",
      //链接redis的超时时间
      timeout: 3000
    }
  },
```

##### 3.2 redis的使用

>在需要使用redis的文件中引入redis的工具类

```
const redis = require('@/util/redis.js')
```

1.新增key-value的缓存调用set方法，过期时间为-1 永不过期

```
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
```



2. 新增带过期时间点key-value的缓存，调用setDll方法，参数time为过期时间，单位为秒

```
/**
 * 设置值的时候添加过期时间  时间单位为秒
 *  @param key
 *  @param value
 *  @param time
 *  @returns 
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
```
3. 获取，从redis根据key获取值，调用get方法

```
/**
 1. 取值
 2. @param key
 3. @returns {Promise<any>}
 */
redisCache.get = async function(key){
    let data = await client.get(key);
  return JSON.parse(data)['data'];
};
```
4. 设置某个key的过期时间，调用expire方法，参数time为重新设置的过期时间，单位为秒

```
/**
 1. 设置某个key的过期时间  time单位为秒
 2. @param key
 3. @param time
 4. @returns 
 */
redisCache.expire = async function(key, time) {
    let result = await client.expire(key, time)
    if(result){
      return 1;
    }
    return 0;
};
```
5. 删除某个key-value，调用delKey方法

```
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
```



