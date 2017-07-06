//使用帮助
app.factory('usageService', ['dataExchange', function(dataExchange) {
    return {
        //获取在线援助列表
        loadData: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Article' }, {
                data: data.filter,
                params: {
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getUserList: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/User' }, {
                data: {

                },
                params: {
                    pageNumbe: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //获取记录
        getRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Article' }, {
                data: {
                },
                params: {
                    id: data.id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //新增记录
        postRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Article' }, {
                data: {
                    Category: $scope.selected.usage.Id,
                    Title: $scope.model.Title,
                    Content: data.Content,
                    DisplayNo: data.DisplayNo
                },
                params: {

                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //修改记录(新增站内信)
        putRecord: function($scope, data, fun) {
            debugger
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Article' }, {
                data: data,
                params: {

                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //删除
        delete: function($scope, data, fun) {
            dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/Article' }, {
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
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Article' }, {
                data: {

                },
                params: {
                    id: data.id,
                    operate: data.operate
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        postCommonCategory: function($scope, data, fun) { //新增使用帮助通用分类
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/CommonCategory' }, {
                data: data.commonCategoryPost,
                params: {
                    operate: data.operate
                }
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);
