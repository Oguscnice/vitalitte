import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';

@Component({
  standalone: true,
  imports: [ NgClass, RouterLink ],
  selector: 'app-edit-delete-notebook',
  templateUrl: './edit-delete-notebook.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class EditDeleteNotebookComponent {

  @Input() notebooks! : NotebookDto[];
  @Output() notebookToDelete: EventEmitter<NotebookDto> = new EventEmitter();
  @Output() changeAvailabilityNotebook: EventEmitter<NotebookDto> = new EventEmitter();

  isTableVisible = true;

  changeAvailability = (notebook : NotebookDto) => this.changeAvailabilityNotebook.emit(notebook);
  delete = (notebook: NotebookDto) => this.notebookToDelete.emit(notebook);
}
