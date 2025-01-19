export interface Answer {
  answer: string;
  is_correct: boolean;
}

// interface AnswerArray extends Array<Answer> {}

export interface Question {
  question: string;
  category: string;
  answers: Answer[];
}

// export interface QuestionArray extends Array<Question> {}
