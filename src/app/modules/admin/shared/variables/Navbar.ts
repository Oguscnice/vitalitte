import { Menu } from "../../../../shared/interfaces/Menu";

export const NAVBAR_ADMIN: Menu[] = [
  {
    name: 'Papeterie',
    routerLink: '/admin/gestion-papeterie',
    submenu : null
  },
  {
    name: 'Commentaires',
    routerLink: '/admin/gestion-des-commentaires',
    submenu : null
  },
  {
    name: 'Ateliers',
    routerLink: '/admin/gestion-des-ateliers',
    submenu : null
  },
  {
    name: 'Publications',
    routerLink: '/admin/gestion-des-publications',
    submenu : null
  },
  {
    name: 'Cartes Cadeaux',
    routerLink: '/admin/gestion-des-cartes-cadeaux',
    submenu : null
  },
  {
    name: 'Option de livraison',
    routerLink: '/admin/gestion-des-options-de-livraison',
    submenu : null
  },
  {
    name: 'Contact',
    routerLink: '/admin/gestion-des-contacts',
    submenu : null
  },
];

export const NAVBAR_ADMIN_STATIONERY: Menu[] = [
  {
    name: 'Catégories et Collections',
    routerLink: '/admin/gestion-des-categories-et-collections',
    submenu : null
  },
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
  ]
