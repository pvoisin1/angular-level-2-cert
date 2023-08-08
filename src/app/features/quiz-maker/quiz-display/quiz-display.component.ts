import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerDisplayType, ScoreDisplayType } from 'src/app/core/domain/trivia/quiz-results-display.model';
import { Answer, TriviaQuestion } from 'src/app/core/domain/trivia/trivia-question.model';
import { TriviaService } from 'src/app/core/domain/trivia/trivia.service'

@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.scss']
})
export class QuizDisplayComponent implements OnInit {
  @Input() triviaQuestions: TriviaQuestion[] = [];
  @Input() showResults: boolean = false;
  score: number = 0;

  allQuestionsAnswered = false;

  constructor(private router: Router,
              private triviaService: TriviaService) {}

  ngOnInit(): void {
    if(this.showResults) this.score = this.triviaService.countScore(this.triviaQuestions);
  }

  onAnswerClick(triviaQuestion: TriviaQuestion, selectedAnswer: Answer): void {
    triviaQuestion.answers.forEach(answer => answer.isSelected = answer.value === selectedAnswer.value)
    this.allQuestionsAnswered = this.triviaService.checkIfAllQuestionsHaveAnswers(this.triviaQuestions);
  }

  onSubmit(): void{
    this.triviaService.submittedTriviaQuestions = this.triviaQuestions;
    this.router.navigate(['./quiz-results'])
  }

  lookupAnswerButtonClass(triviaQuestion: TriviaQuestion, answer: Answer): AnswerDisplayType{
    if(!this.showResults) return answer.isSelected ? 'selected-answer' : 'default';
    if(answer.isSelected) return 'selected-answer';
    if(triviaQuestion.correct_answer === answer.value && !answer.isSelected) return 'wrong-answer-selected';
    return 'default';
  }

  lookupResultsClass(): ScoreDisplayType{
    if(this.score < 2) return 'score-level-1';
    if(this.score < 4) return 'score-level-2';
    return 'score-level-3';
  }
}

