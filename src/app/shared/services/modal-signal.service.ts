import { Injectable, signal } from '@angular/core';
import { ModalSignalState } from '../interfaces/ModalSignalState';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalSignalService {

  private readonly state: ModalSignalState = {
    $privateIsModalVisible: signal<boolean>(false),
    $privateMultipleChoice: signal<boolean>(false),
    $privateMessage: signal<string>(""),
    $privateResponse: signal<boolean | null>(null),
  }

  private responseSubject = new ReplaySubject<boolean>(1);

  public readonly $message = this.state.$privateMessage.asReadonly();
  public readonly $multipleChoice = this.state.$privateMultipleChoice.asReadonly();
  public readonly $isModalVisible = this.state.$privateIsModalVisible.asReadonly();

  private setMessage(message: string): void {
    this.state.$privateMessage.set(message)
  }

  private setVisibility(value: boolean): void {
    this.state.$privateIsModalVisible.set(value)
  }

  private setMultipleChoice(value: boolean): void {
    this.state.$privateMultipleChoice.set(value)
  }

  showModal(message: string, hasMultipleChoice: boolean): Observable<boolean> {
    this.setVisibility(true);
    this.setMessage(message);
    this.setMultipleChoice(hasMultipleChoice);

    return this.responseSubject.asObservable();
  }

  closeModalAndSendResponseIfExist(response: boolean): void {
    this.setVisibility(false)
    this.setMultipleChoice(false);

    this.responseSubject.next(response || false);
    this.responseSubject.complete();

    // Reset the subject for the next usage
    this.responseSubject = new ReplaySubject<boolean>(1);
  }
}
