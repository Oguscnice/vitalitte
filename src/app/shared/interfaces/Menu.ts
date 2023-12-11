export interface Menu {
  name: string;
  routerLink: string;
  submenu : null | { isOpen : boolean,
                     items : { name : string, anchor : string}[]
                    }
}
