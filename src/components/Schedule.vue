<template>
  <div>
    <textarea v-model="shapedSchedules" cols='100' rows='10'>
    </textarea>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  components: {
  },
  props: ['events'],
  watch: {
    events: {
      handler: function (val) {
        let schedule = JSON.parse(JSON.stringify(val))
        let shapedSchedules = ''

        schedule.sort(function (a, b) { return moment(a.start) - moment(b.start) })

        const shape = function (date) {
          return ('0' + date.hours()).slice(-2) +
                 ':' +
                 ('0' + date.minutes()).slice(-2)
        }
        for (var i = 0; i < schedule.length; i++) {
          if (schedule[i].start != null) {
            const startDate = moment(schedule[i].start)
            const date = startDate.month() + '/' + startDate.date()
            const dayOfWeek = '（' + [ '日', '月', '火', '水', '木', '金', '土' ][startDate.day()] + '）'
            const shapedStartDate = shape(startDate)
            const shapedEndDate = shape(moment(schedule[i].end))
            let shapedSchedule = date + dayOfWeek + shapedStartDate + ' 〜 ' + shapedEndDate + '\n'
            shapedSchedules += shapedSchedule
          }
        }
        this.shapedSchedules = shapedSchedules
      },
      deep: true
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
