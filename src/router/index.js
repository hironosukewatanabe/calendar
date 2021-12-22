import Vue from 'vue'
import Router from 'vue-router'
import WeeklyCalendar from '@/components/WeeklyCalendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WeeklyCalendar',
      component: WeeklyCalendar
    }
  ]
})
