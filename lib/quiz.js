/**
 * Fisher-Yates shuffle for quiz options so the correct answer isn't always option A.
 */
export function shuffleQuizQuestions(questions) {
  if (!questions?.length) return [];

  return questions.map((question) => {
    const indices = question.options.map((_, i) => i);

    for (let i = indices.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const shuffledOptions = indices.map((i) => question.options[i]);
    const shuffledCorrectIndex = indices.indexOf(question.correctIndex);

    return {
      ...question,
      options: shuffledOptions,
      correctIndex: shuffledCorrectIndex,
    };
  });
}
