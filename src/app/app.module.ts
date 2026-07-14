import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ComponentsModule } from "./components/components.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  /**
   * Aqui é o Module que vai usar o ComponentsModule importando ele
   */
  imports: [
    BrowserModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
