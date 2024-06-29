import { Injectable, signal } from '@angular/core';
import { AnguilleSignalState } from '../interfaces/AnguilleSignalState';

@Injectable({
  providedIn: 'root'
})
export class AnguilleSignalService {

  private readonly state: AnguilleSignalState = {
    $privateMessage: signal<string>(""),
  }

  public readonly $message = this.state.$privateMessage.asReadonly();

  private setMessage(message: string): void {
    this.state.$privateMessage.set(message)
  }

  private resetMessage(): void {
    this.state.$privateMessage.set("")
  }

  changeMessage(newMessage: string): void {
    this.resetMessage();
    this.setMessage(newMessage);
    setTimeout(() => {
      this.resetMessage();
    }, 5000);
  }
}
