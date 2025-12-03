import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // pour ngModel
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput, CalendarOptions, EventApi } from '@fullcalendar/core';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule],
 templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalenderComponent {


  showModal = false;
  modalTitle = '';
  modalAction: 'add' | 'edit' = 'add';
  modalEvent: EventApi | null = null;
  patientName = '';

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    selectable: true,
    events: [
      { id: '1', title: 'Rendez-vous John Doe', start: '2025-12-04T10:00:00' },
      { id: '2', title: 'Rendez-vous Jane Smith', start: '2025-12-05T14:30:00' }
    ],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this)
  };

  // Ajouter un rendez-vous (ouvre modal)
  handleDateClick(arg: any) {
    const startDate = arg.dateStr || new Date().toISOString();
    this.modalAction = 'add';
    this.modalTitle = `Ajouter un rendez-vous le ${startDate}`;
    this.patientName = '';
    this.modalEvent = { start: startDate } as any;
    this.showModal = true;
  }

  // Modifier/Supprimer un rendez-vous (ouvre modal)
  handleEventClick(arg: { event: EventApi }) {
    this.modalAction = 'edit';
    this.modalTitle = `Modifier ou supprimer le rendez-vous`;
    this.patientName = arg.event.title;
    this.modalEvent = arg.event;
    this.showModal = true;
  }

  // Enregistrer un rendez-vous
  saveEvent() {
    if (!this.patientName.trim()) return;

    if (this.modalAction === 'add') {
      const newEvent: EventInput = {
        id: String(new Date().getTime()),
        title: this.patientName,
        start: this.modalEvent?.start || new Date()
      };
      this.calendarOptions.events = [
        ...(this.calendarOptions.events as EventInput[]),
        newEvent
      ];
    } else if (this.modalAction === 'edit' && this.modalEvent) {
      this.modalEvent.setProp('title', this.patientName);
    }

    this.closeModal();
  }

  // Supprimer un rendez-vous
  deleteEvent() {
    if (this.modalAction === 'edit' && this.modalEvent) {
      if (confirm('Voulez-vous vraiment supprimer ce rendez-vous ?')) {
        this.modalEvent.remove();
      }
    }
    this.closeModal();
  }


  closeModal() {
    this.showModal = false;
    this.modalEvent = null;
    this.patientName = '';
  }

  handleEventDrop(arg: { event: EventApi }) {
    alert(`Rendez-vous déplacé à : ${arg.event.start?.toLocaleString()}`);
  }
}