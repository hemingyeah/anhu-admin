'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.page = {
                    autoPageSize: [{
                        name: '20',
                        id: 1
                    }, {
                        name: '20',
                        id: 2
                    }, {
                        name: '50',
                        id: 3
                    }],
                    noData: false,
                    pageNum: 1, //分页索引
                    pageSize: 50, //分页大小
                    maxSize: 10, //分页条最大显示数
                    selectedPageSize: {
                        name: 10,
                        id: 1
                    }
                };
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function($stateProvider, $urlRouterProvider, $httpProvider) {

                //http拦截器
                $httpProvider.interceptors.push('httpInterceptor');
                

                /**
                 * 动态定义路由
                 */
                $urlRouterProvider.otherwise(window.route[0].url);
                angular.forEach(window.route, function(obj) {
                    var route = {
                        url: obj.url,
                        state: obj.state,
                        href: obj.href,
                        abstract: obj.abstract,
                        controller: obj.controller,
                        title: obj.title,
                        templateUrl: obj.templateUrl,
                        resolve: obj.resolve,
                        parentState: obj.parentState || "",
                        params: obj.params,
                        ncyBreadcrumb: obj.ncyBreadcrumb
                    };

                    if (route.resolve && route.resolve.deps) {
                        var deps = route.resolve.deps;
                        route.resolve.deps = ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load(deps);
                        }];
                    }

                    $stateProvider.state(obj.state, route);
                });
            }
        ]
    );
