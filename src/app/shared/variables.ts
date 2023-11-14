import { Menu } from './interfaces/Menu';

export const URLAPI = 'http://localhost:8080/api';
export const NAVBAR_USER: Menu[] = [
  {
    name: 'Accueil',
    routerLink: '/',
  },
  {
    name: "L'atelier",
    routerLink: '/atelier',
  },
  {
    name: 'Qui suis-je ?',
    routerLink: '/qui-suis-je',
  },
  {
    name: 'Booktique',
    routerLink: '/booktique',
  },
  {
    name: 'Contact',
    routerLink: '/contact',
  },
];
