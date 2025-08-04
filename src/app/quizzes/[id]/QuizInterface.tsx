'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Quiz, Question } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useQuizHistory } from '@/hooks/use-quiz-history';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import Link from 'next/link';

interface QuizInterfaceProps {
  quiz: Quiz;
}

export function QuizInterface({ quiz }: QuizInterfaceProps) {
  const { addResult } = useQuizHistory();
  const [questionPool, setQuestionPool] = useState<Question[]>(quiz.questions);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);

  const selectNextQuestion = useCallback(() => {
    if (questionPool.length === 0) {
      setQuizFinished(true);
      addResult({
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: score,
        totalQuestions: quiz.questions.length,
      });
      return;
    }

    let potentialQuestions = questionPool.filter(q => q.difficulty === difficulty);
    if (potentialQuestions.length === 0) {
        potentialQuestions = questionPool.filter(q => q.difficulty === Math.min(3, difficulty + 1));
    }
    if (potentialQuestions.length === 0) {
        potentialQuestions = questionPool.filter(q => q.difficulty === Math.max(1, difficulty - 1));
    }
    if (potentialQuestions.length === 0) {
        potentialQuestions = questionPool;
    }

    const nextQuestion = potentialQuestions[Math.floor(Math.random() * potentialQuestions.length)];
    
    setCurrentQuestion(nextQuestion);
    setQuestionPool(prevPool => prevPool.filter(q => q.text !== nextQuestion.text));
    setSelectedAnswer(null);
    setIsAnswered(false);

  }, [questionPool, difficulty, score, quiz.id, quiz.title, addResult]);

  useEffect(() => {
    selectNextQuestion();
  }, []); // Run only once on mount

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    const isCorrect = answerIndex === currentQuestion?.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setDifficulty(d => Math.min(3, d + 1) as 1 | 2 | 3);
    } else {
      setDifficulty(d => Math.max(1, d - 1) as 1 | 2 | 3);
    }
  };
  
  const progress = useMemo(() => {
    const totalQuestions = quiz.questions.length;
    const answeredQuestions = totalQuestions - questionPool.length - (currentQuestion ? 1 : 0);
    return (answeredQuestions / totalQuestions) * 100;
  }, [quiz.questions.length, questionPool.length, currentQuestion]);

  if (quizFinished) {
    const finalScore = (score / quiz.questions.length) * 100;
    return (
      <div className="flex h-full flex-col items-center justify-center bg-background p-4 text-center">
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <Trophy className="mx-auto h-16 w-16 text-yellow-400"/>
                <CardTitle className="mt-4 text-3xl font-bold">Quiz Complete!</CardTitle>
                <CardDescription>You've finished the {quiz.title} quiz.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-5xl font-bold text-primary">{finalScore.toFixed(0)}%</div>
                <p className="text-muted-foreground">You answered {score} out of {quiz.questions.length} questions correctly.</p>
                <div className="flex justify-center space-x-4 pt-4">
                    <Button onClick={() => window.location.reload()}>Try Again</Button>
                    <Button variant="outline" asChild><Link href="/quizzes">More Quizzes</Link></Button>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return null; // Or a loading state
  }

  return (
    <div className="flex h-full flex-col justify-center p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-4">
          <Progress value={progress} className="w-full" />
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Question {quiz.questions.length - questionPool.length} of {quiz.questions.length}
          </p>
        </div>

        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold leading-tight">{currentQuestion.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const isSelected = selectedAnswer === index;
                    return (
                        <Button
                            key={index}
                            variant="outline"
                            size="lg"
                            className={cn(
                                'flex w-full justify-start p-4 text-left h-auto text-base',
                                isAnswered && isCorrect && 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400',
                                isAnswered && isSelected && !isCorrect && 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400',
                                'hover:bg-accent/80'
                            )}
                            onClick={() => handleAnswer(index)}
                            disabled={isAnswered}
                        >
                            <span className="mr-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary text-primary font-bold">{String.fromCharCode(65 + index)}</span>
                            <span className="flex-1">{option}</span>
                            {isAnswered && isCorrect && isSelected && <CheckCircle className="h-6 w-6 text-green-500" />}
                            {isAnswered && !isCorrect && isSelected && <XCircle className="h-6 w-6 text-red-500" />}
                            {isAnswered && isCorrect && !isSelected && <CheckCircle className="h-6 w-6 text-green-500" />}
                        </Button>
                    )
                })}
            </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
            <Button onClick={selectNextQuestion} disabled={!isAnswered}>
                {questionPool.length > 0 ? "Next Question" : "Finish Quiz"}
            </Button>
        </div>
      </div>
    </div>
  );
}
