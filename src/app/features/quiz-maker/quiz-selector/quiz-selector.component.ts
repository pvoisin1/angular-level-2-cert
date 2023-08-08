import { Component, EventEmitter, Output } from '@angular/core';
import { TriviaService } from 'src/app/core/domain/trivia/trivia.service'
import { TriviaCategory } from 'src/app/core/domain/trivia/trivia-category.model'
import { take } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DifficultyLevel } from 'src/app/core/domain/trivia/trivia-difficulty-level.model';
import { TriviaQuestion } from 'src/app/core/domain/trivia/trivia-question.model';
import { CreateQuizForm } from 'src/app/core/domain/trivia/create-quiz-form.model';

@Component({
  selector: 'app-quiz-selector',
  templateUrl: './quiz-selector.component.html',
  styleUrls: ['./quiz-selector.component.scss']
})
export class QuizSelectorComponent {
  defaultQuestionCount = 5;
  triviaCategories: TriviaCategory[] = [];
  difficultyLevels: string[] = [];

  form!: FormGroup<CreateQuizForm>;

  @Output() quizSelectedEvent = new EventEmitter<TriviaQuestion[]>;

  constructor(private triviaService: TriviaService,
              private formBuilder: FormBuilder) {
    this.initializeData();
    this.initializeForm();
  }

  private initializeData(): void{
    this.triviaService.getTriviaCategories().pipe(take(1)).subscribe({
      next: (value => this.triviaCategories = value ),
      error: (err) => console.log(err)
    });

    this.difficultyLevels = this.triviaService.getDifficultyLevels();
  }

  private initializeForm(): void{
    this.form = this.formBuilder.group({
      category: this.formBuilder.control<number | null>(null, Validators.required),
      difficulty: this.formBuilder.control<DifficultyLevel | null>(null, Validators.required)
    });
  }

  onCreateClick(): void{
    if(!this.form.valid) return;

    this.triviaService.getQuizQuestions(
      this.defaultQuestionCount,
      this.form.controls['category'].value!,
      this.form.controls['difficulty'].value!)
      .pipe(take(1))
      .subscribe(
        {
          next: (value => this.quizSelectedEvent.emit(value) ),
          error: (err) => console.log(err)
        }
      );
  }
}
