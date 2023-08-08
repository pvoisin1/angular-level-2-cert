import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizSelectorComponent } from './quiz-selector/quiz-selector.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { QuizDisplayComponent } from './quiz-display/quiz-display.component';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';



@NgModule({
  declarations: [
    QuizSelectorComponent,
    QuizDisplayComponent,
    QuizMakerComponent,
    ResultsDisplayComponent
  ],
  imports: [
    SharedModule
  ]
})
export class QuizMakerModule { }
