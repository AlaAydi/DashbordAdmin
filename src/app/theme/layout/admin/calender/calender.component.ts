import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput, CalendarOptions, EventApi } from '@fullcalendar/core';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
 templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalenderComponent {

 
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,      // Drag & drop
    selectable: true,    // Sélection pour ajouter
    events: [
      { id: '1', title: 'Rendez-vous John Doe', start: '2025-12-04T10:00:00' },
      { id: '2', title: 'Rendez-vous Jane Smith', start: '2025-12-05T14:30:00' }
    ],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this)
  };

  // Ajouter un rendez-vous
  handleDateClick(arg: any) {
    const name = prompt('Nom du patient pour le rendez-vous ?');
    if (name) {
      const newEvent: EventInput = {
        id: String(new Date().getTime()), // ID unique
        title: `Rendez-vous ${name}`,
        start: arg.dateStr
      };
      this.calendarOptions.events = [
        ...(this.calendarOptions.events as EventInput[]),
        newEvent
      ];
    }
  }

  // Modifier ou supprimer un rendez-vous
  handleEventClick(arg: { event: EventApi }) {
    const choice = prompt(
      `Que voulez-vous faire ?\n1: Modifier\n2: Supprimer`,
      '1'
    );

    if (choice === '1') {
      const newName = prompt('Modifier le nom du patient ?', arg.event.title);
      if (newName) {
        arg.event.setProp('title', newName);
      }
    } else if (choice === '2') {
      if (confirm('Voulez-vous vraiment supprimer ce rendez-vous ?')) {
        arg.event.remove();
      }
    }
  }

  // Déplacer un rendez-vous avec drag & drop
  handleEventDrop(arg: { event: EventApi }) {
    alert(`Rendez-vous déplacé à : ${arg.event.start?.toLocaleString()}`);
  }
}