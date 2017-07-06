//文字检测详情
app.factory('wordDetailService', ['dataExchange', function(dataExchange) {
    return {
        //获取文字检测详情
        getWordDetail: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/DetectDetail' }, {
                data: {

                },
                params: {
                    detect: data.id,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //文字检测
        testWord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Detect' }, {
                data: {
                    Content: data.textContent
                },
                params: {

                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        banAll: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/DetectDetail' }, {
                data: data.DetectDetails,
                params: {
                    detectId: data.detectId
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //确认违禁
        confirmBan: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/DetectDetail' }, {
                data: data,
                params: {
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //确认非违禁
        confirmNotBan: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/DetectDetail' }, {
                data: data,
                params: {
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //根据id获取文字检测详情
        getDetailById: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Detect' }, {
                data: {

                },
                params: {
                    id: data.id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
    };
}]);
