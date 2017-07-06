//法律类目库
app.factory('lawCategoryService', ['dataExchange',
    function(dataExchange) {
        return {
            loadData: function($scope, data, fun) {
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Law/GetLawList' }, {
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
                dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Law' }, {
                    data: {},
                    params: {
                        id: data.Id
                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            //新增记录(新增站内信)
            postRecord: function($scope, data, fun) {
                dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Law' }, {
                    data: data,
                    params: {

                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            //修改记录(新增站内信)
            putRecord: function($scope, data, fun) {
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Law' }, {
                    data: data,
                    params: {

                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            //删除
            delete: function($scope, data, fun) {
                dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/Law' }, {
                    data: {

                    },
                    params: {
                        id: data.Id
                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            updateStatus: function($scope, data, fun) {
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
            },
            lawCategoryReview: function($scope, data, fun) { //审核
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Law/ExaminantLaw' }, {
                    data: data,
                    params: {

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
