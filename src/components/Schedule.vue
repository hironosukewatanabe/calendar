<template>
  <div>
    <textarea v-model="shapedSchedules" cols='100' rows='10'>
    </textarea>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: ['schedule_init'],
  computed: {
    rehsapedSchedule: function () {
      let schedule = this.schedule
      let shapedSchedules = ''

      const shape = function (date) {
        return ('0' + date.getHours()).slice(-2) +
               ':' +
               ('0' + date.getMinutes()).slice(-2)
      }
      for (var i = 0; i < schedule.length; i++) {
        if (schedule[i].start != null) {
          const startDate = new Date(schedule[i].start)
          const date = startDate.getMonth() + '/' + startDate.getDate()
          const dayOfWeek = '（' + [ '日', '月', '火', '水', '木', '金', '土' ][startDate.getDay()] + '）'
          const shapedStartDate = shape(startDate)
          const shapedEndDate = shape(new Date(schedule[i].end))
          let shapedSchedule = date + dayOfWeek + shapedStartDate + ' 〜 ' + shapedEndDate + '\n'
          shapedSchedules += shapedSchedule
        }
      }
      return shapedSchedules
    }
  },
  watch: {
    schedule: function (val) {
      let schedule = JSON.parse(JSON.stringify(val))
      let shapedSchedules = ''

      schedule.sort(function (a, b) { return new Date(a.start) - new Date(b.start) })

      const shape = function (date) {
        return ('0' + date.getHours()).slice(-2) +
               ':' +
               ('0' + date.getMinutes()).slice(-2)
      }
      for (var i = 0; i < schedule.length; i++) {
        if (schedule[i].start != null) {
          const startDate = new Date(schedule[i].start)
          const date = startDate.getMonth() + '/' + startDate.getDate()
          const dayOfWeek = '（' + [ '日', '月', '火', '水', '木', '金', '土' ][startDate.getDay()] + '）'
          const shapedStartDate = shape(startDate)
          const shapedEndDate = shape(new Date(schedule[i].end))
          let shapedSchedule = date + dayOfWeek + shapedStartDate + ' 〜 ' + shapedEndDate + '\n'
          shapedSchedules += shapedSchedule
        }
      }
      this.shapedSchedules = shapedSchedules
    }
  },
  data: function () {
    return {
      schedule: this.schedule_init,
      shapedSchedules: ''
    }
  },
  methods: {
  }
}

</script>
