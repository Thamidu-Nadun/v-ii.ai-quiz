export const fetchQuiz = quiz_path => {
  return fetch(quiz_path).then(response => response.json());
};
