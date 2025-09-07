import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Award,
} from 'lucide-react';
import { formatTime } from '../utils';

const QuizScreen = ({
  quizData,
  currentQuestion,
  answers,
  selectedQuiz,
  timeElapsed,
  goHome,
  selectAnswer,
  nextQuestion,
  prevQuestion,
  finishQuiz,
  setCurrentQuestion,
}) => {
  const question = quizData.questions[currentQuestion] || [];
  const isAnswered = answers[currentQuestion] !== undefined;
  const isLastQuestion = currentQuestion === quizData.questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={goHome}
              className="text-gray-400 hover:text-white transition-colors mr-4"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">{selectedQuiz.title}</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-gray-300">
              <Clock className="w-4 h-4 mr-2" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
            <div className="text-gray-300">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 px-6 py-2">
        <div className="max-w-4xl mx-auto">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentQuestion + 1) / quizData.questions.length * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                {currentQuestion + 1}
              </div>
              <div className="ml-4 flex-1">
                <div className="text-sm text-gray-400 mb-1">
                  Question {currentQuestion + 1}
                </div>
                <h2
                  className="text-xl font-medium leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: question.question }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {['option_a', 'option_b', 'option_c', 'option_d'].map(optionKey => {
              const optionValue = question[optionKey];
              const optionLetter = optionKey.split('_')[1].toUpperCase();
              const isSelected = answers[currentQuestion] === optionLetter;

              return (
                <button
                  key={optionKey}
                  onClick={() => selectAnswer(currentQuestion, optionLetter)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                      : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium mr-4 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-500'
                      }`}
                    >
                      {isSelected && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: optionValue }} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentQuestion === 0
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={finishQuiz}
                disabled={!isAnswered}
                className={`flex items-center px-8 py-3 rounded-lg font-medium transition-colors ${
                  isAnswered
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4 mr-2" />
                Finish Quiz
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={!isAnswered}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  isAnswered
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>

          {!isAnswered && (
            <div className="flex items-center justify-center mt-4 text-amber-400">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Please select an answer to continue
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Question Navigation Dots */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
          <div className="flex space-x-2">
            {quizData.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-500'
                    : answers[index] !== undefined
                    ? 'bg-green-500'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
