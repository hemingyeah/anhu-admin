app.controller('usageCtrl', ['$scope', 'gridService', 'usageService', 'dialog', 'toaster', '$state', 'commonApiService', '$filter',
    function($scope, gridService, usageService, dialog, toaster, $state, commonApiService, $filter) {
        $scope.dialog = dialog;
        $scope.query = {};
        // $scope.service = usageService;
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
            headerName: "问题标题",
            checked: true,
            field: "Title",
            width: 100,
            cellRenderer: function(params) {
                return "<a class='iscs-table-details' ng-click='event.dealProblems(data, $event)'>" + params.data.Title + "</a>";
            }
        }, {
            headerName: "类型",
            checked: true,
            field: "CategoryName",
            width: 100,
        }, {
            headerName: "内容",
            checked: true,
            field: "Content",
            width: 100,
        }, {
            headerName: "阅读数量",
            checked: true,
            field: "ClickCount",
            width: 80,
        }, {
            headerName: "权重分配",
            checked: true,
            field: "DisplayNo",
            width: 80,
        }, {
            headerName: "发布时间",
            checked: true,
            field: "EditTime",
            width: 228,
            cellRenderer: $scope.dateTimeToFormatFunc
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {}
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, usageService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            //导出excel
            // output: $scope.exportAsExcel,
            add: function() {
                // $state.go("admin.usage.edit");
                $scope.dialog.show('views/usage/usage-add.html', 'usageEditCtrl', 'lg', {
                    data: {}
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }

                })
            },
            delete: function(row) {
                // var selectedUsers = $scope.gridOptions.api.getSelectedRows();
                usageService.delete($scope, { id: row.Id }, function(data) {
                    if (data && data.ResultCode) {
                        $scope.event.loadData();
                        toaster.pop('success', '', data.ResultMsg);
                    }
                })
            },
            edit: function(row) {

                $scope.dialog.show('views/usage/usage-add.html', 'usageEditCtrl', 'lg', {
                    data: row
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }

                })
            },
            search: function() { //搜索
                var createEndTime = new Date((new Date($scope.query.createEndTime)).getTime() + 24 * 60 * 60 * 1000)
                createEndTime = $filter("date")(createEndTime, "yyyy-MM-dd");
                $scope.filter = {
                    CreateBeginTime: $scope.query.createBeginTime,
                    CreateEndTime: createEndTime,
                    EmployeeName: $scope.query.employeeName || "",
                    WorkTopicId: $scope.query.id || "",
                    WorkTopicTitle: $scope.query.workTopicTitle || "",
                    CategoryId: $scope.selected.workTopic ? $scope.selected.workTopic.Id : "",
                    Status: $scope.selected.workTopicStatus ? $scope.selected.workTopicStatus.Id : ""
                }
                $scope.event.loadData();
            },
            dealProblems: function(data, evt) {}
        });

        commonApiService.getCommonCategoryById($scope, { //获取使用帮助类型类型
            id: "0106"
        }, function(data) {
            $scope.usages = data.Data.data;
            $scope.selected = {
                usage: $scope.usages[0]
            }
        });


        // commonApiService.getCode($scope, { //获取工单处理状态
        //     category: "WorkTopicStatus",
        //     isValid: true,
        //     pageNum: 1,
        //     pageSize: 20
        // }, function(data) {
        //     $scope.workTopicStatus = data.Data.data;
        //     $scope.selected = {
        //         workTopicStatus: $scope.workTopicStatus[0]
        //     }
        // })

    }
]);

app.controller('usageEditCtrl', ['$scope', 'commonApiService', 'usageService', 'dialog', '$uibModalInstance', 'data', 'toaster',
    function($scope, commonApiService, usageService, dialog, $uibModalInstance, data, toaster) {
        $scope.dialog = dialog;
        if (data.Id) {
            usageService.getRecord($scope, {
                id: data.Id
            }, function(data) {
                if (data && data.ResultCode) {
                    // $scope.model.Content = $scope.editor.$txt.html();
                    $scope.model = data.Data;
                    $scope.editor.$txt.html($scope.model.Content)
                }
            })
        }
        $scope.event = {
            loadUsage: function() {
                commonApiService.getCommonCategoryById($scope, { //获取使用帮助类型类型
                    id: "0106"
                }, function(data) {
                    $scope.usages = data.Data.data;
                    if (data.Id) {
                        $scope.usages.forEach(function (obj, index, arr) {
                            if (obj.Id === data.CategoryId) {
                                $scope.selected = {
                                    usage: $scope.usages[index]
                                }
                            }
                        })
                    }else {
                        $scope.selected = {
                            usage: $scope.usages[0]
                        }
                    }
                });
            },
            save: function() {
                $scope.model.Content = $scope.editor.$txt.html();
                if (data.Id) { //修改
                    $scope.model.CategoryId = $scope.selected.usage.Id;
                    $scope.model.CategoryName = $scope.selected.usage.Name;
                    usageService.putRecord($scope, $scope.model, function(data) {
                        $uibModalInstance.close(data);
                        toaster.pop('success', '', data.ResultMsg);
                    })

                } else {
                    //保存
                    usageService.postRecord($scope, $scope.model, function(data) {
                        $uibModalInstance.close(data);
                        toaster.pop('success', '', data.ResultMsg);
                    })
                }
            },
            close: function() { //关闭
                $uibModalInstance.close();
            },
            publish: function() { //发布
                $scope.model.Content = $scope.editor.$txt.html();
                if (data.id) { //修改
                    //保存
                    usageService.putRecord($scope, $scope.model, function(data) {
                        $uibModalInstance.close(data);
                        toaster.pop('success', '', data.ResultMsg);
                    })

                } else {
                    //保存
                    usageService.postRecord($scope, $scope.model, function(data) {
                        $uibModalInstance.close(data);
                        toaster.pop('success', '', data.ResultMsg);
                    })
                }
            },
            postCommonCategory: function() { //新增通用分类
                $scope.dialog.show('views/usage/post-common-category.html', 'postCommonCategoryCtrl', 'lg', {
                    data: {}
                }, function(data) {
                    var commonCategoryPost = [];
                    commonCategoryPost.push(data.name);
                    usageService.postCommonCategory($scope, { //新增使用帮助类型类型
                        commonCategoryPost: commonCategoryPost,
                        operate: "1"
                    }, function(data) {
                        if (data && data.ResultCode) {
                            $scope.event.loadUsage();
                        }
                    });

                })
            }
        }

        $scope.event.loadUsage();
    }
]);
app.controller('postCommonCategoryCtrl', ['$scope', '$uibModalInstance',
    function($scope, $uibModalInstance) {
        $scope.event = {
            save: function() {
                $uibModalInstance.close($scope.model);
            },
            close: function() {
                $uibModalInstance.close();
            }
        }

    }
])
