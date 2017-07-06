//文字检测
app.controller('wordTestCtrl', ['$scope', 'gridService', 'wordTestService', 'toaster', 'commonApiService',
    function($scope, gridService, wordTestService, toaster, commonApiService) {
        //点击事件
        $scope.event = {
            loadData: function() { //获取文字检测列表
                wordTestService.getTestList($scope, {
                    category: "1001",
                    pageNum: $scope.page.pageNum,
                    pageSize: $scope.page.pageSize
                }, function(data) {
                    if (data && data.ResultCode) {
                        if (data.Data.data) {
                            $scope.data = data.Data.data;
                            $scope.data.forEach(function(obj, index, arr) {
                                if (obj.score < 30) { //极度危险 （0 ~30）
                                    obj.isDanger = true;
                                } else if (obj.score < 60) { //危险（30~60）
                                    obj.isWarning = true;
                                } else if (obj.score < 90) { //潜在风险 （60~90）
                                    obj.isInfo = true;
                                } else if (obj.score < 100) { //安全 （90~100）
                                    obj.isSuccess = true;
                                } else { //非常安全 （100）
                                    obj.isSuccess = true;
                                }
                            })
                            $scope.page.total = data.Data.page.recordSum;
                            $scope.page.pages = Math.ceil($scope.page.total / $scope.page.pageSize)
                        } else {
                            $scope.page.total = 0;
                            $scope.page.pages = 1;

                        }
                    }
                })
            },
            clear: function() {
                $scope.query.no = undefined;
                $scope.query.createBeginTime = undefined;
                $scope.query.rank = undefined;
                $scope.query.userName = undefined;
                $scope.query.imageName = undefined;
                $scope.query.detectStatus = {};
                $scope.query.roleName = {};
                $scope.query.keywordCountMin = undefined;
                $scope.query.keywordCountMax = undefined;
                $scope.query.picContent = undefined;
                $scope.query.score = undefined;
                $scope.query.confirmCountMin = undefined;
                $scope.query.confirmCountMax = undefined;
            },
            search:function(){
                
            }
        };
        $scope.event.loadData();

        wordTestService.getRoles($scope, {
            isRoleUser: false
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.roles = data.Data.data;
            }
        })
        commonApiService.getCode($scope, { //获取检测状态
            category: "DetectStatus",
            isValid: true,
            pageNum: 1,
            pageSize: 20
        }, function(data) {
            $scope.detectStatus = data.Data.data;
            $scope.selected = {
                detectStatus: $scope.detectStatus[0]
            }
        })
    }
]);
