/* eslint-disable eqeqeq */
<template>
  <div>
      <Schedule :events="schedules.events"/>
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
        eventOverlap: () => false,
        eventResizableFromStart: true,
        scrollTimeReset: false,
        select: this.handleDateSelect,
        eventClick: this.handleDateClick,
        events: []
      },
      schedules: {
        events: [],
        id: 1
      }
    }
  },
  methods: {
    handleDateSelect: function (selectedEvent) {
      let startMergeIdx = null
      let endMergeIdx = null
      for (var i = 0; i < this.schedules.events.length; i++) {
        let existingEvent = this.schedules.events[i]
        if (!selectedEvent.startStr.length !== 10) {
          if (existingEvent.start === selectedEvent.endStr) {
            existingEvent.start = selectedEvent.startStr
            selectedEvent.endStr = existingEvent.end
            if (startMergeIdx !== null) {
              this.$delete(this.schedules.events, startMergeIdx)
            }
            endMergeIdx = i
          }
          if (existingEvent.end === selectedEvent.startStr) {
            existingEvent.end = selectedEvent.endStr
            selectedEvent.startStr = existingEvent.start
            if (endMergeIdx !== null) {
              this.$delete(this.schedules.events, endMergeIdx)
            }
            startMergeIdx = i
          }
        }
      }
      if (startMergeIdx === null && endMergeIdx === null) {
        this.schedules.events.splice(0, 0, {
          id: this.schedules.id,
          start: selectedEvent.startStr,
          end: selectedEvent.endStr,
          allDay: false
        })
        this.$set(this.schedules, 'id', this.schedules.id + 1)
      }
      this.calendarOptions.events = this.schedules.events
    },
    handleDateClick: function (eventClickInfo) {
      for (var i = 0; i < this.schedules.events.length; i++) {
        if (Number(eventClickInfo.event.id) === this.schedules.events[i].id) {
          this.schedules.events.splice(i, 1, {})
        }
      }
    }
  }
}

</script>
