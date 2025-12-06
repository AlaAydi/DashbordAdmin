import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
interface Facture {
  id: number;
  patient: string;
  montant: number;
  date: string;
  status: string;
  adresse?: string;
  diagnostique?: string;
  medecin?: string;
}
@Component({
  selector: 'app-factures',
  standalone:true , 
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './factures.component.html',
  styleUrl: './factures.component.scss'
})
export class FacturesComponent {
factures: Facture[] = [
    { id: 1, patient: 'Ali Ben', montant: 150, date: '2025-12-01', status: 'Payé', adresse: 'Tunis', diagnostique: 'Contrôle général', medecin: 'Dr. Ahmed' },
    { id: 2, patient: 'Sana K.', montant: 200, date: '2025-12-03', status: 'En attente', adresse: 'Sousse', diagnostique: 'Consultation cardiologie', medecin: 'Dr. Hassen' },
    { id: 3, patient: 'Mohamed L.', montant: 100, date: '2025-12-05', status: 'Payé', adresse: 'Ariana', diagnostique: 'Analyse sanguine', medecin: 'Dr. Rania' }
  ];

  selectedFacture: Facture | null = null;
  showModal: boolean = false;

  openModal(f: Facture) {
    this.selectedFacture = f;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  printFacture() {
    if (!this.selectedFacture) return;
    const printContent = `
      <html>
        <head>
          <title>Facture</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #0083B0; }
            p { font-size: 16px; margin: 5px 0; }
          </style>
        </head>
        <body>
          <h2>Facture de ${this.selectedFacture.patient}</h2>
          <p><strong>Patient:</strong> ${this.selectedFacture.patient}</p>
          <p><strong>Adresse:</strong> ${this.selectedFacture.adresse}</p>
          <p><strong>Médecin:</strong> ${this.selectedFacture.medecin}</p>
          <p><strong>Diagnostic:</strong> ${this.selectedFacture.diagnostique}</p>
          <p><strong>Montant:</strong> ${this.selectedFacture.montant} TND</p>
          <p><strong>Date:</strong> ${this.selectedFacture.date}</p>
          <p><strong>Status:</strong> ${this.selectedFacture.status}</p>
        </body>
      </html>
    `;
    const newWin = window.open('', '_blank');
    if (newWin) {
      newWin.document.write(printContent);
      newWin.document.close();
      newWin.print();
    }
  }
}