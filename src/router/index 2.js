import Vue from 'vue'
import Router from 'vue-router'
// import { component } from 'vue/types/umd'

import Home from '../components/Home'
import NavigationBar from '../components/NavigationBar'
import Updata from '../components/Updata'
import Statistics from '../components/Statistics'
import Home_index from '../components/Home_index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/Home_index'
    },
    {   //初始主页
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {   //左侧导航栏
      path: '/NavigationBar',
      name: 'NavigationBar',
      component: NavigationBar
    },
    {  //一键上报
      path: '/Updata',
      name: 'Updata',
      component: Updata
    },
    { //数据模块统计
      path: '/Statistics',
      name: 'Statistics',
      component: Statistics
    },
    { //左侧导航栏部分首页
      path: '/Home_index',
      name: 'Home_index',
      component: Home_index
    },
    { //右侧第一个 极端天气等模块
      path: '/Right_info_01',
      name: 'Right_info_01',
      component: ()=>import('../components/Right_info_01')
    },
    { //右侧第二个  实时空气指数等模块
      path: '/Right_info_02',
      name: 'Right_info_02',
      component: ()=>import('../components/Right_info_02')
    },
    { //右侧第三个 数据下载接口等模块
      path: '/Data_download',
      name: 'Data_download',
      component: ()=>import('../components/Data_download')
    },
    { //首页中心的数据图
      path: '/Data_map',
      name: 'Data_map',
      component: ()=>import('../components/Data_map')
    },
    { //污染物扩散
      path: '/Pollution_forecast',
      name: 'Pollution_forecast',
      component: ()=>import('../components/Pollution_forecast')
    },
    { //区域小地图组件
      path: '/Small_map',
      name: 'Small_map',
      component: ()=>import('../components/Small_map')
    },//
    { //折线图
      path: '/Line_chart',
      name: 'Line_chart',
      component: ()=>import('../components/Line_chart')
    },
    { //等温页面
      path: '/Equal_tempe',
      name: 'Equal_tempe',
      component: ()=>import('../components/Equal_tempe')
    }, //
    { //污染程度
      path: '/Poll_degree',
      name: 'Poll_degree',
      component: ()=>import('../components/Poll_degree')
    }, 
    { //渔业气象服务
      path: '/Go_sea',
      name: 'Go_sea',
      component: ()=>import('../components/Go_sea')
    }, 
    { //历史大气统计
      path: '/History_air',
      name: 'History_air',
      component: ()=>import('../components/History_air')
    }, 
    { //设备管理
      path: '/Equipment',
      name: 'Equipment',
      component: ()=>import('../components/Equipment')
    }, 
    { //报警管理
      path: '/Alarm',
      name: 'Alarm',
      component: ()=>import('../components/Alarm')
    },
   { //报警统计
      path: '/Alarm_statistic',
      name: 'Alarm_statistic',
      component: ()=>import('../components/Alarm_statistic')
    }, 
    { //海洋区域管理
      path: '/Area_manage',
      name: 'Area_manager',
      component: ()=>import('../components/Area_manage')
    }, 
    { //用户管理
      path: '/Usr',
      name: 'Usr',
      component: ()=>import('../components/Usr')
    }, 
    { //操作日志
      path: '/Log',
      name: 'Log',
      component: ()=>import('../components/Log')
    },
    { //Map
      path: '/Map',
      name: 'Map',
      component: ()=>import('../components/Map')
    },
  ]
})


