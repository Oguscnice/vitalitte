import { Component } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-base',
  template: ``,
  styles: [``]
})

export class BaseComponent {

  protected messageResponseFromBackend!: string;
  protected subscriptions: Subscription[] = [];

  protected changeMessage(newMessage: string): void {
    this.messageResponseFromBackend = "";
    this.messageResponseFromBackend = newMessage;
    setTimeout(() => {
      this.messageResponseFromBackend = "";
    }, 5000);
  }

  protected unsubscribeAll() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected ngOnDestroy(): void {
    this.unsubscribeAll();
  }
} 