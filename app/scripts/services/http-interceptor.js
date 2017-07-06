/**
 * 
 * 请求及响应拦截中间件
 */

app.factory('httpInterceptor', ["$q", "$rootScope", '$window', 'service', 'toaster',

    function($q, $rootScope, $window, service, toaster) {

        return {
            "request": function(config) {

                config.headers = config.headers || {};
                // config.headers["token"] = service.token;
                // var token = app.caches.getItem("token");
                // var userId = app.caches.getItem('userId');
                // if (!!token) {
                //     var timeStamp = new Date().Format('yyyy-MM-dd hh:mm:ss');
                //     // config.headers["Content-Type"] = "application/json";
                //     config.headers["m"] = "web";
                //     config.headers["v"] = app.caches.getItem('version');
                //     config.headers["t"] = timeStamp;
                //     config.headers["token"] = token;
                //     //由token + t + m + userId 以编码utf-8获取md5，将md5字符串转成大写
                //     config.headers["sign"] = md5.createHash(token + timeStamp + 'web' + userId).toUpperCase();
                //     //console.log(config.headers["sign"]);
                // }
                return config;
            },
            'response': function(response) {
                if (response.config.method.toUpperCase() !=="GET") {
                    if (response.data.ResultCode) {
                        return response;
                    } else {
                        toaster.pop('warning', '', response.data.ResultMsg);
                        return response;
                    }
                }else {
                    return response;
                }

            },
            'responseError': function(response) {

                var data = response.data;
                var status = response.status;
                switch (status) {

                    case -1:
                        // toaster.pop('error', "", "后端服务返回错误");
                        break;
                    case 400:
                        // toaster.pop('error', "", "语法格式有误，服务器无法理解此请求");
                        break;
                    case 401:

                       window.location.href = "http://localhost:8088/#/login";
                       toaster.pop('warning', "", "请先登录");
                        break;
                    case 403:
                        // toaster.pop('warning', "", "登录超时,请先登录");
                        break;
                    case 404:
                        // toaster.pop('error', "", "请求地址不存在");
                        break;
                    case 500:
                        // toaster.pop('error', "", "服务器错误");
                        break;
                    default:
                        break;
                }
                // 判断错误码，如果是未登录
                /*
                if (data["errorCode"] == "503") {
                    // 清空用户本地token存储的信息
                    $rootScope.user = {
                        token: ""
                    };
                    // 全局事件，方便其他view获取该事件，并给以相应的提示或处理
                    $rootScope.$emit("userIntercepted", "notLogin", response);
                }
                // 如果是登录超时
                if (data["errorCode"] == "500998") {
                    $rootScope.$emit("userIntercepted", "sessionOut", response);
                }*/

                return $q.reject(response);
            }
        };
    }
]);
