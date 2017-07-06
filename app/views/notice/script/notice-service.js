//站内信
app.factory('noticeService', ['dataExchange', function(dataExchange) {
    return {
        //获取用户消息信息列表
        loadData: function ($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Message' }, {
                data: {

                },
                params: {
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getUserList: function ($scope, data, fun) {
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
        //新增记录(新增站内信)
        postRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Message' }, {
                data: {
                    CategoryId: $scope.selected.messageType.Id,
                    CategoryName: $scope.selected.messageType.Name,
                    Title: $scope.model.Title,
                    Content: $scope.model.Content,
                    Receivers: data
                },
                params: {

                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //修改记录(新增站内信)
        putRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Message' }, {
                data: {
                    Id: $scope.model.Id,
                    CategoryId: $scope.selected.messageType.Id,
                    CategoryName: $scope.selected.messageType.Name,
                    Title: $scope.model.Title,
                    Content: $scope.model.Content,
                    Receivers: data
                },
                params: {

                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //删除
        delete: function($scope, data, fun) {
            dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/Message' }, {
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
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Message' }, {
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

//新建站内信
app.factory('noticeUserService', ['dataExchange', function(dataExchange) {
    return {
        //获取用户列表
        loadData: function ($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/User' }, {
                data: {

                },
                params: {
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);

//新建站内信
app.factory('noticeRoleService', ['dataExchange', function(dataExchange) {
    return {
        //获取用户列表
        loadData: function ($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Role' }, {
                data: {

                },
                params: {
                    isValid: true,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);
