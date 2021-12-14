/* eslint-disable eqeqeq */
<template>
  <div>
      <Schedule :schedule="events"/>
      <div class="container">
        <FullCalendar id="calendar" ref="fullCalendar" :options="calendarOptions" />
      </div>
  </div>
</template>
<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import Schedule from '@/components/Schedule'

export default {
  components: {
    FullCalendar,
    Schedule
  },
  data () {
    return {
      calendarOptions: {
        locale: 'ja',
        contentHeight: 600,
        plugins: [ timeGridPlugin, interactionPlugin ],
        initialView: 'timeGridWeek',
        selectable: true,
        selectMirror: false,
        unselectAuto: false,
        editable: true,
        eventOverlap: false,
        scrollTimeReset: false,
        select: this.handleDateSelect,
        eventClick: this.handleDateClick,
        events: []
      },
      events: [],
      id: 0
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
          id: this.id,
          start: arg.startStr,
          end: arg.endStr,
          allDay: false
        })
        this.id++
      }
      this.calendarOptions.events = this.events
    },
    handleDateClick: function (eventClickInfo) {
      for (var i = 0; i < this.events.length; i++) {
        if (eventClickInfo.event.id == this.events[i].id) {
          this.events.splice(i, 1, {})
        }
      }
    }
  }
}

</script>
