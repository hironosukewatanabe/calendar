import Vue from 'vue'
import Router from 'vue-router'
import MonthlyCalendar from '@/components/MonthlyCalendar'
import WeeklyCalendar from '@/components/WeeklyCalendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/monthly',
      name: 'MonthlyCalendar',
      component: MonthlyCalendar
    },
    {
      path: '/',
      name: 'WeeklyCalendar',
      component: WeeklyCalendar
    }
  ]
})
