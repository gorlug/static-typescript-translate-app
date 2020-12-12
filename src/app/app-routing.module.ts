import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {HelloComponent} from './hello/hello.component'
import {LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings} from '@gilsdav/ngx-translate-router'
import {LocalizeRouterHttpLoader} from '@gilsdav/ngx-translate-router-http-loader'
import {TranslateService} from '@ngx-translate/core'
import {HttpClient} from '@angular/common/http'
import {Location} from '@angular/common'

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'hello'},
  {path: 'hello', component: HelloComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate: any, location: any, settings: any, http: any) =>
          new LocalizeRouterHttpLoader(translate, location, settings, http),
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    })
  ],
  exports: [RouterModule, LocalizeRouterModule]
})
export class AppRoutingModule {
}
