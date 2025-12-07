import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    role: new FormControl('Administrateur', Validators.required),
    internalId: new FormControl(''),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Profil admin mis à jour:', this.profileForm.value);
      alert('Profil administrateur mis à jour avec succès !');
    }
  }
}