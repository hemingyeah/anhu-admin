/**
 * http服务封装
 * 
 * 前端请求数据
 * 
 * get:
 * httpService.ajax({
 * type:"get",
 * url:"api/getData",
 * data:{}
 * });
 * 
 * post:
 * httpService.ajax({
 * type:"post",
 * url:"api/updateData",
 * data:{}
 * });
 *   
 * 后端返回对象
 * {
 * data:{},//响应结果
 * success: true,
 * errorCode:400,//响应码
 * errorMsg:""//响应信息
 * }
 */

app.factory('httpService', ['$http', '$state', 'loading', 'service', '$cookieStore', '$resource', '$q',

    function($http, $state, loading, service, $cookieStore, $resource, $q) {
        var obj = {};
        loading = loading;
        var requestData = function() {
            return {
                contentType: "application/json",
                dataType: "json",
                type: "get",
                url: false,
                data: false
            };
        };

        //返回结果处理
        var responseHandle = function(data, fun) {

            // if (fun) {
            //     fun(data);
            //     return; //暂时先返回 后续需要验证时再处理
            // }
            //403 无权限 跳转到登录页面
            if (data.code == 403) {
                $state.go("login");
            } else if (data.code == 100) {
                toaster.pop('warning', '', data.msg);
            } else {
                fun(data);
            }
        };
        /**
         * [ajaxBoth url和body都有参数用此方法]
         * @param  {[type]} req [description]
         * @return {[type]}     [description]
         */
        obj.ajaxBoth = function(req) {
            req = $.extend(requestData(), req);
            loading.show();

            return $http({
                method: req.type,
                url: req.url,
                responseType: req.dataType,
                timeout: 5000,
                headers: {
                    "Content-Type": "application/json",
                    // "Authenticate": service.cookie.get("token")
                },
                params: "get,delete".indexOf(req.type.toLowerCase()) > -1 ? req.data : {},
                data: "post,put".indexOf(req.type.toLowerCase()) > -1 ? req.data : {}

            }).success(function(response) {
                loading.hide();
            }).error(function(response) {
                loading.hide();
            });
        };

        // $scope.data = {};
        // checkStatus.query(function(response) {
        //     alert(response.headers);
        //     angular.forEach(response, function (item) {
        //          alert("resp2"+ item);
        //      });
        //   $scope.data.resp = response;


        /**
         * [ajax 根据参数类型自动把参数分类于url和body里]
         * 参数类型｛data:{},param:{}｝
         */
        obj.ajax = function(req) {
            req = $.extend(requestData(), req);
            loading.show();
            return $http({
                method: req.type,
                url: req.url,
                responseType: req.dataType,
                // timeout: 5000,
                headers: {
                    "Content-Type": "application/json",
                    // "token": $cookieStore.get("token")z
                    "token": service.cookie.get("token")
                        // "Authenticate": service.cookie.get("token")
                },
                params: req.data.params,
                data: req.data.data

            }).success(function(response, status, headers, config) {
                loading.hide();
                // $cookieStore.put("token", headers("token"));
                if (headers("token")) {
                    service.cookie.set("token", headers("token"));
                }

            }).error(function(response) {
                loading.hide();
            });
        };

        //通过jquery发送请求
        obj.ajaxSend = function(req) {

            //设置headers
            var token = app.caches.getItem("token");
            var userId = app.caches.getItem("userId");
            var timeStamp = new Date().Format("yyyy-MM-dd hh:mm:ss");
            // var sign = md5.createHash(token + timeStamp + "web" + userId).toUpperCase();

            loading.show();
            req = $.extend({

                contentType: "application/json",

                headers: {
                    "m": "web",
                    "v": app.caches.getItem('version'),
                    "t": timeStamp,
                    "token": token,
                    "sign": sign
                }
            }, req);

            var dtd = $.Deferred();

            $.ajax(req)
                .done(function(response) {
                    loading.hide();
                    //若将dataType设为json 序列化会出现精度丢失问题
                    //因此在这里进行序列化
                    dtd.resolve(JSON.parse(response));
                })
                .fail(function(response) {
                    loading.hide();
                    dtd.reject(response);
                });

            return dtd.promise();
        }

        obj.responseHandle = function(data, fun) {

            responseHandle(data, fun);
        };

        return obj;

    }
]);
