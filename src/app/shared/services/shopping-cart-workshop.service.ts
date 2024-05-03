import { Injectable } from '@angular/core';
import { ShoppingCart } from '../interfaces/ShoppingCart';
import { WorkshopDto } from '../interfaces/Workshop';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartWorkshopService {

  userShoppingCart : ShoppingCart[] = [];
  counertQuantityUserShoppingCart : number = 0;
  items! : WorkshopDto[];

  haveCartInLocalStorage(): ShoppingCart[] {
    return localStorage.getItem('userCartVitalitteWorkshop') ? 
        JSON.parse(localStorage.getItem('userCartVitalitteWorkshop')!) :
        []
  }

  includesInShoppingCart(itemSlug : string): boolean {

    this.userShoppingCart = this.haveCartInLocalStorage()

    if(this.userShoppingCart !== null){
      for(let item of this.userShoppingCart){
        if(item.itemsSlug === itemSlug)
          return true
      }
    }

    return false;
  }

  counterTotalShoppingCart(): number {

    this.userShoppingCart = this.haveCartInLocalStorage();
    this.counertQuantityUserShoppingCart = 0;

    for(let item of this.userShoppingCart){
      this.counertQuantityUserShoppingCart += item.quantity
    }

    return this.counertQuantityUserShoppingCart;
  }

  totalPrice(): number {

    this.userShoppingCart = this.haveCartInLocalStorage()
    let total : number = 0;
    
    for(let product of this.userShoppingCart){
      for(let item of this.items){
        if(product.itemsSlug === item.slug){
          total += (item.price * product.quantity)
        }
      }
    }

    return parseFloat(total.toFixed(2));
  }

  itemsForPaypal(): any {

    this.userShoppingCart = this.haveCartInLocalStorage()
    let itemsPaypal : any = []

    for (let product of this.userShoppingCart){
      for(let item of this.items){
        if(product.itemsSlug === item.slug){
            itemsPaypal.push({
              name: product.itemsSlug,
              quantity: product.quantity.toString(),
              unit_amount: {
                  currency_code: 'EUR',
                  value: item.price.toString(),
              },
          })
        }
      }
    }
    return itemsPaypal;
  }

  editCartInLocalStorage(shoppingCart : ShoppingCart[]): void{
    localStorage.setItem('userCartVitalitteWorkshop', JSON.stringify(shoppingCart));
  }

  counterQuantityBySlug(itemSlugParams : string) : number{

    let shoppingCart : ShoppingCart[] = this.haveCartInLocalStorage();

    for(let i = 0; i < shoppingCart.length; i++){
      if(shoppingCart[i].itemsSlug === itemSlugParams)
      return shoppingCart[i].quantity;
    }

    return 0;
  }

  addItem(itemSlugParams : string) : void{

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

  subtractItemToShoppingCart(itemSlugParams : string): void {

    let shoppingCart : ShoppingCart[] = this.haveCartInLocalStorage();
    if(this.includesInShoppingCart(itemSlugParams)){
      for(let product of shoppingCart){
        if(product.itemsSlug === itemSlugParams && product.quantity > 0){
            product.quantity--
          if(product.quantity <= 0){
            this.deleteItemToShoppingCart(itemSlugParams);
          }
        }
      }
    }

    this.editCartInLocalStorage(shoppingCart);
  }

  deleteItemToShoppingCart(itemSlugParams : string): void {
    let shoppingCart : ShoppingCart[] = this.haveCartInLocalStorage();
    shoppingCart = shoppingCart.filter(item => item.itemsSlug !== itemSlugParams)
    this.editCartInLocalStorage(shoppingCart);
  }

  cleanLocalStorage(): void{
    localStorage.removeItem('userCartVitalitteWorkshop');
  }
}
