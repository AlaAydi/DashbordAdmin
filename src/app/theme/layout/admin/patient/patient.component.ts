import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  // Modals
  showViewModal = false;
  showUploadModal = false;
  showPatientModal = false;

  // Patient sélectionné
  selectedPatient: any = null;
  selectedPatientTemp: any = null;

  // Fichier upload
  fileToUpload: any = null;
  safeFileUrl: SafeResourceUrl | null = null;

  // Liste des patients
  patients = [
    { name: "Ala Ben Salem", email: "ala@gmail.com", address: "Tunis, Centre Urbain", status: "Actif", file: null },
    { name: "Mohamed Jlassi", email: "mj@gmail.com", address: "Ariana, Ennasr", status: "Actif", file: null },
    { name: "Selem Ben Youssef", email: "sarra@gmail.com", address: "Sousse", status: "Inactif", file: null }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  /** ---------------- MODAL VUE Dossier ---------------- */
  openFile(patient: any) {
    this.selectedPatient = patient;
    if (patient.file) {
      this.safeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(patient.file);
    } else {
      this.safeFileUrl = null;
    }
    this.showViewModal = true;
  }

  closeView() {
    this.showViewModal = false;
  }

  /** ---------------- MODAL UPLOAD ---------------- */
  uploadFile(patient: any) {
    this.selectedPatient = patient;
    this.fileToUpload = null;
    this.showUploadModal = true;
  }

  closeUpload() {
    this.showUploadModal = false;
  }

  handleFileUpload(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  saveFile() {
    if (this.fileToUpload) {
      this.selectedPatient.file = URL.createObjectURL(this.fileToUpload);
      this.safeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedPatient.file);
      this.fileToUpload = null;
      this.closeUpload();
      this.showViewModal = true;
    }
  }

  /** ---------------- MODAL AJOUT / MODIFICATION PATIENT ---------------- */
  openPatientModal(patient?: any) {
    if (patient) {
      // Modifier
      this.selectedPatient = patient;
      this.selectedPatientTemp = { ...patient };
    } else {
      // Ajouter
      this.selectedPatient = null;
      this.selectedPatientTemp = { name:'', email:'', address:'', status:'Actif', file: null };
    }
    this.fileToUpload = null;
    this.showPatientModal = true;
  }

  closePatientModal() {
    this.showPatientModal = false;
    this.selectedPatientTemp = null;
    this.fileToUpload = null;
  }

  savePatient() {
    if (!this.selectedPatientTemp.name || !this.selectedPatientTemp.email || !this.selectedPatientTemp.address) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if(this.selectedPatient){
      // Modifier patient existant
      Object.assign(this.selectedPatient, this.selectedPatientTemp);
      if(this.fileToUpload){
        this.selectedPatient.file = URL.createObjectURL(this.fileToUpload);
      }
    } else {
      // Ajouter nouveau patient
      if(this.fileToUpload){
        this.selectedPatientTemp.file = URL.createObjectURL(this.fileToUpload);
      }
      this.patients.push(this.selectedPatientTemp);
    }

    this.closePatientModal();
  }
}
