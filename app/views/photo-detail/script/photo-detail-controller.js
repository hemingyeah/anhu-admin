app.controller('photoDetailCtrl', ['$scope', 'gridService', 'photoDetailService', '$state', '$stateParams', 'toaster',
    function($scope, gridService, photoDetailService, $state, $stateParams, toaster) {
        var photoId = $stateParams.id;
        $scope.model = {
            textContent: $stateParams.content
        }
        $scope.event = {
            loadData: function() {
                photoDetailService.getWordDetail($scope, {
                    id: photoId,
                    pageNum: $scope.page.pageNum,
                    pageSize: $scope.page.pageSize
                }, function(data) {
                    if (data && data.ResultCode) {
                        if (data.Data.data) {
                            $scope.data = data.Data.data;
                            $scope.page.total = data.Data.page.recordSum;
                            $scope.page.pages = Math.ceil($scope.page.total / $scope.page.pageSize)
                        } else {
                            $scope.page.total = 0;
                            $scope.page.pages = 1;
                        }
                    }
                });
            },
            showBigImg: function(data) {
                window.open(data);
            },
            selectAll: function() { //全选
                if ($scope.selectAll) {
                    ($scope.data || []).forEach(function(obj, index, arr) {
                        obj.selected = true;
                    })
                } else {
                    ($scope.data || []).forEach(function(obj, index, arr) {
                        obj.selected = false;
                    })
                }

            },
            allBan: function(row) { //批量确认违禁
                var DetectDetails = [];
                var _this = this;
                ($scope.data || []).forEach(function(obj, index, arr) {
                    if (obj.selected) {
                        DetectDetails.push({
                            id: obj.id,
                            detect: obj.detect,
                            keyword: obj.keyword,
                            context: obj.context,
                            detectTime: obj.detectTime,
                            confirmTime: obj.confirmTime,
                            isBanned: 1,
                            weight: obj.weight,
                            firstCharIndex: obj.firstCharIndex,
                            name: obj.name,
                            banReason: obj.banReason,
                            relatedCase: obj.relatedCase
                        });
                    }
                })
                if (!DetectDetails.length) {
                    toaster.pop('success', '', "请勾选数据！");
                    return;
                }
                photoDetailService.banAll($scope, {
                    DetectDetails: DetectDetails,
                    detectId: photoId
                }, function(data) {
                    toaster.pop('success', '', data.ResultMsg);
                    $scope.event.loadData();
                    $scope.selectAll = false;
                    _this.getDetailById(); //刷新list
                })
            },
            allNotBan: function() { //批量确认非违禁
                var DetectDetails = [];
                var _this = this;
                ($scope.data || []).forEach(function(obj, index, arr) {
                    if (obj.selected) {
                        DetectDetails.push({
                            id: obj.id,
                            detect: obj.detect,
                            keyword: obj.keyword,
                            context: obj.context,
                            detectTime: obj.detectTime,
                            confirmTime: obj.confirmTime,
                            isBanned: 2,
                            weight: obj.weight,
                            firstCharIndex: obj.firstCharIndex,
                            name: obj.name,
                            banReason: obj.banReason,
                            relatedCase: obj.relatedCase
                        });
                    }
                })
                if (!DetectDetails.length) {
                    toaster.pop('success', '', "请勾选数据！");
                    return;
                }
                photoDetailService.banAll($scope, {
                    DetectDetails: DetectDetails,
                    detectId: photoId
                }, function(data) {
                    toaster.pop('success', '', data.ResultMsg);
                    $scope.event.loadData();
                    $scope.selectAll = false;
                    _this.getDetailById(); //刷新list
                })
            },
            isConfirm: function(data) {
                var _this = this;
                var postData = {
                    Id: data.id,
                    Detect: data.detect,
                    Keyword: data.keyword,
                    Weight: data.weight,
                    Context: data.context,
                    DetectTime: data.detectTime,
                    ConfirmTime: data.confirmTime,
                    IsBanned: "0",
                    Name: data.name,
                    BanReason: data.banReason,
                    RelatedCase: data.relatedCase,
                    FirstCharIndex: data.firstCharIndex
                }
                photoDetailService.confirmBan($scope, postData, function(data) {
                    $scope.event.loadData();
                    toaster.pop('success', '', data.ResultMsg);
                    $scope.selectAll = false;
                    _this.getDetailById(); //刷新list
                })
            },
            confirmBan: function(data) {
                var _this = this;
                var postData = {
                    Id: data.id,
                    Detect: data.detect,
                    Keyword: data.keyword,
                    Weight: data.weight,
                    Context: data.context,
                    DetectTime: data.detectTime,
                    ConfirmTime: data.confirmTime,
                    IsBanned: "1",
                    Name: data.name,
                    BanReason: data.banReason,
                    RelatedCase: data.relatedCase,
                    FirstCharIndex: data.firstCharIndex
                }
                photoDetailService.confirmBan($scope, postData, function(data) {
                    $scope.event.loadData();
                    toaster.pop('success', '', data.ResultMsg);
                    $scope.selectAll = false;
                    _this.getDetailById(); //刷新list
                })
            },
            confirmNotBan: function(data) { 
                var _this = this;
                var postData = {
                    Id: data.id,
                    Detect: data.detect,
                    Keyword: data.keyword,
                    Weight: data.weight,
                    Context: data.context,
                    DetectTime: data.detectTime,
                    ConfirmTime: data.confirmTime,
                    IsBanned: "2",
                    Name: data.name,
                    BanReason: data.banReason,
                    RelatedCase: data.relatedCase,
                    FirstCharIndex: data.firstCharIndex
                }
                photoDetailService.confirmBan($scope, postData, function(data) {
                    $scope.event.loadData();
                    toaster.pop('success', '', data.ResultMsg);
                    $scope.selectAll = false;
                    _this.getDetailById(); //刷新list
                })
            },
            pageChanged: function() { //??????
                this.loadData();
            },
            getDetailById: function() { //????d???ͼƬ????
                photoDetailService.getDetailById($scope, {
                    id: photoId
                }, function(data) {
                    $scope.list = [];
                    $scope.list.push(data.Data);
                    $scope.list.forEach(function(obj, index, arr) {
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

                })
            }
        };

        $scope.event.loadData();
        $scope.event.getDetailById();
    }
])
