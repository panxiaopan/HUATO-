import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App'
import Home from '@/Pages/Home'
import Login from'@/Pages/Login'
import EquipmentManagement from '@/Pages/EquipmentManagement'
import Information from '@/Pages/Information'
import Operation from '@/Pages/Operation'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path:'/',
      redirect:'/Login',//访问时候,使用重定向redirect,默认跳转到首页,
      component:Login
    },
    {
      path: '/',
      name: 'App',
      component: App,
      children: [
        { path: 'Home', name: 'Home', component: Home },
        { path: 'EquipmentManagement', name: 'EquipmentManagement', component: EquipmentManagement }, 
        { path: 'Information', name: 'Information', component: Information },
        { path: 'Operation', name: 'Operation', component: Operation }
      ]
    }
  ]
})
