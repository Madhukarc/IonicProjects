angular.module('starter.controllers', ['timer'])

    .controller('GameController', function ($scope, $timeout) {
       $scope.counter = 15;
       $scope.number1 = Math.floor((Math.random() * 10) + 1);
       $scope.number2 = Math.floor((Math.random() * 10) + 2);
       $scope.puzzleData = {};
       $scope.result = false;
       $scope.showval = false;
       $scope.showPuzzle = true;
       $scope.showval1 = false;
       $scope.timeout = false;
       var mytimeout = null; // the current timeoutID
       $scope.solvecount = 0;
       $scope.timerRunning = true;
       $scope.finalMessage = "";
       $scope.onTimeout = function () {
           if ($scope.counter === 0) {
               $scope.$broadcast('timer-stopped', 0);
               $timeout.cancel(mytimeout);
               return;
           }
           $scope.counter--;
           mytimeout = $timeout($scope.onTimeout, 1000);
       };

       $scope.startTimer = function () {
           mytimeout = $timeout($scope.onTimeout, 1000);
           $scope.timerRunning = true;
       };

       // stops and resets the current timer
       $scope.stopTimer = function () {
           $scope.$broadcast('timer-stopped', $scope.counter);

           $timeout.cancel(mytimeout);
           $scope.timerRunning = false;
       };
       // stops and resets the current timer
       $scope.resetGame = function () {
           $scope.$broadcast('timer-stopped', $scope.counter);
           $scope.counter = 15;
           $timeout.cancel(mytimeout);
           $scope.timerRunning = false;
           $scope.showPuzzle = true;
           $scope.reset();
           $scope.solvecount = 0;
           $scope.startTimer();
       };

       $scope.validate = function () {
           var value1 = $scope.puzzleData.sumresult;
           var value2 = $scope.number1 + $scope.number2;
           if (value1 == value2) {
               $scope.result = true;
               $scope.showval = false
               $scope.reset();
               $scope.solvecount = $scope.solvecount + 1;
           }
           else { $scope.result = false; $scope.showval =true}
       };

       $scope.reset = function () {
           $scope.number1 = Math.floor((Math.random() * 10) + 1);
           $scope.number2 = Math.floor((Math.random() * 10) + 2);
           $scope.puzzleData.sumresult = "";
           
       };

       // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
       $scope.$on('timer-stopped', function (event, remaining) {
           if (remaining === 0) {
               $scope.showPuzzle = false;
               $scope.showval = false;
               $scope.result = false;
               $scope.timeout = true;
               $scope.showval1 = true;
               
           }
       });
   })

;

