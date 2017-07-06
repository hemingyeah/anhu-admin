//检索维权管理
app.factory('informationService', ['dataExchange', function(dataExchange) {
    return {
        //获取文字检测列表
        loadData: function($scope, data, fun) {
            var params;
            if (data.filter) {
                params = {
                    userNickname: data.filter.name,
                    role: data.filter.roleId,
                    no: data.filter.no,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            } else {
                params = {
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/User' }, {
                data: {},
                params: params
            }, function(data) {
                if (data.Data.data && data.ResultCode) {
                    data.Data.data.forEach(function(obj, index, arr) {
                        if (obj.Roles) {
                            obj.RoleName = obj.Roles[0].Name;
                            obj.RoleId = obj.Roles[0].Id;
                        }
                    });
                }
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
        },
        getUsers: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/User' }, {
                data: {

                },
                params: {
                    userName: data.name,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        save: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/User' }, {
                data: data,
                params: {

                }
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);
