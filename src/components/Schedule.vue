<template>
  <div>
    <textarea cols='100' rows='10'>{{ rehsapedSchedule }}</textarea>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    schedule: Object,
    default: () => {}
  },
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
  data () {
    return {
    }
  },
  methods: {
  }
}

</script>
