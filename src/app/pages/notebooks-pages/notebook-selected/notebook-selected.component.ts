import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import {ShoppingCartService} from "../../../shared/services/shopping-cart.service";
import {DataSignalService} from "../../../shared/services/data-signal.service";
import {MaterialDto} from "../../../shared/interfaces/Material";

@Component({
  standalone: false,
  selector: 'app-notebook-selected',
  templateUrl: './notebook-selected.component.html',
  styleUrls: ['./notebook-selected.component.scss']
})
export class NotebookSelectedComponent extends BaseComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private dataSignal = inject(DataSignalService)
  shoppingCart = inject(ShoppingCartService);

  notebookSelected: NotebookDto | null = null;
  materialSelected: MaterialDto | null = null;
  quantityIncreased: boolean = false;
  quantityDecreased: boolean = false;

  ngOnInit(){
    this.route.params.subscribe((params) => this.dataSignal.getNotebookBySlug(params['notebookSlug']));
    this.subscribeToNotebookBySlugSignal();
  }

  subscribeToNotebookBySlugSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$notebookBySlug.subscribe(
        (notebook) => this.notebookSelected = notebook)
    )
  }

  increase(notebook: NotebookDto): void {
    this.quantityIncreased = true;
    this.quantityDecreased = false;
    this.shoppingCart.addItem(notebook, 'notebooks');
    setTimeout(() => {
      this.quantityIncreased = false;
    }, 200);
  }

  decrease(notebook: NotebookDto): void {
    this.quantityIncreased = false;
    this.quantityDecreased = true;
    this.shoppingCart.subtractItem(notebook, 'notebooks')
    setTimeout(() => {
      this.quantityDecreased = false;
    }, 200);
  }

  onClickMaterial(material: MaterialDto): void {
    this.materialSelected = this.materialSelected === material ? null : material;
  }
}
