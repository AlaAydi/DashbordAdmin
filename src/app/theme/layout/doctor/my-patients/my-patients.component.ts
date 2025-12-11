import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-patients',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './my-patients.component.html',
  styleUrl: './my-patients.component.scss'
})
export class MyPatientsComponent {

  showViewModal = false;
  showUploadModal = false;
  showPatientModal = false;

  showNotesModal = false;
  showMessagesModal = false;
  showClaimsModal = false;

  selectedPatient: any = null;
  selectedPatientTemp: any = null;

  notesContent = "";
  messageContent = "";
  claimContent = "";

  fileToUpload: any = null;
  safeFileUrl: SafeResourceUrl | null = null;

  patients = [
    { name: "Ala Ben Salem", email: "ala@gmail.com", address: "Tunis", status: "Actif", file: null },
    { name: "Mohamed Jlassi", email: "mj@gmail.com", address: "Ariana", status: "Actif", file: null },
    { name: "Selem Ben Youssef", email: "selem@gmail.com", address: "Sousse", status: "Inactif", file: null }
  ];

  constructor(private sanitizer: DomSanitizer) {}

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

  openPatientModal(patient?: any) {
    if (patient) {
      this.selectedPatient = patient;
      this.selectedPatientTemp = { ...patient };
    } else {
      this.selectedPatient = null;
      this.selectedPatientTemp = { name: '', email: '', address: '', status: 'Actif', file: null };
    }

    this.fileToUpload = null;
    this.showPatientModal = true;
  }

  closePatientModal() {
    this.showPatientModal = false;
  }

  savePatient() {
    if (!this.selectedPatientTemp.name || !this.selectedPatientTemp.email || !this.selectedPatientTemp.address) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (this.selectedPatient) {
      Object.assign(this.selectedPatient, this.selectedPatientTemp);

      if (this.fileToUpload) {
        this.selectedPatient.file = URL.createObjectURL(this.fileToUpload);
      }
    } else {
      if (this.fileToUpload) {
        this.selectedPatientTemp.file = URL.createObjectURL(this.fileToUpload);
      }
      this.patients.push(this.selectedPatientTemp);
    }

    this.closePatientModal();
  }

  openNotes(p: any) {
    this.selectedPatient = p;
    this.notesContent = p.notes || "";
    this.showNotesModal = true;
  }

  saveNotes() {
    this.selectedPatient.notes = this.notesContent;
    this.closeNotes();
  }

  closeNotes() {
    this.showNotesModal = false;
    this.notesContent = "";
  }

  openMessages(p: any) {
    this.selectedPatient = p;
    this.messageContent = "";
    this.showMessagesModal = true;
  }

  saveMessage() {
    if (!this.selectedPatient.messages) this.selectedPatient.messages = [];
    this.selectedPatient.messages.push(this.messageContent);
    this.closeMessages();
  }

  closeMessages() {
    this.showMessagesModal = false;
    this.messageContent = "";
  }

  openClaims(p: any) {
    this.selectedPatient = p;
    this.claimContent = "";
    this.showClaimsModal = true;
  }

  saveClaim() {
    if (!this.selectedPatient.claims) this.selectedPatient.claims = [];
    this.selectedPatient.claims.push({
      content: this.claimContent,
      date: new Date()
    });

    this.closeClaims();
  }

  closeClaims() {
    this.showClaimsModal = false;
    this.claimContent = "";
  }
}
