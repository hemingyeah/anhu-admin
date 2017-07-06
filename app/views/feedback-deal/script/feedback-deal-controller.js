//在线援助---工单回复
app.controller('feedbackDealCtrl', ['$scope', 'feedbackDealService','$stateParams', 'toaster', 'dialog', '$state',
    function($scope, feedbackDealService, $stateParams, toaster, dialog, $state) {
        var id = $stateParams.id;
        $scope.dialog = dialog;
        feedbackDealService.getRecord($scope, {
            id: id
        }, function(data) {
            $scope.simple = data.Data;
        })
        /*五星评分控件配置*/
        $scope.max = 5;
        $scope.ratingVal = 5;
        $scope.hoverVal = 5;//我这需求是默认六个星全满(淡腾,反正也招不出神龙.因为还差一个.)一般的话，ratingVal和hoverVal都写0就可以了。
        $scope.onHover = function(val) {
          $scope.hoverVal = val;
        };
        $scope.onLeave = function() {
          $scope.hoverVal = $scope.ratingVal;
        }
        $scope.onChange = function(val) {
          $scope.ratingVal = val;
        }
        /*五星评分控件配置*/
        $scope.event = {
            close: function() {
                feedbackDealService.putRecord($scope, { //获取工单回复列表
                    id: id,
                    score: $scope.ratingVal
                }, function(data) {
                    if (data && data.ResultCode) {
                        toaster.pop('success', '', data.ResultMsg);
                        $state.go("admin.feedback")
                    }
                })
            },
            loadWordPosts: function() {
                feedbackDealService.getWorkPosts($scope, { //获取工单回复列表
                    id: id,
                    pageNum: "1",
                    pageSize: "10"
                }, function(data) {
                    $scope.workPosts = data.Data.data;
                })
            },
            reply: function() {
                feedbackDealService.postRecord($scope, {
                    topicId: id,
                    content: $scope.model.Content,
                    title: "",
                    urls: $scope.urls || "",
                }, function(data) {
                    if (data && data.ResultCode) {
                        toaster.pop('success', '', data.ResultMsg);
                        $scope.event.loadWordPosts();
                        $scope.model.Content = undefined;
                    }
                })
            }
        }
        $scope.event.loadWordPosts();
    }
])
app.controller('feedbackCloseCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.event = {
        save: function () {
            $uibModalInstance.close($scope.model);
        },
        close: function () {
            $uibModalInstance.close();
        }
    }
}])