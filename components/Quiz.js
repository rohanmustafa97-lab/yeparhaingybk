'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shuffleQuizQuestions } from '@/lib/quiz';

export default function Quiz({
  lessonId,
  questions,
  onComplete,
  savedProgress,
  onProgressSave,
}) {
  const shuffledQuestions = useMemo(() => shuffleQuizQuestions(questions), [questions]);

  const saved = savedProgress?.[lessonId];
  const [currentQuestion, setCurrentQuestion] = useState(saved?.currentQuestion || 0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(saved?.correctCount || 0);

  const question = shuffledQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === shuffledQuestions.length - 1;

  useEffect(() => {
    if (saved?.currentQuestion != null) {
      setCurrentQuestion(saved.currentQuestion);
      setCorrectCount(saved.correctCount || 0);
    } else {
      setCurrentQuestion(0);
      setCorrectCount(0);
    }
    setSelectedAnswer(null);
    setChecked(false);
    setIsCorrect(false);
  }, [lessonId, questions]);

  useEffect(() => {
    if (!lessonId || !onProgressSave) return;
    onProgressSave(lessonId, {
      currentQuestion,
      correctCount,
      completed: false,
    });
  }, [lessonId, currentQuestion, correctCount, onProgressSave]);

  const handleCheck = useCallback(() => {
    if (selectedAnswer === null || !question) return;
    const correct = selectedAnswer === question.correctIndex;
    setIsCorrect(correct);
    setChecked(true);
  }, [selectedAnswer, question]);

  const handleContinue = useCallback(() => {
    if (!isCorrect) {
      setChecked(false);
      setSelectedAnswer(null);
      return;
    }

    const newCount = correctCount + 1;

    if (isLastQuestion) {
      onComplete(newCount);
      return;
    }

    setCorrectCount(newCount);
    setCurrentQuestion((q) => q + 1);
    setSelectedAnswer(null);
    setChecked(false);
    setIsCorrect(false);
  }, [isCorrect, correctCount, isLastQuestion, onComplete]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!checked) handleCheck();
        else handleContinue();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [checked, handleCheck, handleContinue]);

  if (!shuffledQuestions.length) {
    return <p className="text-center text-muted">No quiz questions available.</p>;
  }

  if (!question) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-muted">
          <span>Question {currentQuestion + 1} of {shuffledQuestions.length}</span>
          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            Scenario-Based
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            animate={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass-card p-6 md:p-8"
        >
          <h2 className="mb-6 whitespace-pre-line text-xl font-bold text-foreground md:text-2xl">
            {question.question}
          </h2>

          <fieldset>
            <legend className="sr-only">Select your answer for question {currentQuestion + 1}</legend>
            <div className="space-y-3" role="radiogroup" aria-label={`Question ${currentQuestion + 1}`}>
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const showResult = checked;
                const isAnswer = index === question.correctIndex;
                let borderClass = 'border-white/10 hover:border-primary/50';
                if (showResult && isAnswer) borderClass = 'border-green-500/50 bg-green-500/10';
                else if (showResult && isSelected && !isAnswer) borderClass = 'border-red-500/50 bg-red-500/10';
                else if (isSelected) borderClass = 'border-primary/50 bg-primary/10';

                return (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => !checked && setSelectedAnswer(index)}
                    disabled={checked && isCorrect}
                    whileHover={!checked ? { scale: 1.01 } : {}}
                    whileTap={!checked ? { scale: 0.99 } : {}}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${borderClass} ${
                      checked && isCorrect ? 'cursor-default' : ''
                    }`}
                    role="radio"
                    aria-checked={isSelected}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                        isSelected ? 'border-primary bg-primary text-white' : 'border-white/20 text-muted'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm text-foreground md:text-base">{option}</span>
                  </motion.button>
                );
              })}
            </div>
          </fieldset>

          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mt-6 rounded-xl border p-4 ${
                  isCorrect
                    ? 'border-green-500/30 bg-green-500/10'
                    : 'border-red-500/30 bg-red-500/10'
                }`}
                role="alert"
              >
                <p className={`mb-2 font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite — try again'}
                </p>
                <p className="text-sm text-muted">{question.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex justify-end gap-3">
            {!checked ? (
              <motion.button
                type="button"
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Check your selected answer"
              >
                Check Answer
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={isCorrect ? 'btn-primary' : 'btn-secondary'}
                aria-label={isCorrect ? (isLastQuestion ? 'Complete quiz' : 'Go to next question') : 'Try again'}
              >
                {isCorrect ? (isLastQuestion ? 'Complete Quiz' : 'Next Question') : 'Try Again'}
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
