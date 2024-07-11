import { Injectable, signal } from '@angular/core';
import {AnguilleMessage, AnguilleSignalState} from '../interfaces/AnguilleSignalState';

@Injectable({
  providedIn: 'root'
})
export class AnguilleSignalService {

  private readonly state: AnguilleSignalState = {
    $privateMessages: signal<AnguilleMessage[]>([]),
  }

  public readonly $messages = this.state.$privateMessages.asReadonly();

  private addMessage(message: string): AnguilleMessage {

    const HIGHEST_INDEX = this.$messages().reduce((max, current) => {
      return current.index > max ? current.index : max;
    }, 0);

    let newAnguilleMessage = {
      index: HIGHEST_INDEX + 1,
      message: message,
      isMessageVisible: true
    }

    this.state.$privateMessages().push(newAnguilleMessage);
    return newAnguilleMessage;
  }

  private changeMessageVisibility(index: number): void {
    let messages = this.state.$privateMessages().map(msg =>
      msg.index === index ? { ...msg, isMessageVisible: false } : msg
    );
    this.state.$privateMessages.set(messages);
  }

  private removeMessage(index: number): void {
    this.state.$privateMessages.set(this.state.$privateMessages().filter(msg => msg.index !== index));
  }

  changeMessage(newMessage: string): void {

    let messageToManage = this.addMessage(newMessage);

    setTimeout(() => {
      this.changeMessageVisibility(messageToManage.index);
    }, 4000);

    setTimeout(() => {
      this.removeMessage(messageToManage.index);
    }, 6000);
  }
}
