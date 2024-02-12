import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer class="flex space-around center">
              <i class="fa-brands fa-square-facebook"></i>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-solid fa-envelope"></i>
            </footer>`,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

}
