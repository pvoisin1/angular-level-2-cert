import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { QuizMakerModule } from './features/quiz-maker/quiz-maker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    QuizMakerModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
