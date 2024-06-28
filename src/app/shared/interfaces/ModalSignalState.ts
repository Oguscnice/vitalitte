import { WritableSignal } from "@angular/core";

export interface ModalSignalState {
  $privateIsModalVisible: WritableSignal<boolean>,
  $privateMultipleChoice: WritableSignal<boolean>,
  $privateMessage: WritableSignal<string>,
  $privateResponse: WritableSignal<boolean | null>,
}