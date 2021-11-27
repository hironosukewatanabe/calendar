<template>
  <div>
      <h2> WeeklyCalendar </h2>
      <FullCalendar :options="calendarOptions" />
  </div>
</template>
<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  components: {
    FullCalendar
  },
  data () {
    return {
      calendarOptions: {
        plugins: [ timeGridPlugin, interactionPlugin ],
        initialView: 'timeGridWeek',
        selectable: true,
        selectMirror: true,
        unselectAuto: false,
        select: this.handleDateSelect,
        events: []
      },
      events: []
    }
  },
  methods: {
    handleDateSelect: function (arg) {
      console.log('events: ' + this.events)
      this.events.push({
        start: arg.startStr,
        end: arg.endStr,
        allDay: false
      })
      this.calendarOptions.events = this.events
      console.log('select: ' + arg.startStr + arg.endStr)
    }
  }
}

</script>
