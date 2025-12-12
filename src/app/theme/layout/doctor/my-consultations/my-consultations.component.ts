import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

interface Consultation {
  patient: string;
  medecin: string;
  date: string;
  diagnostic: string;
}

@Component({
  selector: 'app-my-consultations',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './my-consultations.component.html',
  styleUrl: './my-consultations.component.scss'
})
export class MyConsultationsComponent implements OnInit {

  consultations: Consultation[] = [
    { patient: 'Ali Ben', medecin: 'Dr. Aymen', date: '2025-12-07', diagnostic: 'Grippe' },
    { patient: 'Sara Fethi', medecin: 'Dr. Leila', date: '2025-12-06', diagnostic: 'Tension' },
    { patient: 'Khaled H.', medecin: 'Dr. Aymen', date: '2025-12-05', diagnostic: 'Diabète' }
  ];

  filteredConsultations: Consultation[] = [];
  filterForm: FormGroup;
  showAddModal = false;
  addForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.filterForm = this.fb.group({
      patient: [''],
      medecin: [''],
      date: ['']
    });

    this.addForm = this.fb.group({
      patient: [''],
      medecin: [''],
      date: [''],
      diagnostic: ['']
    });
  }

  ngOnInit(): void {
    this.filteredConsultations = [...this.consultations];
  }

  applyFilter() {
    const { patient, medecin, date } = this.filterForm.value;

    this.filteredConsultations = this.consultations.filter(c =>
      (!patient || c.patient.toLowerCase().includes(patient.toLowerCase())) &&
      (!medecin || c.medecin.toLowerCase().includes(medecin.toLowerCase())) &&
      (!date || c.date === date)
    );
  }



  closeAddModal() {
    this.showAddModal = false;
  }

  addConsultation() {
    if (!this.addForm.valid) return;

    this.consultations.push(this.addForm.value);
    this.applyFilter();
    this.closeAddModal();
    this.addForm.reset();
  }

  get patientControl() { return this.filterForm.get('patient') as FormControl; }
  get medecinControl() { return this.filterForm.get('medecin') as FormControl; }
  get dateControl() { return this.filterForm.get('date') as FormControl; }
}
