app.controller('loginCtrl', ['$scope', '$state', 'loginService', '$cookieStore', function($scope, $state, loginService, $cookieStore) {
    $scope.ss = $cookieStore;
    $scope.event = {
        //登录
        login: function(evt) {
            loginService.login($scope, $scope.model, function(data) {
                if (data.ResultCode !== 0) {//0失败 1成功
                    $state.go("admin.advert");
                }
            })
        }
    }
}])
