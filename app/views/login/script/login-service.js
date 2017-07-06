//登录
app.factory('loginService', ['dataExchange', 'service', function(dataExchange, service) {
    return {
        //登录
        login: function($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Authorization' }, {
                data: {
                    No: data.account,
                    Pwd: data.password,
                },
                params: {

                }
            }, function(data) {
                service.cookie.set("userName", $scope.app.userName = data.Data.No);
                service.cookie.set("userId", data.Data.Id);
                service.cookie.set("roles", JSON.stringify(data.Data.Roles));
                service.roles =  data.Data.Roles;
                if (fun) fun(data);
            })
        }
    };
}]);
