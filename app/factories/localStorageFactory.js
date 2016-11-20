(function() {
    'use strict';
    angular.module('toDoApp').factory('app.factory.localStorageStore', ['$q', function($q) {
        'use strict';
        var _service, _todos, _getFromLocalStorage, _saveToLocalStorage, _clearCompleted, _delete, _get, _insert, _put, _searchList, _getSearchList, _insertSearch;
        var TODO_STORAGE_ID = 'toDoApp.toDoList';
        var SEARCH_STORAGE_ID = "ToDoApp.searchList";


        _todos = [];
        _searchList = [];

        _getFromLocalStorage = function(storageId) {
            if (angular.isDefined(storageId))
                return JSON.parse(localStorage.getItem(storageId) || '[]');
            else
                return JSON.parse(localStorage.getItem(TODO_STORAGE_ID) || '[]');
        };

        _saveToLocalStorage = function(todos, storageId) {
            if (angular.isDefined(storageId))
                localStorage.setItem(storageId, JSON.stringify(todos));
            else
                localStorage.setItem(TODO_STORAGE_ID, JSON.stringify(todos));
        };

        _clearCompleted = function() {
                var deferred = $q.defer();

                var incompleteTodos = _todos.filter(function(todo) {
                    return !todo.completed;
                });

                angular.copy(incompleteTodos, _todos);

                _saveToLocalStorage(_todos);
                deferred.resolve(_todos);

                return deferred.promise;
            },

            _delete = function(todo) {
                var deferred = $q.defer();

                _todos.splice(_todos.indexOf(todo), 1);

                _saveToLocalStorage(_todos);
                deferred.resolve(_todos);

                return deferred.promise;
            };

        _get = function() {
            var deferred = $q.defer();

            angular.copy(_getFromLocalStorage(), _todos);
            deferred.resolve(_todos);

            return deferred.promise;
        };

        _getSearchList = function() {
            var deferred = $q.defer();

            angular.copy(_getFromLocalStorage(SEARCH_STORAGE_ID), _searchList);
            deferred.resolve(_searchList);

            return deferred.promise;
        };

        _insert = function(todo) {
            var deferred = $q.defer();

            _todos.push(todo);

            _saveToLocalStorage(_todos);
            deferred.resolve(_todos);

            return deferred.promise;
        };

        _insertSearch = function(search) {
            var deferred = $q.defer();

            _searchList.push(search);

            _saveToLocalStorage(_searchList, SEARCH_STORAGE_ID);
            deferred.resolve(_searchList);

            return deferred.promise;
        };

        _put = function(todo, index) {
            var deferred = $q.defer();

            _todos[index] = todo;

            _saveToLocalStorage(_todos);
            deferred.resolve(_todos);

            return deferred.promise;
        };



        _service = {

            todos: _todos,
            searchList: _searchList,
            clearCompleted: _clearCompleted,
            delete: _delete,
            get: _get,
            insert: _insert,
            put: _put,
            getSearchList: _getSearchList,
            insertSearch: _insertSearch
        }


        return _service;
    }]);


}());