import {Injectable} from '@angular/core'
import {TranslateLoader} from '@ngx-translate/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {ChildConfig} from './static-typescript-translate.module'
import {map, skipWhile} from 'rxjs/operators'

export function generatePathMap(obj: any, basePath = '') {
  return Object.keys(obj).reduce((result, key) => {
    const path = basePath === '' ? key : `${basePath}.${key}`
    if (typeof obj[key] === 'object') {
      result[key] = generatePathMap(obj[key], path)
    } else {
      result[key] = path
    }
    return result
  }, {})
}

export type LangMap = { [key: string]: any }

@Injectable()
export class StaticTypescriptTranslateService extends TranslateLoader {
  public langObjects$ = new BehaviorSubject<LangMap>(undefined)
  langObjects: LangMap = {}
  pathMap: any

  constructor() {
    super()
  }

  getTranslation(lang: string): Observable<any> {
    return this.langObjects$.pipe(
      skipWhile(value => value === undefined),
      map(langObjects => {
        let langObject = langObjects[lang]
        if (langObject === undefined) {
          langObject = {}
        }
        return langObject
      })
    )
  }

  getPathMap() {
    return this.pathMap
  }

  addLangs(configs: ChildConfig[]) {
    configs.forEach(config => {
      const innerConfig: ChildConfig[] = config as any
      this.addLangsFromConfig(innerConfig[0])
    })
    this.langObjects$.next(this.langObjects)
    this.setPathMap()
  }

  setPathMap() {
    // const key = Object.keys(this.langObjects)[0]
    // this.pathMap = generatePathMap(this.langObjects[key])
    // console.log('bbq pathMap', this.pathMap)
  }

  private addLangsFromConfig(config: ChildConfig) {
    Object.keys(config.langs).forEach(lang => {
      const object = this.getOrCreateLangObject(lang)
      if (config.prefix === undefined) {
        this.addAllLangKeys(config, lang, object)
      } else {
        object[config.prefix] = config.langs[lang][config.prefix]
      }
      this.langObjects[lang] = object
    })
  }

  private addAllLangKeys(config: ChildConfig, lang: string, object) {
    const configLang = config.langs[lang]
    Object.keys(configLang).forEach(key => {
      object[key] = configLang[key]
    })
  }

  private getOrCreateLangObject(lang: string) {
    let object = this.langObjects[lang]
    if (object === undefined) {
      object = {}
    }
    return object
  }
}
