import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TriviaCategory, TriviaCategoryResponse } from './trivia-category.model';
import { Answer, TriviaQuestion, TriviaQuestionResponse } from './trivia-question.model';
import { DifficultyLevel } from './trivia-difficulty-level.model';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  submittedTriviaQuestions: TriviaQuestion[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getTriviaCategories(): Observable<TriviaCategory[]> {
    return this.http.get<TriviaCategoryResponse>(
      `https://opentdb.com/api_category.php`).pipe(map(x=>x.trivia_categories));
  }

  getDifficultyLevels(): DifficultyLevel[] {
    return ["easy", "medium", "hard"];
  }

  getQuizQuestions(questionAmount: number, categoryId: number, difficultyLevel: DifficultyLevel): Observable<TriviaQuestion[]>{
    let params: HttpParams = new HttpParams();
    params = params.set('amount', questionAmount);
    params = params.set('category', categoryId);
    params = params.set('difficulty', difficultyLevel);
    params = params.set('type', "multiple");

    return this.http.get<TriviaQuestionResponse>(
      `https://opentdb.com/api.php`,{ params: params })
      .pipe(map(x=>{
        x.results.forEach(result => {
          let answers: Answer[] = [];
          result.incorrect_answers.forEach(incorrect_answer => answers.push({ value: incorrect_answer, isSelected: false }))
          answers.push({value: result.correct_answer, isSelected: false});
          result.answers = this.shuffleArray(answers);
        })
        return x.results;
      }));
  }

  countScore(triviaQuestions: TriviaQuestion[]): number{
    let score = 0;
    triviaQuestions.forEach(question => {
      question.answers.forEach(answer => {
        if(answer.isSelected && answer.value == question.correct_answer) score++;
      })
    });
    return score;
  }

  checkIfAllQuestionsHaveAnswers(triviaQuestions: TriviaQuestion[]): boolean{
    let allAnswered = false;
    for(let question of triviaQuestions){
      if(question.answers.filter(x=>x.isSelected == true).length === 0)
      {
        allAnswered = false;
        break;
      }
      allAnswered = true;
    }
    return allAnswered
  }

  private shuffleArray(array: Answer[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
}
