//意见反馈
app.factory('feedbackService', ['dataExchange', function(dataExchange) {
    return {
        //获取意见反馈列表
        loadData: function ($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/WorkTopic' }, {
                data: data.filter,
                params: {
                    feedBackRoHelp: 1, //意见反馈
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //获取记录
        getRecord: function ($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/WorkTopic' }, {
                data: {},
                params: {
                    id: data.id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //新增记录(新增站内信)
        postRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/WorkTopic' }, {
                data: {
                    CategoryId: $scope.selected.messageType.id,
                    CategoryName: $scope.selected.messageType.name,
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
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/WorkTopic' }, {
                data: {
                    Id: $scope.model.Id,
                    CategoryId: $scope.selected.messageType.id,
                    CategoryName: $scope.selected.messageType.name,
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
            dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/WorkTopic' }, {
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
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/WorkTopic' }, {
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