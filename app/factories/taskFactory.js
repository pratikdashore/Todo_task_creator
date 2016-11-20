(function () {
    angular.module('toDoApp').factory('app.factory.taskStore', [
        '$http',
        '$injector',
        function ($http, $injector) {
            var _service, _getHttp;

            _getHttp = function () {
                return $http.get('/api')
                    .then(function () {
                        return $injector.get('app.factory.webApiStore');
                    }, function () {
                        return $injector.get('app.factory.localStorageStore');
                    });
            };
            _service = {
                getHttpPromise : _getHttp,
                name: 'Pratik'
            };
            
            return _service;
        }]);

} ());