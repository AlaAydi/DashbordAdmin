import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput, CalendarOptions } from '@fullcalendar/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
 templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalenderComponent {

  // Options du calendrier
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,   // permet drag & drop
    selectable: true, // permet sélectionner pour ajouter
    events: [
      { title: 'Rendez-vous test', start: '2025-12-04T10:00:00' }
    ],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  // Ajouter un rendez-vous en cliquant sur une date
  handleDateClick(arg: any) {
    const title = prompt('Nom du patient ?');
    if (title) {
      this.calendarOptions.events = [
        ...(this.calendarOptions.events as EventInput[]),
        { title, start: arg.dateStr }
      ];
    }
  }

  // Modifier un rendez-vous en cliquant dessus
  handleEventClick(arg: any) {
    const newTitle = prompt('Modifier le rendez-vous ?', arg.event.title);
    if (newTitle) {
      arg.event.setProp('title', newTitle);
    }
  }
}
