<template>
  <div>
    <textarea>{{ rehsapedSchedule }}</textarea>
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
        const startDate = new Date(schedule[i].start)
        let shapedSchedule = startDate.getMonth() + '/' + startDate.getDate() +
                               ' ' + startDate.getHours() + ':' +
                               startDate.getMinutes() +
                               '\n'
        shapedSchedules += shapedSchedule
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
