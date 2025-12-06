import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
interface Paiement {
  id: number;
  patient: string;
  montant: number;
  method: string;
  date: string;
}
@Component({
  selector: 'app-paiements',
  standalone:true , 
  imports: [NgFor],
  templateUrl: './paiements.component.html',
  styleUrl: './paiements.component.scss'
})
export class PaiementsComponent {
paiements: Paiement[] = [
    { id: 1, patient: 'Ali Ben', montant: 150, method: 'Espèces', date: '2025-12-01' },
    { id: 2, patient: 'Sana K.', montant: 200, method: 'Carte', date: '2025-12-03' },
    { id: 3, patient: 'Mohamed L.', montant: 100, method: 'Chèque', date: '2025-12-05' }
  ];
}
