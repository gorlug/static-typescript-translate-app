import {NgModule} from '@angular/core'
import {ExampleComponent} from './example/example.component'
import {TranslateModule} from '@ngx-translate/core'
import {StaticTypescriptTranslateModule} from '../../../static-typescript-translate/src/lib/static-typescript-translate.module'
import {en} from './i18n/en'
import {de} from './i18n/de'

const declarations = [
  ExampleComponent
]

@NgModule({
  declarations,
  imports: [
    TranslateModule.forRoot(),
    StaticTypescriptTranslateModule.forChild({
      prefix: 'translateExample', langs: {
        en, de
      }
    })
  ],
  exports: [
    ...declarations
  ]
})
export class TranslateExampleModule {
}
