//在线援助
app.factory('limitedWordService', ['dataExchange', function(dataExchange) {
    return {
        //获取极限词列表
        loadData: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Keyword/GetKeywordsList' }, {
                data: data.filter || {},
                params: {
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        postRecord: function($scope, data, fun) { //新增极限词
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Keyword' }, {
                data: data,
                params: {}
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //修改记录(新增站内信)
        putRecord: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Keyword' }, {
                data: data,
                params: {}
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getRecord: function($scope, data, fun) { //获取极限词信息
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Keyword' }, {
                data: {},
                params: {
                    id: data.Id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        delete: function($scope, data, fun) { //删除极限词
            dataExchange.loadData({ type: 'DELETE', url: appConfig.interface + '/api/Keyword' }, {
                data: {},
                params: {
                    id: data.Id,
                    isValid: false
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        lawCategoryReview: function($scope, data, fun) { //审核极限词
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Keyword/ExaminantKeyword' }, {
                data: data,
                params: {}
            }, function(data) {
                if (fun) fun(data);
            })
        },
        getLawItemList: function($scope, data, fun) { //获取法律规则
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/LawItem/GetLawItemList' }, {
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
        getCaseList: function($scope, data, fun) { //获取案例列表
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/Case/GetCaseList' }, {
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
        uploadFile: function($scope, data, fun) {//文件上传（批量上传）
            dataExchange.loadData({ type: 'POST', url: appConfig.interface + '/api/Keyword/PostKeywordFile' }, {
                data: {},
                params: {
                    filePath: data.filePath
                }
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);
