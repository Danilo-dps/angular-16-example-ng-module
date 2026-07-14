import { NgModule } from '@angular/core';
import { CompsOneComponent } from './comps-one/comps-one.component';
import { CompsTwoComponent } from './comps-two/comps-two.component';

@NgModule({
  /**
   * Aqui são os componentes sendo declarados
   */
  declarations: [
    CompsOneComponent,
    CompsTwoComponent
  ],
  imports: [],
  /**
   * E aqui são os componentes sendo exportados
   */
  exports: [
    CompsOneComponent,
    CompsTwoComponent
  ],
})
export class ComponentsModule { }
