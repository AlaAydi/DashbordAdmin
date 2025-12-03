export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;         // FontAwesome class
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [

  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/admin/dashboard',
        icon: "fa fa-lock"
      },
      {
        id: 'calendrier',
        title: 'Calendrier',
        type: 'item',
        url: '/admin/calendar',
        icon: 'fa fa-calendar'
      },
      {
        id: 'patients',
        title: 'Patients',
        type: 'item',
        url: '/admin/patients',
        icon: 'fa fa-user'
      },
      {
        id: 'doctors',
        title: 'Médecins',
        type: 'item',
        url: '/admin/doctors',
        icon: 'fa fa-user-md'
      },
      {
        id: 'appointments',
        title: 'Rendez-vous',
        type: 'item',
        url: '/admin/appointments',
        icon: "fa fa-tint"
      }
    ]
  },

  // =========================
  // 🟩 FORMULAIRES / TABLEAUX
  // =========================
  {
    id: 'forms_tables',
    title: 'Gestion',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms',
        title: 'Formulaires',
        type: 'item',
        url: '/forms',
        icon: "fa fa-address-book"
      },
      {
        id: 'tables',
        title: 'Tables',
        type: 'item',
        url: '/tables',
        icon: 'fa fa-table'
      
      }
    ]
  },

 {
 id: 'charts',
    title: 'Statistiques',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'apexchart',
        title: 'ApexChart',
        type: 'item',
        url: '/chart',
        icon: "fas fa-chart-bar" ,
      }
    ]
 }
   


 
];
