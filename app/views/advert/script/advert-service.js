//检索维权管理
app.factory('advertService', ['dataExchange', function(dataExchange) {
    return {
        //获取文字检测列表
        loadData: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Advert' }, {
                data: {

                },
                params: {
                    name: data.name,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //新增记录(新增广告)
        postRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Advert' }, {
                data: {
                    Name: data.name,
                    TargetUrl: data.targetUrl,
                    Content: $scope.files[0].picUrl,
                    Format: $scope.selected.attachType.Id,
                    FormatName: $scope.selected.attachType.Name
                },
                params: {

                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //新增记录(新增广告)
        delete: function($scope, data, fun) {
            dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/Advert' }, {
                data: {

                },
                params: {
                    id: data.id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        updateStatus: function ($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Advert' }, {
                data: {

                },
                params: {
                    id: data.id,
                    isValid: data.isValid
                }
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);
