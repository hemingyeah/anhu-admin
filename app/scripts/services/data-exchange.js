//调用底层httpService.ajax,按调用类型封装ajax方法(eg: loadData, save...)
app.factory('dataExchange', ['httpService', function(httpService) {
    var obj = {
        loadData: function(route, param, fun) {
            httpService.ajax({
                    type: route.type,
                    url: route.url,
                    data: param
                })
                .success(function(data) {
                    httpService.responseHandle(data, function(data) {
                        if (fun) fun(data);
                    });
                });
        }
    }
    return obj;
}]);
app.factory('loading', [function() {
    var ajaxCount = 0;

    var loading = {
        show: function() {
            ajaxCount++;
            $(".loading").css("display", "block");
        },
        hide: function() {
            ajaxCount--;
            if (ajaxCount === 0) {
                $(".loading").css("display", "none");
            }
        }
    };
    return loading;
}]);
app.factory('service', [function() {
    var obj = {
        cookie: {
            get: function(key) {
                return sessionStorage.getItem(key);
            },
            set: function(key, value) {
                sessionStorage.setItem(key, value);
            }
        },
        roles: undefined
    }
    return obj;
}]);
app.service("BusinessData", [function() {
    var businessData = [{
        id: 1,
        serviceId: 1,
        name: 'World Center Garage',
        distance: 0.1,
        rating: 4
    }];

    return {
        getAllBusinesses: function() {
            return businessData;
        },

        getSelectedBusiness: function(serviceId) {
            var businessList = [];
            serviceId = parseInt(serviceId);
            for (i = 0; i < businessData.length; i++) {
                if (businessData[i].serviceId === serviceId) {
                    businessList.push(businessData[i]);
                }
            }
            return businessList;
        }
    }
}])
