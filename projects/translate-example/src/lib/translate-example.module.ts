import {NgModule} from '@angular/core'
import {ExampleComponent} from './example/example.component'
import {TranslateModule} from '@ngx-translate/core'
import {StaticTypescriptTranslateModule} from '../../../static-typescript-translate/src/lib/static-typescript-translate.module'
import {ENClass} from './i18n/en'
import {DEClass} from './i18n/de'
import {TRANSLATE_KEYS} from './TranslateKeys'
import {generatePathMap} from '../../../static-typescript-translate/src/lib/static-typescript-translate.service'

const declarations = [
  ExampleComponent
]

@NgModule({
  declarations,
  imports: [
    TranslateModule.forRoot(),
    StaticTypescriptTranslateModule.forChild({
      prefix: 'translateExample', langs: {
        en: new ENClass(), de: new DEClass()
      }
    })
  ],
  exports: [
    ...declarations
  ],
  providers: [
    {
      provide: TRANSLATE_KEYS,
      useValue: generatePathMap(new ENClass())
    }
  ]
})
export class TranslateExampleModule {
}
