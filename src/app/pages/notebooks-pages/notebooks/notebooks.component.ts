import {Component, inject, OnInit, Signal} from '@angular/core';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import {DataSignalService} from "../../../shared/services/data-signal.service";

@Component({
  standalone: false,
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.scss']
})
export class NotebooksComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  backgroundImageParentCreations = '../../../assets/images/figma/carnet02.jpg';
  notebooks: Signal<NotebookDto[]> = this.dataSignal.$notebooks;

  ngOnInit(): void {
    this.dataSignal.getAllNotebooks(true);
  }
}
