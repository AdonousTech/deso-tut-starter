import { NgModule } from '@angular/core';
import { RouterModule, 
         Routes,
         PreloadAllModules,
         ExtraOptions } from '@angular/router';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
  enableTracing: false
}

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
