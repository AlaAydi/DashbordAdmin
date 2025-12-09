// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { DoctorComponent } from './theme/layout/doctor/doctor.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/analytics',
        pathMatch: 'full'
      },
      {
        path: 'analytics',
        loadComponent: () => import('./demo/dashboard/dash-analytics.component')
      },
      {
  path: 'admin/calendar',
  loadComponent: () => import('./theme/layout/admin/calender/calender.component').then(m => m.CalenderComponent)
}
,
{
  path: 'admin/patients',
  loadComponent: () => import('./theme/layout/admin/patient/patient.component').then(m => m.PatientComponent)
} ,
{
  path: 'admin/Consultations',
  loadComponent: () => import('./theme/layout/admin/consultation/consultation.component').then(m => m.ConsultationComponent)
} ,
{
  path: 'admin/doctors',
  loadComponent: () => import('./theme/layout/admin/doctor/doctor.component').then(m => m.DoctorComponent)
} ,
{
  path: 'admin/factures',
  loadComponent: () => import('./theme/layout/admin/gestion-administrative/factures/factures.component').then(m => m.FacturesComponent)
} ,
{
  path: 'admin/settings',
  loadComponent: () => import('./theme/layout/admin/edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
} ,


      {
        path: 'component',
        loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart-maps/core-apex.component')
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms/form-elements/form-elements.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/tables/tbl-bootstrap/tbl-bootstrap.component')
      },

    ]
  },

  {
  path: 'doctor',
  component: DoctorComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      loadComponent: () =>
        import('./theme/layout/doctor/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
    },
    {
      path: 'my-patients',
      loadComponent: () =>
        import('./theme/layout/doctor/my-patients/my-patients.component')
          .then(m => m.MyPatientsComponent)
    },
    {
      path: 'my-consultations',
      loadComponent: () =>
        import('./theme/layout/doctor/my-consultations/my-consultations.component')
          .then(m => m.MyConsultationsComponent)
    },
    {
      path: 'calendar',
      loadComponent: () =>
        import('./theme/layout/doctor/calendar/calendar.component')
          .then(m => m.CalendarComponent)
    },
    {
      path: 'profile',
      loadComponent: () =>
        import('./theme/layout/doctor/edit-profile/edit-profile.component')
          .then(m => m.EditProfileComponent)
    }
  ]
},

  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth/signup',
        loadComponent: () => import('./demo/pages/authentication/sign-up/sign-up.component')
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./demo/pages/authentication/sign-in/sign-in.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
