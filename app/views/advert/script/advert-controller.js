app.controller('advertCtrl', ['$scope', 'gridService', 'advertService', 'dialog', 'toaster',
    function($scope, gridService, advertService, dialog, toaster) {
        $scope.dialog = dialog;
        $scope.service = advertService;
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
            field: "Content",
            width: 200
        }, {
            headerName: "广告标题",
            checked: true,
            field: "Name",
            width: 100,
        }, {
            headerName: "广告链接",
            checked: true,
            field: "TargetUrl",
            width: 150
        }, {
            headerName: "创建时间",
            checked: true,
            field: "CreateTime",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "状态",
            checked: true,
            field: "IsValid",
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
        var consMethods = gridService.construtor($scope, advertService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            //导出excel
            // output: $scope.exportAsExcel,
            add: function() {
                $scope.dialog.show('views/advert/advert-add.html', 'advertEditCtrl', 'md', {
                    data: {}
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }

                })
            },
            delete: function(row) {
                advertService.delete($scope, { id: row.Id }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }
                    toaster.pop('success', '', data.ResultMsg);
                })
            },
            enable: function(row) {
                advertService.updateStatus($scope, {
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
                advertService.updateStatus($scope, {
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

        advertService.loadData($scope, {
            pageNum: 1,
            pageSize: 20
        }, function(data) {
            $scope.data = data.Data.data;
        })
    }
]);

app.controller('advertEditCtrl', ['$scope', '$uibModalInstance', 'advertService', 'commonApiService', 'data', 'toaster',
    function($scope, $uibModalInstance, advertService, commonApiService, data, toaster) {
        $scope.model = data;
        /**
         * 模态框保存、关闭时间
         * 
         */
        commonApiService.getCode($scope, {
            category: "AdvertFormat",
            isValid: true,
            pageNum: 1,
            pageSize: 20
        }, function(data) {
            $scope.attachTypes = data.Data.data;
            $scope.selected = {
                attachType: $scope.attachTypes[1]
            }
        })

        var ossUpload = FileUpload.BuildUploadObj();
        $scope.files = [];
        $scope.event = {
            save: function() {
                if (data.id) { //修改

                } else {

                }
                //保存
                advertService.postRecord($scope, $scope.model, function(data) {
                    $uibModalInstance.close(data);
                    toaster.pop('success', '', data.ResultMsg);
                })
            },
            close: function() {
                //关闭
                $uibModalInstance.close();
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
            },
        }
    }
])
