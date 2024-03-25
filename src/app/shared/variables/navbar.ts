import { Menu } from '../interfaces/Menu';

export const NAVBAR_USER: Menu[] = [
  {
    name: 'Accueil',
    routerLink: '/',
    submenu : null
  },
  // {
  //   name: "L'univers",
  //   routerLink: '/atelier',
  //   submenu : {
  //     isOpen : false,
  //       items : [    
  //           { name : "Carnets artisanaux", anchor : "handcraftedNotebooks" },
  //           { name : "Animations", anchor : "animations" }
  //               ]
  //             }
  // },
  {
    name: 'Carnets artisanaux',
    routerLink: '/atelier',
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
    name: 'Booktique',
    routerLink: '/booktique',
    submenu : null
  },
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
    name: 'Contact',
    routerLink: '/contact',
    submenu : null
  },
];
