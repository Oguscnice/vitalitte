import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
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
            @import "../../scss/variables.scss";
            @import "../../../styles.scss";

            :root {
              --height-footer: 0px;
            }

            footer {
              margin-top: $normal-margin;
              height: 60px;
              background-color: $lilac;
              width: 100vw;
              .footer-container{
                width: 100%;
                i {
                  color: $white;
                  font-size: $triple-font-size;
                }
              }
            }

            @media screen and (min-width: 768px) {
              footer {
                .footer-container{
                  max-width: 650px;
                }
              }
            }
            // Tablettes vers ordinateurs portables :
            @media screen and (min-width: 992px) {
              footer {
                .footer-container{
                  max-width: 800px;
                }
              }
            }

            // Ordinateurs portables vers ordinateurs de bureau :
            @media screen and (min-width: 1400px) {
              footer {
                .footer-container{
                  max-width: 1000px;
                }
              }
            }
              `]
})
export class FooterComponent {
  
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

  adaptFooterHeight(): void{
    document.documentElement.style.setProperty(
      '--height-footer',
      this.footer.nativeElement.offsetHeight + 'px'
    );
  }
}
