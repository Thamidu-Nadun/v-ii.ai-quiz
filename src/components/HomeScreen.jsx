import React from 'react';
import {
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import quizzes from '../quizzes';

const HomeScreen = ({ startQuiz }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              QuizMaster
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Test your knowledge and track your progress
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20 cursor-pointer group"
              onClick={() => startQuiz(quiz)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {quiz.title}
              </h3>
              <p className="text-gray-400 text-sm">
                Click to start this quiz
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
