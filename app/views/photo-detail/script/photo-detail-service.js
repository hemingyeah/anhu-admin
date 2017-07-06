//图片检测详情
app.factory('photoDetailService', ['dataExchange', function(dataExchange) {
    return {
        //获取图片检测详情列表
        getWordDetail: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/DetectDetail' }, {
                data: {

                },
                params: {
                    detect: data.id,
                    pageNumber: data.pageNum,
                    pageSize: data.pageSize
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //根据id获取图片检测详情
        getDetailById: function($scope, data, fun) {
            dataExchange.loadData({ type: 'GET', url: appConfig.interface + '/api/Detect' }, {
                data: {

                },
                params: {
                    id: data.id
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        banAll: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/DetectDetail' }, {
                data: data.DetectDetails,
                params: {
                    detectId: data.detectId
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //未确认
        notConfirm: function($scope,data,fun) {
            dataExchange.loadData({type:'PUT',url:appConfig.interface+'/api/DetectDetail'},{
                data:{

                },
                params:{
                    id:data.id,
                    ban:data.ban
                }
            },function(data){
                if(fun) fun(data);
            })
        },
        //确认违禁
        confirmBan: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/DetectDetail' }, {
                data: data,
                params: {
                }
            }, function(data) {
                if (fun) fun(data);
            })
        },
        //确认非违禁
        confirmNotBan: function($scope, data, fun) {
            dataExchange.loadData({ type: 'PUT', url: appConfig.interface + '/api/DetectDetail' }, {
                data: data,
                params: {
                }
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);
