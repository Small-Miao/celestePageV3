import Vue from 'vue'
//admin不需要登录也可以请求的请求路由白名单
const adminWihteRoute = ['/4zxc1we6r/adminLogin']
// 与admin不同的是 玩家是需要登录的路由 放到这里
const playerNeedLoginRoute = ['/player/_id']


/**
 * vue  路由守卫，
 * @param app
 * @param store
 */
export default ({ app ,store }) => {
  app.router.beforeEach(async function (to, from, next){
    //获取到跳转地址
    let path = to.path;
    if(path.startsWith('/4zxc1we6r')){
      //是后台管理员的页面
      if(adminWihteRoute.indexOf(path) >= 0){
        //当前路由在admin的白名单里就不需要登录就可以访问
        next();
        return;
      }
      let info = localStorage.getItem("USERINFO");
      //这里有一个坑，如果没有获取到用户信息，返回一个null字符串
      let userInfo  = undefined;
      try{
        userInfo = eval ("(" + info + ")")
      }catch (e){

      }
      if(!userInfo){
        //从后台获取一下用户信息保证前后台都不过期 才允许登录
        let res = await getAdminLoginState();
        if(res == 1){
          next();
        }else{
          next({path:'/4zxc1we6r/adminLogin'});
          return;
        }
      }else{
        next();
      }
    }else{
      if(playerNeedLoginRoute.indexOf(path) >= 0){
        let info = localStorage.getItem("PLAYER_USERINFO");
        //这里有一个坑，如果没有获取到用户信息，返回一个null字符串
        let userInfo  = undefined;
        try{
          userInfo = eval ("(" + info + ")")
        }catch (e){

        }
        if(!userInfo){
          //从后台获取一下用户信息保证前后台都不过期 才允许登录
          let res = await getPlayerLoginState();
          if(res == 1){
            next();
          }else{
            next({path:'/'});
            Vue.prototype.$ElementUi.Message.error('该功能需要登录')
            return;
          }
        }else{
          next({path:'/'});
          Vue.prototype.$ElementUi.Message.error('该功能需要登录')
          return;
        }
      }else{
        next();
      }
    }
  })

  app.router.afterEach((to, from) => {

  })
}

/**
 * 获取admin当前登录状态
 * @returns {Promise<number>}
 */
async function getAdminLoginState(){
  let res = await Vue.prototype.$http({
    method: 'post',
    url: '/api/admin/getLoginUser'
  })
  if(res.data.code == 200){
    return 1;
  }
  return 0;
}


/**
 * 获取玩家的当前登录状态
 * @returns {Promise<number>}
 */
async function getPlayerLoginState(){
  let res = await Vue.prototype.$http({
    method: 'post',
    url: '/api/player/getPlayer'
  })
  if(res.data.code == 200){
    return 1;
  }
  return 0;
}

