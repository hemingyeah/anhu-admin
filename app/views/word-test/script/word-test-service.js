//文字检测
app.factory('wordTestService', ['dataExchange', function(dataExchange) {
    return {
        loadData: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: 'api/alipay.json' }, {}, function(data) {
                if (fun) fun(data);
            })
        },
        //文字检测
        testWord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Detect' }, {
                data: {
                    Content: data.testWord
                },
                params: {}
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //获取文字检测列表
        getTestList: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Detect' }, {
                data: {

                },
                params: {
                    category: data.category,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getRoles: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Role' }, {
                data: {

                },
                params: {
                    isRoleUser: data.isRoleUser,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);
