app.factory('photoTestService', ['dataExchange', function(dataExchange) {
    return {
        //获取图片检测列表
        loadData: function($scope, data, fun) {
            var params = undefined;
            if (data.query) {
                params = {
                    category: data.category,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize,
                    imageName: data.query.imageName,
                    sorting: data.query.sorting
                }
            } else {
                params = {
                    category: data.category,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Detect' }, {
                data: {

                },
                params: params
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
    }
}])
