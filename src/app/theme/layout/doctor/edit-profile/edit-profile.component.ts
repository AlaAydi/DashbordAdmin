import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone :true ,
    imports: [ReactiveFormsModule],

  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  profileForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    address: new FormControl(''),
    speciality: new FormControl('Médecin Généraliste', Validators.required),
    experience: new FormControl(1),
    workingHours: new FormControl('08h00 - 17h00'),
    internalId: new FormControl('DOC-001')
  });
   saveProfile() {
    if (this.profileForm.valid) {
      console.log("Profil médecin enregistré :", this.profileForm.value);
    }
  }
}
