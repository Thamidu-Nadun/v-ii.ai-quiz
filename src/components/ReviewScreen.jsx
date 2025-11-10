import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const ReviewScreen = ({
  quizData,
  currentQuestion,
  answers,
  selectedQuiz,
  goHome,
  nextQuestion,
  prevQuestion,
}) => {
  const question = quizData.questions[currentQuestion];
  const userAnswer = answers[currentQuestion];
  const correctAnswer = question.correct_answer;
  const isLastQuestion = currentQuestion === quizData.questions.length - 1;

  // ctrl+arrow > -> next question
  // ctrl+arrow < -> previous question
  React.useEffect (
    () => {
      const handleKeyDown = e => {
        if (e.ctrlKey && e.key === 'ArrowRight') {
          if (!isLastQuestion) {
            nextQuestion ();
          }
        } else if (e.ctrlKey && e.key === 'ArrowLeft') {
          if (currentQuestion > 0) {
            prevQuestion ();
          }
        }
      };

      window.addEventListener ('keydown', handleKeyDown);
      return () => {
        window.removeEventListener ('keydown', handleKeyDown);
      };
    },
    [currentQuestion, isLastQuestion, nextQuestion, prevQuestion]
  );
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
            <h1 className="text-xl font-semibold">
              Review: {selectedQuiz.title}
            </h1>
          </div>
          <div className="text-gray-300">
            Question {currentQuestion + 1} of {quizData.questions.length}
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
                  dangerouslySetInnerHTML={{__html: question.question}}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {[
              'option_a',
              'option_b',
              'option_c',
              'option_d',
            ].map (optionKey => {
              const optionValue = question[optionKey];
              const optionLetter = optionKey.split ('_')[1].toUpperCase ();
              const isUserAnswer = userAnswer === optionLetter;
              const isCorrect = correctAnswer === optionLetter;

              let optionClasses = 'border-gray-600 bg-gray-700/50';
              let icon = null;

              if (isCorrect) {
                optionClasses = 'border-green-500 bg-green-500/10';
                icon = <CheckCircle className="w-4 h-4 text-green-500" />;
              } else if (isUserAnswer) {
                // user answer is wrong
                optionClasses = 'border-red-500 bg-red-500/10';
                icon = <AlertCircle className="w-4 h-4 text-red-500" />;
              }

              return (
                <div
                  key={optionKey}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${optionClasses}`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium mr-4`}
                    >
                      {icon}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: optionValue}} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mb-8">
            {question.explanation &&
              <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold mb-2">Explanation</h3>
                <p
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{__html: question.explanation}}
                />
              </div>}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${currentQuestion === 0 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {isLastQuestion
              ? <button
                  onClick={goHome}
                  className={`flex items-center px-8 py-3 rounded-lg font-medium transition-colors bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white`}
                >
                  Back to Home
                </button>
              : <button
                  onClick={nextQuestion}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white`}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewScreen;
