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
        url: '/analytics',
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
        id: 'Consultations',
        title: 'Consultations',
        type: 'item',
        url: '/admin/Consultations',
        icon: "fa fa-tint"
      }
    ]
  },


  {
    id: 'forms_tables',
    title: 'Gestion Administrative',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'factures',
        title: 'Factures',
        type: 'item',
        url: '/admin/factures',
        icon: 'fa fa-receipt'
      },
      {
        id: 'paiements',
        title: 'Paiements',
        type: 'item',
        url: '/admin/paiements',
        icon: 'fa fa-credit-card'
      },
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
