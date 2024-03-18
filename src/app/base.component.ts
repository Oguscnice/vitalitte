import { Component } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: 'app-base',
  template: `<i class="up-arrow fa-solid fa-square-caret-up"
                (click)="scrollToTop()"
                *ngIf="showDiv"></i>`,
  styles: [``]
})

export class BaseComponent {

  protected messageResponseFromBackend!: string;
  protected subscriptions: Subscription[] = [];
  protected messageSubscriber: BehaviorSubject<string>;

  constructor(){
    this.messageSubscriber = new BehaviorSubject<string>(this.messageResponseFromBackend);
  }

  ngOnInit(): void {
    this.scrollToTop();
    this.messageSubscriber.subscribe(newMessage => {
      console.log('La nouvelle valeur de message est :', newMessage);
      // Ajoutez ici les actions que vous souhaitez effectuer à chaque changement de message
    });
  }

  changeMessage(newMessage: string): void {
    this.messageResponseFromBackend = newMessage;
    this.messageSubscriber.next(newMessage);
    setTimeout(() => {
      this.messageResponseFromBackend = "";
      this.messageSubscriber.next(this.messageResponseFromBackend); // Émettre la nouvelle valeur aux abonnés
    }, 5000);
  }

  scrollToTop() : void{
    const duration = 500; // Durée de l'animation en millisecondes
    const scrollStep = -window.scrollY / (duration / 15); // Pas de défilement par étape
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }

  protected unsubscribeAll() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
} 