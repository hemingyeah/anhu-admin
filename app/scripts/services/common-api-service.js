//获取通用属性列表
app.factory('commonApiService', ['dataExchange', function(dataExchange) {
    return {
        //获取通用属性列表
        getCode: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Code' }, {
                data: {

                },
                params: {
                    category: data.category,
                    isValid: data.isValid,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getCommonCategoryById: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/CommonCategory' }, {
                data: {

                },
                params: {
                   category: data.id,
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //获取省市区
        getAreaById: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Area' }, {
                data: {},
                params: {
                    parentId: data.id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getUserList: function ($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Employee/GetEmployeeList' }, {
                data: {},
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
