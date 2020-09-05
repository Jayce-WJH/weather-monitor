// import Vue from 'vue'
import router from '../router/index'
import store from '../store/index'

const whiteRouter_User = [  //用户访问白名单
    '/Home_index',
    '/updata',
    '/statistics',
    '/Pollution_forecast',
    '/Equal_tempe',
    '/Poll_degree',
    '/Go_sea',
    '/History_air'
  ];
  const whiteRouter_admin = [  //管理员访问白名单
    '/Home_index',
    '/updata',
    '/statistics',
    '/Pollution_forecast',
    '/Equal_tempe',
    '/Poll_degree',
    '/Go_sea',
    '/History_air',
    '/Alarm',
    '/Alarm_statistic',
    '/Equipment'
  ];
  const whiteRouter_Supadmin = [  //超级管理员访问白名单
      '/Home_index',
      '/updata',
      '/statistics',
      '/Pollution_forecast',
      '/Equal_tempe',
      '/Poll_degree',
      '/Go_sea',
      '/History_air',
      '/Alarm',
      '/Alarm_statistic',
      '/Equipment',
      '/Area_manage',
      '/Usr',
      '/Log'
    ];
//路由守卫
router.beforeEach((to,from,next)=>{  //to表示要去那个路由 ， from表示来自那个路由， next继续执行
    // console.log(to);
    // console.log(from);
    // next();
    console.log('222222');
    console.log('token:'+store.state.token);
    console.log('ADM:'+store.state.admin_stat);
    console.log('SUP:'+store.state.sadmin_stat);
    //1.判断token是否存在
    if(store.state.token != ''){//管理员
      //判断token是谁的 1.管理员 2.超级管理员
      if(store.state.admin_stat){  //判断管理员状态是否为真
        console.log('管理员');
          if(whiteRouter_admin.indexOf(to.path) !== -1){
            next()
          }
      }
      
      if(store.state.sadmin_stat){  //超级管理员
        console.log('超级管理员');
        //whiteRouter_Supadmin
        // console.log(whiteRouter_Supadmin.indexOf(to.path));
        if(whiteRouter_Supadmin.indexOf(to.path) !== -1){
            next();
        }
      }
    }else{ //游客
      // console.log("不存在token");
      console.log("游客");
      if(whiteRouter_User.indexOf(to.path) !== -1){  //存在
        next(); //to
      }else{  //如果去的界面不是Home_index
        next('/Home_index')
      }
  }


    
    
  })