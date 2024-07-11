import { WritableSignal } from "@angular/core";

export type AnguilleMessage = {
  index: number,
  message: string,
  isMessageVisible: boolean
}

export interface AnguilleSignalState {
  $privateMessages: WritableSignal<AnguilleMessage[]>
}
