import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HelloComponent} from './hello/hello.component'
import {TranslateDefaultParser, TranslateLoader, TranslateModule, TranslateParser} from '@ngx-translate/core'
import {StaticTypescriptTranslateModule} from '../../projects/static-typescript-translate/src/lib/static-typescript-translate.module'
import {ENClass} from './i18n/ENClass'
import {
  generatePathMap,
  StaticTypescriptTranslateService
} from '../../projects/static-typescript-translate/src/lib/static-typescript-translate.service'
import {HttpClientModule} from '@angular/common/http'
import {DEClass} from './i18n/DEClass'
import {TranslateExampleModule} from '../../projects/translate-example/src/lib/translate-example.module'
import {TRANSLATE_KEYS} from './TranslateKeys'

export function createLoader(translateService: StaticTypescriptTranslateService) {
  return translateService
}


export function createTranslateParser() {
  return new TranslateDefaultParser()
}

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StaticTypescriptTranslateModule.forRoot({
      en: new ENClass(), de: new DEClass()
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createLoader,
        deps: [StaticTypescriptTranslateService]
      },
      parser: {provide: TranslateParser, useFactory: createTranslateParser},
      defaultLanguage: 'en'
    }),
    TranslateExampleModule
  ],
  providers: [
    {
      provide: TRANSLATE_KEYS,
      useValue: generatePathMap(new ENClass())
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
