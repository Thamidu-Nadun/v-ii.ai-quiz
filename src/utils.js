export const formatTime = seconds => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const calculateResults = (quizData, answers) => {
  if (!quizData) return { score: 0, total: 0, percentage: 0 };

  let correct = 0;
  quizData.questions.forEach((question, index) => {
    if (answers[index] === question.correct_answer) {
      correct++;
    }
  });

  return {
    score: correct,
    total: quizData.questions.length,
    percentage: Math.round((correct / quizData.questions.length) * 100),
  };
};
