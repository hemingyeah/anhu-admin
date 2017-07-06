//检索维权管理
app.factory('userService', ['dataExchange', function(dataExchange) {
    return {
        //获取用户角色列表
        loadData: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Employee/GetEmployeeList' }, {
                data: data.filter || {},
                params: {
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getRecord: function($scope, data, fun) { //获取用户详细信息
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Employee' }, {
                data: {},
                params: {
                    id: data.Id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        postRecord: function($scope, data, fun) { //新增用户
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Employee' }, {
                data: data,
                params: {}
            }, function(data) {
                if (fun) fun(data);
            })
        },
        putRecord: function($scope, data, fun) { //编辑用户信息
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Employee' }, {
                data: data,
                params: {}
            }, function(data) {
                if (fun) fun(data);
            })
        },
        delete: function($scope, data, fun) { //删除
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Employee' }, {
                data: {},
                params: {
                    id: data.Id,
                    operate: 2
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getRoles: function($scope, data, fun) { //获取用户角色列表
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Role' }, {
                data: {

                },
                params: {
                    category: "0301",
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
    };
}]);
