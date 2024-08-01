var app = angular.module('quizApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'welcome.html',
            controller: 'WelcomeController'
        })
        .when('/quiz', {
            templateUrl: 'quiz.html',
            controller: 'QuizController'
        })
        .when('/result', {
            templateUrl: 'result.html',
            controller: 'ResultController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('WelcomeController', ['$scope', '$location', function($scope, $location) {
    $scope.startQuiz = function() {
        $location.path('/quiz');
    };
}]);

app.controller('QuizController', ['$scope', '$location', 'quizService', function($scope, $location, quizService) {
    $scope.quizQuestions = [
        {
            text: 'Who was the first Prime Minister of India',
            options: ['Lal Bahadur Shashtri', 'Sardar Patel', 'Mahatma Gandhi', 'Jawaharlal Nehru'],
            correctAnswer: 'Jawaharlal Nehru '
        },
        {
            text: 'What is the capital of India?',
            options: ['Delhi', 'Mumbai', 'Jaipur', 'Kochi'],
            correctAnswer: 'Delhi'
        },
        {
            text: 'What is the smallest prime number?',
            options: ['0', '1', '2', '3'],
            correctAnswer: '2'
        },
        {
            text: 'Which among these is not a even number?',
            options: ['0', '1', '2', '3'],
            correctAnswer: '1'
        },
        {
            text: 'Which city is the financial capital of India',
            options: ['Delhi', 'Mumbai', 'Jaipur', 'Kochi'],
            correctAnswer: 'Mumbai'
        }
    ];

    $scope.submitQuiz = function() {
        var score = 0;
        for (var i = 0; i < $scope.quizQuestions.length; i++) {
            if ($scope.quizQuestions[i].userAnswer === $scope.quizQuestions[i].correctAnswer) {
                score++;
            }
        }
        quizService.setScore(score);
        $location.path('/result');
    };
}]);

app.controller('ResultController', ['$scope', 'quizService', function($scope, quizService) {
    $scope.score = quizService.getScore();
    $scope.totalQuestions = quizService.getTotalQuestions();
}]);

app.factory('quizService', function() {
    var score = 0;
    var totalQuestions = 5;

    return {
        setScore: function(s) {
            score = s;
        },
        getScore: function() {
            return score;
        },
        getTotalQuestions: function() {
            return totalQuestions;
        }
    };
});
