import { Menu } from '../interfaces/Menu';

export const NAVBAR_USER: Menu[] = [
  {
    name: 'Accueil',
    routerLink: '/',
    submenu : null
  },
  {
    name: 'Carnets artisanaux',
    routerLink: '/carnets',
    submenu : null
  },
  {
    name: 'Ateliers',
    routerLink: '/ateliers',
    submenu : null
  },
  {
    name: 'Galerie Photos',
    routerLink: '/galerie-photos',
    submenu : null
  },
  // {
  //   name: 'Actualités',
  //   routerLink: '/actualites',
  //   submenu : null
  // },
  {
    name: 'A Propos',
    routerLink: '/qui-suis-je',
    submenu : {
      isOpen : false,
      items : [    
            { name : "Ma démarche", anchor : "myApproach" },
            { name : "Qui suis-je ?", anchor : "whoAmI" }
             ]
              },
  },
  {
    name: 'Booktique',
    routerLink: '/booktique',
    submenu : null
  },
  {
    name: 'Contact',
    routerLink: '/contact',
    submenu : null
  },
];
