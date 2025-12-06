import { NgIf, NgFor } from '@angular/common';
import { Component  } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-consultation',
  standalone : true , 
  imports: [FormsModule , NgIf , NgFor],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent {
  showModal = false;
  isEditing = false;

  consultations: any[] = [
    {
      id: 1,
      patient: 'Ali Ben Salem',
      medecin: 'Dr. Ahmed Ben Salah',
      notes: 'Douleurs thoraciques',
      diagnostic: 'Angine stable',
      ordonnance: 'Aspirine 100mg / jour',
      date: '2025-02-27'
    },
    {
      id: 2,
      patient: 'Sana Kefi',
      medecin: 'Dr. Yasmine Kefi',
      notes: 'Éruption cutanée',
      diagnostic: 'Dermatite allergique',
      ordonnance: 'Crème dermatologique 2x/jour',
      date: '2025-02-26'
    }
  ];

  newConsultation: any = {
    id: 0,
    patient: '',
    medecin: '',
    notes: '',
    diagnostic: '',
    ordonnance: '',
    date: ''
  };

  openAddModal() {
    this.isEditing = false;
    this.showModal = true;
    this.newConsultation = {
      id: Date.now(),
      patient: '',
      medecin: '',
      notes: '',
      diagnostic: '',
      ordonnance: '',
      date: ''
    };
  }

  openEditModal(c: any) {
    this.isEditing = true;
    this.showModal = true;
    this.newConsultation = { ...c };
  }

  saveConsultation() {
    if (this.isEditing) {
      this.consultations = this.consultations.map(x =>
        x.id === this.newConsultation.id ? this.newConsultation : x
      );
    } else {
      this.consultations.push(this.newConsultation);
    }

    this.showModal = false;
  }

  deleteConsultation(id: number) {
    this.consultations = this.consultations.filter(c => c.id !== id);
  }
}