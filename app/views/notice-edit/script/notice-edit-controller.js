
app.controller('noticeEditCtrl', ['$scope', 'noticeService', 'commonApiService', 'noticeUserService', 'noticeRoleService', 'gridService',
    function($scope, noticeService, commonApiService, noticeUserService, noticeRoleService, gridService) {
        // $scope.model = data;
        $("#search-good").focus(function () {
            $(".click-down").css("border-color","#008afa");
        })
        $("#search-good").blur(function () {
            $(".click-down").css("border-color","#d7dee1");
        })
        $scope.operation = {
            dropdown: false
        };
        // $scope.service = noticeNewService;
        gridService.gridInit($scope);
        //构造业务按钮
        $scope.businessBtns = [{
            "code": "output",
            "name": "导出excel",
            "index": 1010,
            "icon": "fa fa-pencil",
            "group": false
        }]
        $scope.columnDefs = $scope.columnDefs.concat([{
            headerName: "用户名",
            // checked: true,
            field: "Name",
            width: 275
        }, {
            headerName: "注册账号",
            checked: true,
            field: "No",
            width: 275
        }]);
        $scope.columnDefs1 = $scope.columnDefs.concat([{
            headerName: "用户名11",
            // checked: true,
            field: "Name",
            width: 275
        }, {
            headerName: "注册账号11",
            checked: true,
            field: "No",
            width: 275
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {}
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, noticeUserService, $scope.gridOptions);


        $scope.gridOptions1 = {
            columnDefs: $scope.columnDefs1,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {}
        };

        $scope.gridOptions1 = $.extend($scope.options, $scope.gridOptions1);
        var consMethods1 = gridService.construtor($scope, noticeRoleService, $scope.gridOptions1);
        /**
         * 模态框保存、关闭时间
         * 
         */
        //MessageCategory 系统通知类型
        commonApiService.getCode($scope, {
            category: "MessageCategory",
            isValid: true,
            pageNum: 1,
            pageSize: 20
        }, function(data) {
            $scope.messageTypes = data.Data.data;
            $scope.selected = {
                messageType: $scope.messageTypes[0]
            }
        })
    
        var ossUpload = FileUpload.BuildUploadObj();
        $scope.files = [];
        $scope.event = $.extend(consMethods, {
            save: function() {
                if (data.id) { //修改

                } else {

                }
                //保存
                noticeService.postRecord($scope, $scope.model, function(data) {
                    $uibModalInstance.close(data);
                    toaster.pop('success', '', data.ResultMsg);
                })
            },
            close: function() {
                //关闭
                $uibModalInstance.close();
            },
            showSearchPanel: function () {
                $scope.operation.dropdown = !$scope.operation.dropdown;
            },
            fileChange: function(evt) {
                angular.forEach(evt.target.files, function(obj, index, arr) {
                    obj.state = "待上传";
                    $scope.files.push(obj);
                })
                $scope.$apply(function() {
                    $scope.files;
                })

                angular.forEach($scope.files, function(obj, index, arr) {
                    if (obj.state === "待上传") {
                        ossUpload.upload(FileUpload.BuildUploadSetting(obj, 'anhu/', function(res) {
                            $scope.$apply(function() {
                                obj.state = "已上传";
                                obj.picUrl = "http://gt-oss.oss-cn-hangzhou.aliyuncs.com" + "/anhu/" + obj.name;
                            });
                        }, function(res) {
                            console.log("上传失败！");
                            obj.state = false;
                        }, function(res) {
                            $scope.$apply(function() {
                                obj.progress = Math.floor((res.loaded / res.total) * 100);
                                console.log(obj.progress)
                            })
                        }));
                    }
                })
            }
        });

        $scope.event1 = $.extend(consMethods1,{})
    }
])
