import {ModuleWithProviders, NgModule} from '@angular/core'
import {LangMap, StaticTypescriptTranslateService} from './static-typescript-translate.service'

@NgModule({})
export class StaticTypescriptTranslateModule {
  static service: StaticTypescriptTranslateService

  static forRoot(langs: LangMap): ModuleWithProviders<StaticTypescriptTranslateModule> {
    this.service = new StaticTypescriptTranslateService(langs)
    return {
      ngModule: StaticTypescriptTranslateModule,
      providers: [
        {provide: StaticTypescriptTranslateService, useValue: this.service}
      ]
    }
  }
}
