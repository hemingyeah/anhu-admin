//文字检测详情
app.controller('wordDetailCtrl', ['$scope', 'gridService', 'wordDetailService', '$state', '$stateParams', 'toaster',
    function($scope, gridService, wordDetailService, $state, $stateParams, toaster) {
        var wordId = $stateParams.id;
        $scope.model = {
            textContent: $stateParams.content
        }
        $scope.contextual = {}; //情景模式
        $scope.event = {
            loadData: function () {  //获取文字检测详情列表
                wordDetailService.getWordDetail($scope, {
                    id: wordId,
                    pageNum: $scope.page.pageNum,
                    pageSize: $scope.page.pageSize
                }, function(data) {
                    if (data && data.ResultCode) {
                        if (data.Data.data) {
                            $scope.data = data.Data.data;
                            $scope.page.total = data.Data.page.recordSum;
                            $scope.page.pages = Math.ceil($scope.page.total / $scope.page.pageSize)
                        }else {
                            $scope.page.total = 0;
                            $scope.page.pages = 1;
                        }
                    }
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
                wordDetailService.confirmBan($scope, postData, function(data) {
                    $scope.event.loadData();
                    toaster.pop('success', '', data.ResultMsg);
                    $scope.selectAll = false;
                    _this.getDetailById(); //刷新list
                })
            },
            confirmBan: function(data) { //确认违禁
                var _this = this;
                var postData = {
                    Id: data.id,
                    Detect: data.detect,
                    Keyword: data.keyword,
                    Weight: data.weight,
                    Context: data.context,
                    DetectTime: data.detectTime,
                    ConfirmTime: data.confirmTime,
                    IsBanned: 1,
                    Name: data.name,
                    BanReason: data.banReason,
                    RelatedCase: data.relatedCase,
                    FirstCharIndex: data.firstCharIndex
                }
                wordDetailService.confirmBan($scope, postData, function(data) {
                    toaster.pop('success', '', data.ResultMsg);
                    $scope.event.loadData();
                    $scope.selectAll = false;
                    _this.getDetailById();
                })
            },
            allBan: function () { //批量确认违禁
                var _this = this;
                var DetectDetails = [];
                var _this = this;
                ($scope.data || []).forEach(function (obj, index, arr) {
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
                wordDetailService.banAll($scope, {
                    DetectDetails: DetectDetails,
                    detectId: wordId
                }, function(data) {
                    toaster.pop('success', '', data.ResultMsg);
                    $scope.event.loadData();
                    $scope.selectAll = false;
                    _this.getDetailById();
                })
            },
            allNotBan: function () { //批量确认违禁
                var _this = this;
                var DetectDetails = [];
                var _this = this;
                ($scope.data || []).forEach(function (obj, index, arr) {
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
                wordDetailService.banAll($scope, {
                    DetectDetails: DetectDetails,
                    detectId: wordId
                }, function(data) {
                    toaster.pop('success', '', data.ResultMsg);
                    $scope.event.loadData();
                    $scope.selectAll = false;
                    _this.getDetailById();
                })
            },
            selectAll: function () { //全选
                if ($scope.selectAll) {
                    ($scope.data || []).forEach(function (obj, index, arr) {
                        obj.selected = true;
                    })
                }else {
                    ($scope.data || []).forEach(function (obj, index, arr) {
                        obj.selected = false;
                    })
                }

            },
            confirmNotBan: function(data) { //确认违禁
                var _this = this;
                var postData = {
                    Id: data.id,
                    Detect: data.detect,
                    Keyword: data.keyword,
                    Weight: data.weight,
                    Context: data.context,
                    DetectTime: data.detectTime,
                    ConfirmTime: data.confirmTime,
                    IsBanned: 2,
                    Name: data.name,
                    BanReason: data.banReason,
                    RelatedCase: data.relatedCase,
                    FirstCharIndex: data.firstCharIndex
                }
                wordDetailService.confirmBan($scope, postData, function(data) {
                    toaster.pop('success', '', data.ResultMsg);
                    $scope.event.loadData();
                    $scope.selectAll = false;
                    _this.getDetailById();
                })
            },
            getDetailById: function () {//根据Id获取文本检查详情
                wordDetailService.getDetailById($scope, {
                    id: wordId
                }, function(data) {
                    if (data && data.ResultCode) {  
                        if (data.Data.score < 30) { //极度危险 （0 ~30）
                            $scope.contextual.isDanger = true;
                        }else if (data.Data.score < 60) { //危险（30~60）
                            $scope.contextual.isWarning = true;
                        }else if (data.Data.score < 90) { //潜在风险 （60~90）
                            $scope.contextual.isInfo = true;
                        }else if (data.Data.score < 100) { //安全 （90~100）
                            $scope.contextual.isSuccess = true;
                        }else { //非常安全 （100）
                            $scope.contextual.isSuccess = true;
                        }
                        $scope.wordDetail = data.Data;
                    }
                })
            },
            pageChanged: function () {
                this.loadData();
            }
        };

        $scope.event.loadData();
        $scope.event.getDetailById();
    }
])
