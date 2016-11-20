(function () {
    'use strict';

    angular.module('toDoApp').config(['$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('toDo',
                {
                    url: '/',
                    views: { 'navContainerView': { templateUrl: '/app/partials/nevigation.html' } }
                });
            $stateProvider.state('toDo.tasks',
                {
                    url: 'tasks',
                    views: { 'mainContainerView@': { templateUrl: '/app/partials/tasks.html' } }
                });
            $urlRouterProvider.otherwise('/');
        }
    ]);
} ());