import { Menu } from '../interfaces/Menu';

export const NAVBAR_USER: Menu[] = [
  {
    name: 'Accueil',
    routerLink: '/',
    submenu : null
  },
  {
    name: 'Ateliers',
    routerLink: '/ateliers',
    submenu : null
  },
  {
    name: 'Actualités',
    routerLink: '/actualites',
    submenu : null
  },
  {
    name: 'A Propos',
    routerLink: '/qui-suis-je',
    submenu : null,
  },
  // {
  //   name: 'Booktique',
  //   routerLink: '/booktique',
  //   submenu : null
  // },
  {
    name: 'Contact',
    routerLink: '/contact',
    submenu : null
  }
  // {
  //   name: 'Galerie Photos',
  //   routerLink: '/galerie-photos',
  //   submenu : null
  // },
];
