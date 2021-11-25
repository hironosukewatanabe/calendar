<template>
  <div>
      <h2> WeeklyCalendar </h2>
      <div
        v-for="(day, index) in calendars"
        :key="index"
      >
       {{ day }}
      </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      currentDate: moment()
    }
  },
  methods: {
    getStartDate () {
      let date = moment(this.currentDate)
      date.startOf('month')
      return date
    },
    getCalendar () {
      let startDate = this.getStartDate()
      const insertDate = startDate
      let calendars = []
      for (let day = 0; day < 7; day++) {
        calendars.push({
          date: insertDate.get('date')
        })
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
