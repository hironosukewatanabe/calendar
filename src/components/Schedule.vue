<template>
  <div>
    <textarea cols="100" rows="10">{{ rehsapedSchedule }}</textarea>
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
      for (var i = 0; i < schedule.length; i++) {
        if (schedule[i].start != null) {
          const startDate = new Date(schedule[i].start)
          const shapedStartDate = startDate.getMonth() + '/' + startDate.getDate() +
                                  ' ' + startDate.getHours() + ':' +
                                  startDate.getMinutes()
          const endDate = new Date(schedule[i].end)
          const shapedEndDate = endDate.getMonth() + '/' + endDate.getDate() +
                                  ' ' + endDate.getHours() + ':' +
                                  endDate.getMinutes()
          let shapedSchedule = shapedStartDate + ' 〜 ' + shapedEndDate + '\n'
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
