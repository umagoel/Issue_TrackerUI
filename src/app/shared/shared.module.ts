import { AppStore } from './../app.store';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';



@NgModule({
  declarations: [SearchPipe],
  imports: [
    CommonModule
  ],
  exports:[SearchPipe]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule,
          providers: [
            AppStore
          ]
      };
  }
}

