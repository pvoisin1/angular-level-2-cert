import { Component } from '@angular/core';
import { TriviaQuestion } from 'src/app/core/domain/trivia/trivia-question.model';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss']
})
export class QuizMakerComponent {
  triviaQuestions: TriviaQuestion[] = [];

  onQuizSelectedEvent(triviaQuestions: TriviaQuestion[]): void{
    this.triviaQuestions = triviaQuestions;
  }
}
