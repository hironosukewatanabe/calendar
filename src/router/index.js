import Vue from 'vue'
import Router from 'vue-router'
import WeeklyCalendar from '@/components/WeeklyCalendar'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/',
      name: 'WeeklyCalendar',
      component: WeeklyCalendar
    }
  ]
})
