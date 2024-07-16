import {Component, Signal, inject} from '@angular/core';
import { ModalSignalService } from 'src/app/shared/services/modal-signal.service';

@Component({
  standalone : true,
  imports: [],
  selector: 'app-modal',
  template: ` <div class="modal-confirmation-page flex column center"
                   [class]="modalVisible() ? 'modal-visible' : ''">

                <div class="content-text-and-buttons flex column center space-between"
                     [class]="!multipleChoice() ? 'no-margin' : ''">

                  <p [innerHTML]="modalText()"></p>

                  @if (!multipleChoice()) {
                    <button (click)="modalSignal.closeModalAndSendResponseIfExist(true)"
                            class="btn-medium-admin flex center pointer">
                      OK !
                    </button>
                  } @else {
                    <div class="two-buttons flex">
                      <button
                        (click)="modalSignal.closeModalAndSendResponseIfExist(false)"
                        class="btn-admin-cancel"
                      >
                        Annuler
                      </button>

                      <button
                        (click)="modalSignal.closeModalAndSendResponseIfExist(true)"
                        class="btn-admin-valid"
                      >
                        Valider
                      </button>
                    </div>
                  }

                </div>

            </div> `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  protected modalSignal = inject(ModalSignalService);

  modalVisible: Signal<boolean> = this.modalSignal.$isModalVisible;
  modalText: Signal<string> = this.modalSignal.$message;
  multipleChoice: Signal<boolean> = this.modalSignal.$multipleChoice;
}
