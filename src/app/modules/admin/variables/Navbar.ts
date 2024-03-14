import { Menu } from "src/app/shared/interfaces/Menu";

export const NAVBAR_ADMIN: Menu[] = [
  {
    name: 'Matériaux',
    routerLink: '/admin/gestion-des-materiaux',
    submenu : null
  },
  {
    name: 'Carnets',
    routerLink: '/admin/gestion-des-carnets',
    submenu : null
  },
  {
    name: 'Activités',
    routerLink: '/admin/gestion-des-activites',
    submenu : null
  },
  {
    name: 'Publications',
    routerLink: '/admin/gestion-des-publications',
    submenu : null
  },
  {
    name: 'Contact',
    routerLink: '/contact',
    submenu : null
  },
];
