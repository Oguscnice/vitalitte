import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-footer',
  template: `<footer class="flex center" #footer>
                <div class="footer-container flex space-around center">
                  <i class="fa-brands fa-square-facebook"></i>
                  <i class="fa-brands fa-instagram"></i>
                  <i class="fa-solid fa-envelope"></i>
                </div>
            </footer>`,
  styles: [`
            @use "../../scss/variables.scss" as variablesScss;
            @use "../../../styles.scss";

            :root {
              --height-footer: 0px;
            }

            footer {
              margin-top: variablesScss.$normal-margin;
              height: 60px;
              background-color: variablesScss.$lilac;
              width: 100vw;

              .footer-container {
                width: 100%;

                i {
                  color: variablesScss.$white;
                  font-size: variablesScss.$triple-font-size;
                }
              }
            }

            @media screen and (min-width: 768px) {
              footer {
                .footer-container {
                  max-width: variablesScss.$max-width-768px;
                }
              }
            }
            // Tablettes vers ordinateurs portables :
            @media screen and (min-width: 992px) {
              footer {
                .footer-container {
                  max-width: variablesScss.$max-width-992px;
                }
              }
            }

            // Ordinateurs portables vers ordinateurs de bureau :
            @media screen and (min-width: 1400px) {
              footer {
                .footer-container {
                  max-width: variablesScss.$max-width-1400px;
                }
              }
            }
              `]
})
export class FooterComponent implements AfterViewInit {

  windowSize$ = new Subject<[number, number]>();

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
