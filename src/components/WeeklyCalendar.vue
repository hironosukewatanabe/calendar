<template>
  <div>
      <FullCalendar id="calendar" ref="fullCalendar" :options="calendarOptions" />
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
        selectMirror: false,
        unselectAuto: false,
        editable: true,
        eventOverlap: false,
        select: this.handleDateSelect,
        dateClick: this.handleDateClick,
        events: []
      },
      events: []
    }
  },
  methods: {
    handleDateSelect: function (arg) {
      let ArgStartMergedIdx = null
      let isArgEndMergedIdx = null
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].start === arg.endStr) {
          this.events[i].start = arg.startStr
          arg.endStr = this.events[i].end
          if (ArgStartMergedIdx) {
            this.events.splice(ArgStartMergedIdx, 1, {})
          }
          isArgEndMergedIdx = i
        }
        if (this.events[i].end === arg.startStr) {
          this.events[i].end = arg.endStr
          arg.startStr = this.events[i].start
          if (isArgEndMergedIdx) {
            this.events.splice(isArgEndMergedIdx, 1, {})
          }
          ArgStartMergedIdx = i
        }
      }
      if (!ArgStartMergedIdx && !isArgEndMergedIdx) {
        this.events.push({
          start: arg.startStr,
          end: arg.endStr,
          allDay: false
        })
      }
      this.calendarOptions.events = this.events
    },
    handleDateClick: function () {
    }
  }
}

</script>
