import React, {useState, useEffect} from 'react';
// import quizzes from './quizzes';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import ReviewScreen from './components/ReviewScreen';
import {fetchQuiz} from './api';
import {calculateResults} from './utils';

const QuizApp = () => {
  const [currentView, setCurrentView] = useState ('home'); // 'home', 'quiz', 'results', 'review'
  const [selectedQuiz, setSelectedQuiz] = useState (null);
  const [quizData, setQuizData] = useState (null);
  const [currentQuestion, setCurrentQuestion] = useState (0);
  const [answers, setAnswers] = useState ({});
  const [timeElapsed, setTimeElapsed] = useState (0);
  const [quizStartTime, setQuizStartTime] = useState (null);

  // Timer effect
  useEffect (
    () => {
      let interval;
      if (currentView === 'quiz' && quizStartTime) {
        interval = setInterval (() => {
          setTimeElapsed (Math.floor ((Date.now () - quizStartTime) / 1000));
        }, 1000);
      }
      return () => clearInterval (interval);
    },
    [currentView, quizStartTime]
  );

  const startQuiz = async quiz => {
    setSelectedQuiz (quiz);
    const data = await fetchQuiz (quiz.path);
    setQuizData (data);
    setCurrentQuestion (0);
    setAnswers ({});
    setTimeElapsed (0);
    setQuizStartTime (Date.now ());
    setCurrentView ('quiz');
  };

  const selectAnswer = (questionIndex, answer) => {
    setAnswers (prev => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion (prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion (prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    setCurrentView ('results');
  };

  const reviewQuiz = () => {
    setCurrentQuestion (0);
    setCurrentView ('review');
  };

  const goHome = () => {
    setCurrentView ('home');
    setSelectedQuiz (null);
    setQuizData (null);
    setCurrentQuestion (0);
    setAnswers ({});
    setTimeElapsed (0);
    setQuizStartTime (null);
  };

  if (currentView === 'home') {
    return <HomeScreen startQuiz={startQuiz} />;
  }

  if (currentView === 'quiz' && quizData) {
    return (
      <QuizScreen
        quizData={quizData}
        currentQuestion={currentQuestion}
        answers={answers}
        selectedQuiz={selectedQuiz}
        timeElapsed={timeElapsed}
        goHome={goHome}
        selectAnswer={selectAnswer}
        nextQuestion={nextQuestion}
        prevQuestion={prevQuestion}
        finishQuiz={finishQuiz}
        setCurrentQuestion={setCurrentQuestion}
      />
    );
  }

  if (currentView === 'results') {
    const results = calculateResults (quizData, answers);
    return (
      <ResultsScreen
        results={results}
        selectedQuiz={selectedQuiz}
        timeElapsed={timeElapsed}
        goHome={goHome}
        startQuiz={startQuiz}
        reviewQuiz={reviewQuiz}
      />
    );
  }

  if (currentView === 'review' && quizData) {
    return (
      <ReviewScreen
        quizData={quizData}
        currentQuestion={currentQuestion}
        answers={answers}
        selectedQuiz={selectedQuiz}
        goHome={goHome}
        nextQuestion={nextQuestion}
        prevQuestion={prevQuestion}
      />
    );
  }

  return null;
};

export default QuizApp;
