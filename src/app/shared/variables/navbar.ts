import { Menu } from '../interfaces/Menu';

export const NAVBAR_USER: Menu[] = [
  // {
  //   name: 'Accueil',
  //   routerLink: '/',
  //   submenu : null
  // },
  {
    name: 'Carnets artisanaux',
    routerLink: 'produits/type/carnets',
    submenu : null
  },
  {
    name: 'Cartes Postales',
    routerLink: 'produits/type/cartes-postales',
    submenu : null
  },
  {
    name: 'Marque Pages',
    routerLink: 'produits/type/marque-pages',
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
    submenu : {
      isOpen : false,
      items : [
        { name : "Ma démarche", anchor : "myApproach" },
        { name : "Qui suis-je ?", anchor : "who-am-i" }
      ]
    },
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
