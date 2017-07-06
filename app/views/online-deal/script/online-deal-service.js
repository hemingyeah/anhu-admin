//在线援助
app.factory('onlineDealService', ['dataExchange', function(dataExchange) {
    return {
        //获取在线援助列表
        loadData: function($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/WorkTopic' }, {
                data: data.filter,
                params: {
                    feedBackRoHelp: 0, //在线援助
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //获取工单回复列表
        getWorkPosts: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/WorkPost' }, {
                data: {},
                params: {
                    topic: data.id,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //获取记录
        getRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/WorkTopic' }, {
                data: {

                },
                params: {
                    id: data.id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //新增记录(新增工单回复)
        postRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/WorkPost' }, {
                data: {
                    Topic: data.topicId,
                    Title: data.title,
                    Content: data.content,
                    Urls: data.urls
                },
                params: {

                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //关闭工单
        putRecord: function($scope, data, fun) {
            debugger
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/WorkTopic' }, {
                data: {
                    // id: data.id,
                    // score: data.score,
                },
                params: {
                    id: data.id,
                    score: data.score,
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //删除
        delete: function($scope, data, fun) {
            dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/WorkPost' }, {
                data: {

                },
                params: {
                    id: data.id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        updateStatus: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/WorkPost' }, {
                data: {

                },
                params: {
                    id: data.id,
                    operate: data.operate
                }
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);
