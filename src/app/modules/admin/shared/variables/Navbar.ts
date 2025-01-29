import { Menu } from "../../../../shared/interfaces/Menu";

export const NAVBAR_ADMIN: Menu[] = [
  {
    name: 'Papeterie',
    routerLink: '/admin/gestion-papeterie',
    submenu : null
  },
  {
    name: 'Commentaires',
    routerLink: '/admin/gestion/commentaires',
    submenu : null
  },
  {
    name: 'Ateliers',
    routerLink: '/admin/gestion/ateliers',
    submenu : null
  },
  {
    name: 'Publications',
    routerLink: '/admin/gestion/publications',
    submenu : null
  },
  {
    name: 'Cartes Cadeaux',
    routerLink: '/admin/gestion/cartes-cadeaux',
    submenu : null
  },
  {
    name: 'Option de livraison',
    routerLink: '/admin/gestion/options-de-livraison',
    submenu : null
  },
  {
    name: 'Contact',
    routerLink: '/admin/gestion/contacts',
    submenu : null
  },
];

export const NAVBAR_ADMIN_STATIONERY: Menu[] = [
    {
      name: 'Catégories et Collections',
    routerLink: '/admin/gestion/categories-collections',
      submenu : null
    },
    {
      name: 'Matériaux',
      routerLink: '/admin/gestion/materiaux',
      submenu : null
    }
  ]
