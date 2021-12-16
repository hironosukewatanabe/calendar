/* eslint-disable eqeqeq */
<template>
  <div>
      <Schedule :schedule_init="events"/>
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
    handleDateSelect: function (selectedEvent) {
      let startMergeIdx = null
      let endMergeIdx = null
      for (var i = 0; i < this.events.length; i++) {
        let existingEvent = this.events[i]
        if (!selectedEvent.startStr.length !== 10) {
          if (existingEvent.start === selectedEvent.endStr) {
            existingEvent.start = selectedEvent.startStr
            selectedEvent.endStr = existingEvent.end
            if (startMergeIdx) {
              this.events.splice(startMergeIdx, 1, {})
            }
            endMergeIdx = i
          }
          if (existingEvent.end === selectedEvent.startStr) {
            existingEvent.end = selectedEvent.endStr
            selectedEvent.startStr = existingEvent.start
            if (endMergeIdx) {
              this.events.splice(endMergeIdx, 1, {})
            }
            startMergeIdx = i
          }
        }
      }
      if (!startMergeIdx && !endMergeIdx) {
        this.events.push({
          id: this.id,
          start: selectedEvent.startStr,
          end: selectedEvent.endStr,
          allDay: false
        })
        this.id++
      }
      this.calendarOptions.events = this.events
    },
    handleDateClick: function (eventClickInfo) {
      for (var i = 0; i < this.events.length; i++) {
        if (eventClickInfo.event.id === this.events[i].id.toString()) {
          this.events.splice(i, 1, {})
        }
      }
    }
  }
}

</script>
