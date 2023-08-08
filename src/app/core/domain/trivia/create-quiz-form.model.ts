import { FormControl } from "@angular/forms";
import { DifficultyLevel } from "./trivia-difficulty-level.model";

export interface CreateQuizForm {
  category: FormControl<number | null>;
  difficulty: FormControl<DifficultyLevel | null>;
}
