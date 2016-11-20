(function() {
    'use strict';
    angular.module('toDoApp').controller('app.controllers.taskController', [
        'app.factory.taskStore',
        function(taskStore) {
            var webApiPromise;
            var vm = this;
            vm.taskStoreLocal = taskStore;


            vm.toDoList = [];
            vm.newToDo = {};
            vm.show = "All";
            vm.currentShow = 0;
            vm.availablePriorities = [{ id: 1, name: 'Priority-1' }, { id: 2, name: 'Priority-2' }, { id: 3, name: 'Priority-3' }]

            function load() {
                vm.taskStoreLocal.getHttpPromise().then(function(promise) {
                    webApiPromise = promise;
                    promise.get().then(function(data) {
                        vm.toDoList = data;
                    });
                    promise.getSearchList().then(function(data) {
                        vm.searchList = data;
                    });


                });
            }
            load();

            vm.addTodo = function() {
                var newTodo = {
                    title: vm.newToDo.title.trim(),
                    tag: vm.newToDo.tag.trim(),
                    priority: vm.newToDo.priority,
                    dueDate: vm.newToDo.dueDate,
                    contexts: vm.newToDo.context,
                    projects: vm.newToDo.projects,
                    completed: false
                };

                if (!newTodo.title) {
                    return;
                }

                vm.saving = true;
                webApiPromise.insert(newTodo)
                    .then(function success() {
                        vm.newToDo = {};
                    })
                    .finally(function() {
                        vm.saving = false;
                    });
            };

            vm.addSearch = function() {

                if (angular.isUndefined(vm.todoSearch)) {
                    return;
                }

                var newSearch = {
                    keyword: vm.todoSearch.trim()
                };

                vm.saving = true;
                webApiPromise.insertSearch(newSearch)
                    .then(function success() {
                        vm.newSearch = {};
                    })
                    .finally(function() {
                        vm.saving = false;
                    });
            };

            vm.removeTodo = function(todo) {
                webApiPromise.delete(todo);
            };

            vm.saveTodo = function(todo) {
                webApiPromise.put(todo);
            };

            vm.clearCompletedTodos = function() {
                webApiPromise.clearCompleted();
            };

            vm.toggleCompleted = function(todo, completed) {
                if (angular.isDefined(completed)) {
                    todo.completed = completed;
                }
                webApiPromise.put(todo, vm.toDoList.indexOf(todo))
                    .then(function success() {}, function error() {
                        todo.completed = !todo.completed;
                    });
            };

            vm.markAll = function(completed) {
                vm.toDoList.forEach(function(todo) {
                    if (todo.completed !== completed) {
                        vm.toggleCompleted(todo, completed);
                    }
                });
            };

            vm.changeTodo = function(i) {
                vm.currentShow = i;
            };

            vm.showFn = function(todo) {
                if (vm.show === "All") {
                    return true;
                } else if (todo.completed && vm.show === "Complete") {
                    return true;
                } else if (!todo.completed && vm.show === "Incomplete") {
                    return true;
                } else {
                    return false;
                }
            };

            vm.showSearchResult = function(keyWord) {
                vm.todoSearch = keyWord;
                vm.currentShow = 0;
            };

        }
    ]);
}());