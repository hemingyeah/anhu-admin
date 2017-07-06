//详细法律条文库
app.factory('lawLetterService', ['dataExchange',
    function(dataExchange) {
        return {
            //获取在线援助列表
            loadData: function($scope, data, fun) {
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/LawItem/GetLawItemList' }, {
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
                dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/LawItem' }, {
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
                dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/LawItem' }, {
                    data: data,
                    params: {

                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            //修改记录(新增站内信)
            putRecord: function($scope, data, fun) {
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/LawItem' }, {
                    data: data,
                    params: {

                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            //删除
            delete: function($scope, data, fun) {
                dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/LawItem' }, {
                    data: {

                    },
                    params: {
                        id: data.Id
                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            lawLetterReview: function($scope, data, fun) { //审核
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/LawItem/ExaminantLawItem' }, {
                    data: data,
                    params: {

                    }
                }, function(data) {
                    if (fun) fun(data);
                })
            },
            getLawList: function($scope, data, fun) { //获取法律规则名称
                dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Law/GetLawList' }, {
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
