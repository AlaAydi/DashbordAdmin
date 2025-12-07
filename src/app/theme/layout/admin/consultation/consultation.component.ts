import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

interface Consultation {
  patient: string;
  medecin: string;
  date: string;
  diagnostic: string;
}

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']   // <-- corrigé
})
export class ConsultationComponent implements OnInit {
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

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addConsultation() {
    if (this.addForm.valid) {
      this.consultations.push(this.addForm.value);
      this.applyFilter();
      this.closeAddModal();
      this.addForm.reset();
    }
  }

  // ✅ getter pour éviter le problème de type null
  get patientControl(): FormControl {
    return this.filterForm.get('patient') as FormControl;
  }

  get medecinControl(): FormControl {
    return this.filterForm.get('medecin') as FormControl;
  }

  get dateControl(): FormControl {
    return this.filterForm.get('date') as FormControl;
  }
}
