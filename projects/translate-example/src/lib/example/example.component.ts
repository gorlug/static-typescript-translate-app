import {Component, Inject} from '@angular/core'
import {TRANSLATE_KEYS} from '../TranslateKeys'
import {ENClass} from '../i18n/en'

@Component({
  templateUrl: './example.component.html',
  selector: 'translate-example-example'
})
export class ExampleComponent {
  constructor(@Inject(TRANSLATE_KEYS) public k: ENClass) {
  }
}
