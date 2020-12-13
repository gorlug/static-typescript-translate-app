import {Component, Inject, OnInit} from '@angular/core'
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router'
import {ENClass} from '../i18n/ENClass'
import {TRANSLATE_KEYS} from '../TranslateKeys'

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {

  constructor(public localizeRouterService: LocalizeRouterService,
              @Inject(TRANSLATE_KEYS) public k: ENClass) {
  }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    this.localizeRouterService.changeLanguage(lang)
  }
}
