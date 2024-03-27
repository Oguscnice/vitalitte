import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone : true,
  selector: 'app-modal',
  template: ` <div 
                class="modal-confirmation-page flex column center"
                [class]="modalVisible ? 'modal-visible' : ''"
              >

                <div
                  class="content-text-and-buttons flex column space-between"
                  [class]="!multipleChoice ? 'no-margin' : ''"
                >
                  <p [innerHTML]="modalText"></p>

                  <button
                    (click)="closeModalAndSendResponseIfExist()"
                    [class]="!multipleChoice ? 'btn-medium-admin pointer' : 'display-none'">
                    OK !
                  </button>

                  <div [class]="multipleChoice ? 'two-buttons flex center space-between' : 'display-none'">
                    <button
                      (click)="closeModalAndSendResponseIfExist('false')"
                      class="btn-admin-cancel"
                    >
                      Annuler
                    </button>

                    <button
                      (click)="closeModalAndSendResponseIfExist('true')"
                      class="btn-admin-valid"
                    >
                      Valider
                    </button>
                  </div>

                </div>

            </div> `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() modalVisible : boolean = false;
  @Input() modalText : string = '';
  @Input() multipleChoice : boolean = false;

  @Output() responseForModal: EventEmitter<boolean> = new EventEmitter();

  closeModalAndSendResponseIfExist(response?: string): void {
    this.modalVisible = false
    this.responseForModal.emit(response == 'true' ? true : false);
  }
}
