import { NOTEBOOKS } from 'src/app/shared/variables/notebooks';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notebook } from 'src/app/shared/interfaces/Notebook';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-notebook-selected',
  templateUrl: './notebook-selected.component.html',
  styleUrls: ['./notebook-selected.component.scss']
})
export class NotebookSelectedComponent extends BaseComponent{

  notebookSlug! : string
  notebookSelected! : Notebook
  notebooks = NOTEBOOKS

  constructor(public route: ActivatedRoute){
    super()
  }

  override ngOnInit(){
    this.route.params.subscribe((params) => {
      this.notebookSlug = params['notebookSlug'];
      this.findNotebook()
    });
    super.ngOnInit();
  }

  findNotebook():void{
    for(let notebook of NOTEBOOKS){
      if(this.notebookSlug === notebook.slug){
        this.notebookSelected = notebook
      }
    }
  }
}
