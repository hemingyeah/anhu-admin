'use strict';

/* Controllers */

angular.module('app').controller('AppCtrl', ['$rootScope', '$scope', '$translate', '$localStorage', '$window', 'service', '$cookieStore',
    function($rootScope, $scope, $translate, $localStorage, $window, service, $cookieStore) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

        // config
        $scope.app = {
            name: '安乎',
            version: '1.3.3',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-dark',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-dark',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false,
                asideDock: false,
                container: false
            },
            userName: (function() {
                return service.cookie.get("userName")
            })(),
            usage: false,
            showSearchResult: false
        }

        // save settings to local storage
        if (angular.isDefined($localStorage.settings)) {
            $scope.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = $scope.app.settings;
        }
        $scope.$watch('app.settings', function() {
            if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                // aside dock and fixed must set the header fixed.
                $scope.app.settings.headerFixed = true;
            }
            // save to local storage
            $localStorage.settings = $scope.app.settings;
        }, true);

        // angular translate
        $scope.lang = { isopen: false };
        $scope.langs = { en: 'English', de_DE: 'German', it_IT: 'Italian' };
        $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
        $scope.setLang = function(langKey, $event) {
            // set the current lang
            $scope.selectLang = $scope.langs[langKey];
            // You can change the language during runtime
            $translate.use(langKey);
            $scope.lang.isopen = !$scope.lang.isopen;
        };

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        $scope.event = {
            searchProblems: function() {
                $scope.app.showSearchResult = !$scope.app.showSearchResult;
            }
        }

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                event.currentScope.curLocation = {
                    name: toState.title,
                    state: toState.state,
                    href: toState.href,
                    parentState: toState.parentState
                };
            })
        $rootScope.$on('$routeChangeStart', function(evt, next, current) {
            //$log.debug('>>>> $routeChangeStart');
            $('.pace .pace-progress').addClass('hide');
            $('.pace').removeClass('pace-inactive');
        });
    }
]);

//admin状态控制器
app.controller('adminCtrl', ['$scope', 'service', function($scope, service) {
    //菜单权限
    $scope.userMenus = [];
    // var data = service.roles[0].RolePermissions;
    var roles = JSON.parse(service.cookie.get("roles"));
    var data = roles[0].RolePermissions;
    data.forEach(function (obj, index, arr) {
        if (!obj.ParentId) {
            var children = data.filter(function (obj1, index1, arr1) {
                return obj1.ParentId === obj.PermissionId;
            });
            obj.child = children;
            $scope.userMenus.push(obj);
        }
    })
}])
