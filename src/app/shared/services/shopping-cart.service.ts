import { Injectable } from '@angular/core';
import { ShoppingCart } from '../interfaces/ShoppingCart';
import { NOTEBOOKS } from '../variables/notebooks';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  userShoppingCart : ShoppingCart[] = []
  counertQuantityUserShoppingCart : number = 0
  notebooks = NOTEBOOKS

  haveCartInLocalStorage() : ShoppingCart[]{
    return  localStorage.getItem('userCartVittalite') ? 
        JSON.parse(localStorage.getItem('userCartVittalite')!) :
        []
  }

  includesInShoppingCart(itemSlug : string) : boolean{
    this.userShoppingCart = this.haveCartInLocalStorage()
    if(this.userShoppingCart !== null){
      for(let item of this.userShoppingCart){
        if(item.itemsSlug === itemSlug)
          return true
      }
    }
    return false;
  }

  counterTotalShoppingCart() : number{
    this.userShoppingCart = this.haveCartInLocalStorage()
    this.counertQuantityUserShoppingCart = 0
    for(let item of this.userShoppingCart){
      this.counertQuantityUserShoppingCart += item.quantity
    }
    return this.counertQuantityUserShoppingCart;
  }

  totalPrice() : number{
    this.userShoppingCart = this.haveCartInLocalStorage()
    let total : number = 0;
    for(let item of this.userShoppingCart){
      for(let notebook of this.notebooks){
        if(item.itemsSlug === notebook.slug){
          total += (notebook.price * item.quantity)
        }
      }
    }
    return parseFloat(total.toFixed(2));
  }

  itemsForPaypal() : any{
    this.userShoppingCart = this.haveCartInLocalStorage()
    let itemsPaypal : any = []
    for (let item of this.userShoppingCart){
      for(let notebook of this.notebooks){
        if(item.itemsSlug === notebook.slug){
            itemsPaypal.push({
              name: item.itemsSlug,
              quantity: item.quantity.toString(),
              unit_amount: {
                  currency_code: 'EUR',
                  value: notebook.price.toString(),
              },
          })
        }
      }
    }
    return itemsPaypal;
  }

  editCartInLocalStorage(shoppingCart : ShoppingCart[]): void{
    localStorage.setItem('userCartVittalite', JSON.stringify(shoppingCart));
  }

  counterQuantityBySlug(itemSlugParams : string) : number{
    let shoppingCart : ShoppingCart[] = this.haveCartInLocalStorage();
    for(let i = 0; i < shoppingCart.length; i++){
      if(shoppingCart![i].itemsSlug === itemSlugParams)
      return shoppingCart[i].quantity;
    }
    return 0;
  }

  addNotebook(itemSlugParams : string) : void{
    let shoppingCart : ShoppingCart[] = this.haveCartInLocalStorage();
    for(let i = 0; i < shoppingCart.length; i++){
      if(shoppingCart![i].itemsSlug === itemSlugParams){
        shoppingCart![i].quantity++
      }
    }

    if(!this.includesInShoppingCart(itemSlugParams)){
      let newItem : ShoppingCart = { itemsSlug : itemSlugParams, quantity : 1 }
      shoppingCart.push(newItem)
    }
    this.editCartInLocalStorage(shoppingCart);
  }

  subtractNotebookToShoppingCart(itemSlugParams : string) : void{
    let shoppingCart : ShoppingCart[] = this.haveCartInLocalStorage();
    if(this.includesInShoppingCart(itemSlugParams)){
      for(let item of shoppingCart){
        if(item.itemsSlug === itemSlugParams && item.quantity > 0){
            item.quantity--
          if(item.quantity <= 0){
            shoppingCart = shoppingCart.filter(item => item.itemsSlug !== itemSlugParams)
          }
        }
      }
    }
    this.editCartInLocalStorage(shoppingCart);
  }

  cleanLocalStorage(): void{
    localStorage.removeItem('userCartVittalite');
  }
}
