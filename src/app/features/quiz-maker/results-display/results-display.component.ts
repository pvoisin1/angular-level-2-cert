import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaQuestion } from 'src/app/core/domain/trivia/trivia-question.model';
import { TriviaService } from 'src/app/core/domain/trivia/trivia.service';

@Component({
  selector: 'app-results-display',
  templateUrl: './results-display.component.html',
  styleUrls: ['./results-display.component.scss']
})
export class ResultsDisplayComponent {
  submittedTriviaQuestions: TriviaQuestion[] = [];

  constructor(private triviaService: TriviaService,
    private router: Router) {
    this.submittedTriviaQuestions = triviaService.submittedTriviaQuestions;
  }

  onCreateANewQuizClick(): void{
    this.router.navigate(['./quiz-maker'])
  }
}
