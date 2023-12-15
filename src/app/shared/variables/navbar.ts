import { Menu } from '../interfaces/Menu';

export const NAVBAR_USER: Menu[] = [
  {
    name: 'Accueil',
    routerLink: '/',
    submenu : null
  },
  {
    name: "L'atelier",
    routerLink: '/atelier',
    submenu : {
      isOpen : false,
        items : [    
            { name : "Carnets artisanaux", anchor : "handcraftedNotebooks" },
            { name : "Animations", anchor : "animations" }
                ]
              }
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
