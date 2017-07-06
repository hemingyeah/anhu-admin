//详细法律条文库
app.factory('lawCaseService', ['dataExchange',
    function(dataExchange) {
        return {
            loadData: function($scope, data, fun) {
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Case/GetCaseList' }, {
                    data: data.filter || {},
                    params: {
                        pageNumber: data.pageNum,
                        pageSize: data.pageSize
                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            //获取记录
            getRecord: function($scope, data, fun) {
                dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Case' }, {
                    data: {},
                    params: {
                        id: data.Id
                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            //新增案例
            postRecord: function($scope, data, fun) {
                dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Case' }, {
                    data: data,
                    params: {

                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            //修改案例信息
            putRecord: function($scope, data, fun) {
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Case' }, {
                    data: data,
                    params: {

                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            //删除
            delete: function($scope, data, fun) {
                dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/Case' }, {
                    data: {},
                    params: {
                        id: data.Id
                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            caseReview: function($scope, data, fun) { //审核案例
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Case/ExaminantCase' }, {
                    data: data,
                    params: {}
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            loadLaw: function($scope, data, fun) { //法律规则
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/LawItem/GetLawItemList' }, {
                    data: {},
                    params: {
                        pageNumber: data.pageNum,
                        pageSize: data.pageSize
                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            uploadFile: function($scope, data, fun) { //批量上传
                dataExchange.loadData({ type: '', url: appConfig.interface + '' }, {
                    data: {},
                    params: {
                        filePath: data.filePath
                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            }
        };
    }
]);
