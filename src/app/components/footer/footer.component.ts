import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import {UTAIDA_PROJECT} from "../../shared/variables/AppConfig";

@Component({
  selector: 'app-footer',
  template: `<footer class="flex center" #footer>
                <div class="footer-container flex space-around center">
                  <a href="{{utaida.socialLinks.facebook}}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-square-facebook"></i>
                  </a>
                  <a href="{{utaida.socialLinks.instagram}}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                  <a href="{{utaida.generalInfo.email}}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-solid fa-envelope"></i>
                  </a>
                </div>
                <div class="legal-infos">
                    <p>&copy; {{ currentYear }} {{ utaida.name }}</p>

                </div>
            </footer>`,
  styles: [`
    @use "../../scss/variables.scss" as variablesScss;
    @use "../../../styles.scss";

    :root {
      --height-footer: 0px;
    }

    footer {
      height: 60px;
      background-color: variablesScss.$white;
      width: 100vw;

      .footer-container {
        width: 100%;

        a {
          i {
            color: variablesScss.$black;
            font-size: variablesScss.$triple-font-size;
            cursor: pointer;
          }
        }
      }
    }

    @media screen and (min-width: 768px) {
      footer {
        .footer-container {
          max-width: var(--max-width);
        }
      }
    }

    // Tablettes vers ordinateurs portables :
    @media screen and (min-width: 992px) {
      footer {
        .footer-container {
          max-width: var(--max-width);
        }
      }
    }

    // Ordinateurs portables vers ordinateurs de bureau :
    @media screen and (min-width: 1400px) {
      footer {
        .footer-container {
          max-width: var(--max-width);
        }
      }
    }
  `]
})
export class FooterComponent implements AfterViewInit {

  windowSize$ = new Subject<[number, number]>();
  utaida = UTAIDA_PROJECT;
  currentYear: number = new Date().getFullYear();

  @ViewChild('footer') footer!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.windowSize$.next([window.innerWidth, window.innerHeight]);
    this.adaptFooterHeight();
  }

  ngAfterViewInit(): void {
    this.adaptFooterHeight();
  }

  adaptFooterHeight(): void {
    document.documentElement.style.setProperty(
      '--height-footer',
      this.footer.nativeElement.offsetHeight + 'px'
    );
  }
}
