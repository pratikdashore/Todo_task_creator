(function () {
    'use strict';
    angular.module('toDoApp').factory('app.factory.webApiStore',
        ['$resource',
            function ($resource) {
                'use strict';

                var _service, _todos, _api, _clearCompleted, _delete, _get, _insert, _put;

                _todos = [];

                _api = $resource('/api/toDo/:id', null,
                    {
                        update: { method: 'PUT' }
                    }
                    );

                _clearCompleted = function () {
                    var originalTodos = _todos.slice(0);

                    var incompleteTodos = _todos.filter(function (todo) {
                        return !todo.completed;
                    });

                    angular.copy(incompleteTodos, _todos);

                    return _api.delete(function () {
                    }, function error() {
                        angular.copy(originalTodos, _todos);
                    });
                };

                _delete = function (todo) {
                    var originalTodos = _todos.slice(0);

                    _todos.splice(_todos.indexOf(todo), 1);
                    return _api.delete({ id: todo.id },
                        function () {
                        }, function error() {
                            angular.copy(originalTodos, _todos);
                        });
                };

                _get = function () {
                    return _api.query(function (resp) {
                        angular.copy(resp, _todos);
                    });
                };

                _insert = function (todo) {
                    var originalTodos = _todos.slice(0);

                    return _api.save(todo,
                        function success(resp) {
                            todo.id = resp.id;
                            _todos.push(todo);
                        }, function error() {
                            angular.copy(originalTodos, _todos);
                        })
                        .$promise;
                };

                _put = function (todo) {
                    return _api.update({ id: todo.id }, todo)
                        .$promise;
                };

                _service = {
                    todos: _todos,
                    clearCompleted: _clearCompleted,
                    delete: _delete,
                    get: _get,
                    insert: _insert,
                    put: _put
                }

                return _service;
            }]);
} ());