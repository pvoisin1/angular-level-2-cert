import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent } from './features/quiz-maker/quiz-maker/quiz-maker.component';
import { ResultsDisplayComponent } from './features/quiz-maker/results-display/results-display.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'quiz-maker'
  },
  {
    path: 'quiz-maker',
    component: QuizMakerComponent
  },
  {
    path: 'quiz-results',
    component: ResultsDisplayComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
