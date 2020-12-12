import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HelloComponent} from './hello/hello.component'
import {TranslateDefaultParser, TranslateLoader, TranslateModule, TranslateParser} from '@ngx-translate/core'
import {StaticTypescriptTranslateModule} from '../../projects/static-typescript-translate/src/lib/static-typescript-translate.module'
import {en} from './i18n/en'
import {StaticTypescriptTranslateService} from '../../projects/static-typescript-translate/src/lib/static-typescript-translate.service'
import {HttpClientModule} from '@angular/common/http'
import {de} from './i18n/de'
import {TranslateExampleModule} from '../../projects/translate-example/src/lib/translate-example.module'

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
      en, de
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
