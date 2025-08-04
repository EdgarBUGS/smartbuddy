export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 1 | 2 | 3;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  topic: string;
  questions: Question[];
}

export interface QuizResult {
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  date: number; // timestamp
}
