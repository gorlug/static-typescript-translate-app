import {Injectable} from '@angular/core'
import {TranslateLoader} from '@ngx-translate/core'
import {Observable, of} from 'rxjs'

export type LangMap = { [key: string]: any }

@Injectable({
  providedIn: 'root'
})
export class StaticTypescriptTranslateService extends TranslateLoader {

  constructor(public langObjects: LangMap
  ) {
    super()
  }

  getTranslation(lang: string): Observable<any> {
    return of(this.langObjects[lang])
  }
}
