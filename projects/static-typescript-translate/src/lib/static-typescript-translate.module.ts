import {APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule} from '@angular/core'
import {LangMap, StaticTypescriptTranslateService} from './static-typescript-translate.service'

export interface ChildConfig {
  prefix: string
  langs: LangMap
}

export const LANG_TOKEN = new InjectionToken<ChildConfig[]>('LANG_TOKEN')

function addChildConfig(service: StaticTypescriptTranslateService, config: ChildConfig[]) {
  return () => {
    service.addLangs(config)
  }
}

@NgModule({})
export class StaticTypescriptTranslateModule {

  static forRoot(langs: LangMap): ModuleWithProviders<StaticTypescriptTranslateModule> {
    const config: ChildConfig = {
      langs, prefix: undefined
    }
    return {
      ngModule: StaticTypescriptTranslateModule,
      providers: [
        StaticTypescriptTranslateService,
        {
          provide: LANG_TOKEN,
          multi: true,
          useValue: [config]
        },
        {
          provide: APP_INITIALIZER, multi: true,
          useFactory: addChildConfig, deps: [StaticTypescriptTranslateService, LANG_TOKEN]
        }
      ]
    }
  }

  static forChild(config: ChildConfig): ModuleWithProviders<StaticTypescriptTranslateModule> {
    return {
      ngModule: StaticTypescriptTranslateModule,
      providers: [
        {
          provide: LANG_TOKEN,
          multi: true,
          useValue: [config]
        }
      ]
    }
  }
}
