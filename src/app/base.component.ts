import { Component } from "@angular/core";
import { Subscription } from "rxjs";

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

  ngOnInit(): void {
    this.scrollToTop();
  }

  changeMessage(newMessage: string): void {
    this.messageResponseFromBackend = newMessage;
    setTimeout(() => {
      this.messageResponseFromBackend = "";
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