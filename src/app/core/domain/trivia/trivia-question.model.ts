export interface TriviaQuestionResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: Answer[];
}

export interface Answer{
  value: string;
  isSelected: boolean
}
