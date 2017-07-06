app.controller('noticeCtrl', ['$scope', 'gridService', 'noticeService', 'dialog', 'toaster',
    function($scope, gridService, noticeService, dialog, toaster) {
        $scope.dialog = dialog;
        // $scope.service = noticeService;
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
            headerName: "广告图片",
            // checked: true,
            field: "content",
            width: 200
        }, {
            headerName: "广告标题",
            checked: true,
            field: "name",
            width: 100,
        }, {
            headerName: "广告链接",
            checked: true,
            field: "targetUrl",
            width: 150
        }, {
            headerName: "创建时间",
            checked: true,
            field: "createTime",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "状态",
            checked: true,
            field: "isValid",
            width: 88,
            cellRenderer: $scope.codeToName
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {}
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, noticeService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            //导出excel
            // output: $scope.exportAsExcel,
            add: function() {
                $scope.dialog.show('views/notice/notice-add.html', 'noticeEditCtrl', 'lg', {
                    data: {}
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }

                })
            },
            delete: function(row) {
                noticeService.delete($scope, { id: row.id }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }
                    toaster.pop('success', '', data.ResultMsg);
                })
            },
            enable: function(row) {
                noticeService.updateStatus($scope, {
                    id: row.id,
                    isValid: "true"
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }
                    toaster.pop('success', '', data.ResultMsg);
                })
            },
            disable: function(row) {
                noticeService.updateStatus($scope, {
                    id: row.id,
                    isValid: "false"
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }
                    toaster.pop('success', '', data.ResultMsg);
                })
            }
        });

        noticeService.loadData($scope, {
            pageNum: 1,
            pageSize: 20
        }, function(data) {
            $scope.data = data.Data.data;
        })
    }
]);

app.controller('noticeEditCtrl', ['$scope', '$uibModalInstance', 'noticeService', 'commonApiService', 'data', 'noticeUserService', 'noticeRoleService', 'gridService',
    function($scope, $uibModalInstance, noticeService, commonApiService, data, noticeUserService, noticeRoleService, gridService) {
        $scope.model = data;
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
            debugger
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
