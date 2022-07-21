//admin不需要登录也可以请求的请求路由白名单
const adminWihteRoute = ['/4zxc1we6r/adminLogin']

export default ({ app ,store }) => {
  app.router.beforeEach((to, from, next) => {
    //获取到跳转地址
    let path = to.path;
    if(path.startsWith('/4zxc1we6r')){
      if(adminWihteRoute.indexOf(path) >= 0){
        next();
        return;
      }
      //是后台管理员的页面
      let info = localStorage.getItem("USERINFO");
      //这里有一个坑，如果没有获取到用户信息，返回一个null字符串
      let userInfo  = eval ("(" + info + ")");
      //TODO  应该从后台获取一下用户信息保证前后台都不过期 才允许登录才对
      if(!userInfo){
        next({path:'/4zxc1we6r/adminLogin'});
        return;
      }else{
        next();
      }
    }else{
      //TODO  目前前端用户请求地址
      next();
    }
  })

  app.router.afterEach((to, from) => {

  })
}
