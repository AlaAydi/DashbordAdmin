import { CommonModule, NgFor } from '@angular/common';
import { Component ,} from '@angular/core';
import { FormsModule } from '@angular/forms';   

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  phone: string;
  schedule: string;
  image: string;
}
@Component({
  selector: 'app-doctor',
  standalone:true ,
  imports: [CommonModule, NgFor ,FormsModule ],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent {
  doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Ahmed Ben Salah',
      specialty: 'Cardiologie',
      phone: '22 345 678',
      schedule: 'Lun - Ven | 08:00 - 16:00',
      image: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      name: 'Dr. Yasmine Kefi',
      specialty: 'Dermatologie',
      phone: '55 789 123',
      schedule: 'Mar - Sam | 10:00 - 17:00',
      image: 'https://i.pravatar.cc/150?img=47'
    }
  ];

  showDoctorModal = false;
  selectedDoctor: Doctor | null = null;

  tempDoctor: Doctor = {
    id: 0,
    name: '',
    specialty: '',
    phone: '',
    schedule: '',
    image: ''
  };

  openDoctorModal(doctor?: Doctor) {
    this.showDoctorModal = true;

    if (doctor) {
      this.selectedDoctor = doctor;
      this.tempDoctor = { ...doctor };
    } else {
      this.selectedDoctor = null;
      this.tempDoctor = { id: 0, name: '', specialty: '', phone: '', schedule: '', image: '' };
    }
  }

  closeDoctorModal() {
    this.showDoctorModal = false;
    this.selectedDoctor = null;
  }

  saveDoctor() {
    if (this.selectedDoctor) {
      // Modification
      const index = this.doctors.findIndex(d => d.id === this.selectedDoctor!.id);
      this.doctors[index] = { ...this.tempDoctor };
    } else {
      // Ajout
      this.tempDoctor.id = this.doctors.length + 1;
      this.tempDoctor.image = this.tempDoctor.image || 'https://i.pravatar.cc/150?u=' + this.tempDoctor.name;
      this.doctors.push({ ...this.tempDoctor });
    }

    this.closeDoctorModal();
  }

  deleteDoctor(id: number) {
    this.doctors = this.doctors.filter(d => d.id !== id);
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.tempDoctor.image = URL.createObjectURL(file);
  }
}