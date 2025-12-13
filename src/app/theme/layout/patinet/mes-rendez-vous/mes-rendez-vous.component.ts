import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, EventApi } from '@fullcalendar/core';

@Component({
  selector: 'app-mes-rendez-vous',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './mes-rendez-vous.component.html',
  styleUrls: ['./mes-rendez-vous.component.scss']
})
export class MesRendezVousComponent {

  doctors = ['Dr Ahmed', 'Dr Sarah'];

  consultations = [
    {
      id: '1',
      doctor: 'Dr Ahmed',
      date: '2025-12-05',
      time: '10:30',
      remark: 'Contrôle général'
    }
  ];

  showModal = false;
  modalMode: 'add' | 'view' = 'add';
  selectedDate = '';
  selectedEvent: any;
  conflict = false;

  newAppointment = {
    doctor: '',
    time: '',
    remark: ''
  };

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: this.mapEvents(),
    dateClick: info => this.onDateClick(info.dateStr),
    eventClick: info => this.onEventClick(info.event)
  };

  mapEvents() {
    return this.consultations.map(c => {
      const start = new Date(`${c.date}T${c.time}`);
      const end = new Date(start.getTime() + 60 * 60000); // +1h
      return {
        id: c.id,
        title: `${c.doctor} (${c.time})`,
        start: start.toISOString(),
        end: end.toISOString(),
        backgroundColor: '#1976d2',
        borderColor: '#1976d2'
      };
    });
  }

  onDateClick(date: string) {
    this.selectedDate = date;
    this.modalMode = 'add';
    this.newAppointment = { doctor: '', time: '', remark: '' };
    this.conflict = false;
    this.showModal = true;
  }

  onEventClick(event: EventApi) {
    this.selectedEvent = this.consultations.find(c => c.id === event.id);
    this.modalMode = 'view';
    this.showModal = true;
  }

  checkAvailability() {
    if (!this.newAppointment.doctor || !this.newAppointment.time) {
      this.conflict = false;
      return;
    }

    const selectedStart = new Date(`${this.selectedDate}T${this.newAppointment.time}`);
    const selectedEnd = new Date(selectedStart.getTime() + 60 * 60000); // +1h

    this.conflict = this.consultations.some(c => {
      if (c.doctor !== this.newAppointment.doctor || c.date !== this.selectedDate) return false;

      const existingStart = new Date(`${c.date}T${c.time}`);
      const existingEnd = new Date(existingStart.getTime() + 60 * 60000);

      return (selectedStart < existingEnd) && (selectedEnd > existingStart);
    });
  }

  confirmAdd() {
    if (this.conflict) return;

    this.consultations.push({
      id: Date.now().toString(),
      doctor: this.newAppointment.doctor,
      date: this.selectedDate,
      time: this.newAppointment.time,
      remark: this.newAppointment.remark
    });

    this.calendarOptions.events = this.mapEvents();
    this.closeModal();
  }

cancelAppointment() {
  if (!this.selectedEvent) return;

  const now = new Date();
  const appointmentDateTime = new Date(`${this.selectedEvent.date}T${this.selectedEvent.time}`);

  const diffHours = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (diffHours < 24) {
    alert('Vous ne pouvez pas annuler ce rendez-vous moins de 24 heures avant.');
    return;
  }

  this.consultations = this.consultations.filter(c => c !== this.selectedEvent);
  this.calendarOptions.events = this.mapEvents();
  this.closeModal();
}


  closeModal() {
    this.showModal = false;
    this.selectedEvent = null;
  }
}
