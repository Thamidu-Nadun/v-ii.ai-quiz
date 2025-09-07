import React from 'react';
import { Award } from 'lucide-react';
import { formatTime } from '../utils';

const ResultsScreen = ({
  results,
  selectedQuiz,
  timeElapsed,
  goHome,
  startQuiz,
  reviewQuiz,
}) => {
  const getGradeColor = percentage => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-blue-400';
    if (percentage >= 70) return 'text-yellow-400';
    if (percentage >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Award className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-gray-400">{selectedQuiz.title}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">
                {results.score}
              </div>
              <div className="text-gray-400">Correct</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-300">
                {results.total}
              </div>
              <div className="text-gray-400">Total Questions</div>
            </div>
            <div>
              <div
                className={`text-3xl font-bold ${getGradeColor(
                  results.percentage
                )}`}
              >
                {results.percentage}%
              </div>
              <div className="text-gray-400">Score</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  results.percentage >= 90
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : results.percentage >= 70
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : results.percentage >= 60
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
                }`}
                style={{ width: `${results.percentage}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Time Taken</div>
              <div className="text-xl font-mono">
                {formatTime(timeElapsed)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={goHome}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => startQuiz(selectedQuiz)}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-colors"
          >
            Retake Quiz
          </button>
          <button
            onClick={reviewQuiz}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            Review Answers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
