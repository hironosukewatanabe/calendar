<template>
  <div>
      <h2> WeeklyCalendar </h2>
      <div
        v-for="(day, index) in calendars"
        :key="index"
      >
       {{ day }}
      </div>
      <FullCalendar :options="calendarOptions" />
  </div>
</template>
<script>
import moment from 'moment'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar
  },
  data () {
    return {
      currentDate: moment(),
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth'
      }
    }
  },
  methods: {
    getStartDate () {
      let date = moment(this.currentDate)
      date.startOf('week')
      return date
    },
    getCalendar () {
      let startDate = this.getStartDate()
      const insertDate = startDate
      let calendars = []
      for (let day = 0; day < 7; day++) {
        calendars.push(
          insertDate.get('date')
        )
        insertDate.add(1, 'days')
      }
      return calendars
    }
  },
  computed: {
    calendars () {
      return this.getCalendar()
    }
  },
  mounted () {
    console.log(this)
  }
}

</script>
