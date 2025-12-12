import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventApi, CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarComponent {
  showModal = false;

  selectedEvent: any = null;
  patientHistory: any[] = [];

  consultations = [
    {
      id: '1',
      patient: 'John Doe',
      phone: '22 000 111',
      email: 'john@example.com',
      remark: 'Douleur au dos',
      start: '2025-12-04T10:00:00'
    },
    {
      id: '2',
      patient: 'John Doe',
      remark: 'Consultation de suivi',
      start: '2025-11-24T10:00:00'
    },
    {
      id: '3',
      patient: 'Sarah Smith',
      phone: '24 800 321',
      email: 'sarah@example.com',
      remark: '',
      start: '2025-12-05T14:30:00'
    }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    editable: false,
    selectable: false,
    eventClick: this.handleEventClick.bind(this)
  };

  constructor() {
    this.calendarOptions.events = this.consultations.map(c => ({
      id: c.id,
      title: c.patient,
      start: c.start
    }));
  }

handleEventClick(arg: { event: EventApi }) {
  const data = this.consultations.find(c => c.id === arg.event.id);

  if (!data) return;

  this.selectedEvent = data;

  this.patientHistory = this.consultations
    .filter(c => c.patient === data.patient && c.id !== data.id)
    .map(c => ({
      date: c.start,
      remark: c.remark
    }));

  this.showModal = true;
}


  closeModal() {
    this.showModal = false;
    this.selectedEvent = null;
    this.patientHistory = [];
  }
}
