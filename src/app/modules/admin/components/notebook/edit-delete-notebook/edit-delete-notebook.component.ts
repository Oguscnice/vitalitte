import { AdminNotebookSignalService } from '../../../shared/services/admin-notebook-signal.service';
import { NgClass } from '@angular/common';
import {Component, OnInit, inject, Signal} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { DataSignalService } from 'src/app/shared/services/data-signal.service';
import { AnguilleComponent } from 'src/app/components/anguille/anguille.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  standalone: true,
  imports: [ NgClass, RouterLink, AnguilleComponent, ModalComponent ],
  selector: 'app-edit-delete-notebook',
  templateUrl: './edit-delete-notebook.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class EditDeleteNotebookComponent implements OnInit {

  private adminNotebookSignal: AdminNotebookSignalService = inject(AdminNotebookSignalService);
  private dataSignalService: DataSignalService = inject(DataSignalService);
  notebooks: Signal<NotebookDto[]> = this.dataSignalService.$notebooks;

  isTableVisible: boolean = true;

  ngOnInit(): void {
    this.dataSignalService.getAllNotebooks();
  }

  changeAvailability = (notebook : NotebookDto) => this.adminNotebookSignal.changeAvailabilityNotebook(notebook);
  onDeleteClick = (notebook: NotebookDto) => this.adminNotebookSignal.confirmationModalForDeleteNotebook(notebook);
}
