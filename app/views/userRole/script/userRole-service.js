app.factory('userRoleService', ['dataExchange', function(dataExchange) {
    return {
        //客户角色
        loadData: function($scope, data, fun) {
            if ($scope.query) {
                params = {
                    isRoleUser: 1, //是否获取角色详细信息
                    name: $scope.query.name,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            } else {
                params = {
                    isRoleUser: 1, //是否获取角色详细信息
                    category: '0302',
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Role' }, {
                data: {},
                params: params
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //删除
        delete: function($scope, data, fun) {
            dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/Role' }, {
                data: {},
                params: {
                    id: data.Id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        putRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Role' }, {
                data: data,
                params: {}
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Role' }, {
                data: {},
                params: {
                    id: data.id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        postRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Role' }, {
                data: data,
                params: {}
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //获取权限列表
        getPermission: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Permission' }, {
                data: {},
                params: {
                    category: data.category,
                    parentId: data.parentId
                }
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);
