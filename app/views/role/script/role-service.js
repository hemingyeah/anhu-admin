//检索维权管理
app.factory('roleService', ['dataExchange', function(dataExchange) {
    return {
        //获取角色列表
        loadData: function($scope, data, fun) {
            var params;
            if (data.filter) {
                params = {
                    name: data.filter.EmployeeName,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            } else {
                params = {
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
        postRecord: function($scope, data, fun) { //新增角色
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Role' }, {
                data: data,
                params: {}
            }, function(data) {
                if (fun) fun(data);
            })
        },
        putRecord: function($scope, data, fun) { //修改角色信息
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Role' }, {
                data: data,
                params: {}
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getRecord: function($scope, data, fun) { //获取角色信息
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Role' }, {
                data: {},
                params: {
                    id: data.id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        delete: function($scope, data, fun) { //删除角色
            dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/Role' }, {
                data: {},
                params: {
                    id: data.Id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getPermission: function($scope, data, fun) { //获取角色权限
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
