import {Component, OnInit} from '@angular/core'
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router'

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  constructor(public localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    this.localizeRouterService.changeLanguage(lang)
  }
}
