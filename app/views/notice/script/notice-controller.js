app.controller('noticeCtrl', ['$scope', 'gridService', 'noticeService', 'dialog', 'toaster', '$state',
    function($scope, gridService, noticeService, dialog, toaster, $state) {
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
            headerName: "标题",
            // checked: true,
            field: "Title",
            width: 200
        }, {
            headerName: "通知类型",
            checked: true,
            field: "CategoryName",
            width: 150,
        }, {
            headerName: "状态",
            checked: true,
            field: "StatusName",
            width: 100,
        }, {
            headerName: "编辑时间",
            checked: true,
            field: "EditTime",
            width: 238,
            cellRenderer: $scope.dateTimeToFormatFunc
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
                // $state.go("admin.notice.edit");
                $scope.dialog.show('views/notice/notice-add.html', 'noticeEditCtrl', 'lg', {
                    data: {}
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }

                })
            },
            delete: function(row) {
                // var selectedUsers = $scope.gridOptions.api.getSelectedRows();
                row && noticeService.delete($scope, { id: row.Id }, function(data) {
                    if (data && data.ResultCode) {
                        $scope.event.loadData();
                        toaster.pop('success', '', data.ResultMsg);
                    }
                })
            },
            edit: function(row) {
                if (row && (row.Status == "2700" || row.Status == "2701")) { //只有草稿跟待发送能编辑
                    $scope.dialog.show('views/notice/notice-add.html', 'noticeEditCtrl', 'lg', {
                        data: row
                    }, function(data) {
                        if (data) {
                            $scope.event.loadData();
                        }

                    })
                } else {
                    toaster.pop('warning', '', "该状态不能编辑");
                }
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

app.controller('noticeEditCtrl', ['$scope', '$uibModalInstance', 'noticeService', 'commonApiService', 'data', 'noticeUserService', 'noticeRoleService', 'gridService', 'toaster', 'dialog',
    function($scope, $uibModalInstance, noticeService, commonApiService, data, noticeUserService, noticeRoleService, gridService, toaster, dialog) {
        $scope.model = data;
        $scope.data = data;
        $scope.dialog = dialog;
        $("#search-good").focus(function() {
            $(".click-down").css("border-color", "#008afa");
        })
        $("#search-good").blur(function() {
            $(".click-down").css("border-color", "#d7dee1");
        })
        $scope.operation = {
            dropdown: false
        };
        // $scope.service = noticeNewService;
        // gridService.gridInit($scope);
        //构造业务按钮
        $scope.businessBtns = [{
                "code": "output",
                "name": "导出excel",
                "index": 1010,
                "icon": "fa fa-pencil",
                "group": false
            }]
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

        function getReceivers() {
            var receivers = [];
            $scope.model.Content = $scope.editor.$txt.html();
            $scope.model.Text = $scope.editor.$txt.text();
            if ($scope.selectedRoles) { //按角色
                $scope.selectedRoles.forEach(function(obj, index, arr) {
                    receivers.push({
                        ReceiverRoleName: obj.Name,
                        Category: "0"
                    })
                })
            } else if ($scope.selectedUsers) { //按用户
                $scope.selectedUsers.forEach(function(obj, index, arr) {
                    receivers.push({
                        ReceiverId: obj.Id,
                        ReceiverName: obj.Name,
                        Category: "1"
                    })
                })
            }
            return receivers;
        }
        var ossUpload = FileUpload.BuildUploadObj();
        $scope.files = [];
        $scope.event = {
            drafts: function() { //保存为草稿
                var receivers = getReceivers();
                if ($scope.data.Id) {
                    noticeService.putRecord($scope, receivers, function(data) {
                        $uibModalInstance.close(data);
                        toaster.pop('success', '', data.ResultMsg);
                    })
                } else {
                    noticeService.postRecord($scope, receivers, function(data) {
                        $uibModalInstance.close(data);
                        toaster.pop('success', '', data.ResultMsg);
                    })
                }
            },
            send: function() { //立即发送
                var receivers = getReceivers();
                if ($scope.data.Id) { //修改
                    noticeService.putRecord($scope, receivers, function(data) {
                        if (data && data.ResultCode) {
                            noticeService.updateStatus($scope, {
                                id: $scope.data.Id,
                                operate: "1"
                            }, function(data) {
                                if (data && data.ResultCode) {
                                    $uibModalInstance.close(data);
                                    toaster.pop('success', '', data.ResultMsg);
                                }
                            })
                        }
                    })
                } else { //新增updateStatus
                    noticeService.postRecord($scope, receivers, function(data) {
                        if (data && data.ResultCode) {
                            noticeService.updateStatus($scope, {
                                id: data.Data.Id,
                                operate: "1"
                            }, function(data) {
                                if (data && data.ResultCode) {
                                    $uibModalInstance.close(data);
                                    toaster.pop('success', '', data.ResultMsg);
                                }
                            })
                        }
                    })
                }
            },
            sendTiming: function() { //定时发送
                $scope.dialog.show('views/notice/notice-timing.html', 'noticeSendTimingCtrl', 'md', {
                    data: {}
                }, function(data) {
                    var sendTime = data.timing;
                    var receivers = getReceivers();
                    if ($scope.data.Id) { //修改
                        // $scope.model.Content = $scope.editor.s
                        noticeService.putRecord($scope, receivers, function(data) {
                            if (data && data.ResultCode) {
                                noticeService.updateStatus($scope, {
                                    id: $scope.data.Id,
                                    operate: "1",
                                    sendTime: sendTime
                                }, function(data) {
                                    if (data && data.ResultCode) {
                                        $uibModalInstance.close(data);
                                        toaster.pop('success', '', data.ResultMsg);
                                    }
                                })
                            }
                        })
                    } else { //新增updateStatus
                        noticeService.postRecord($scope, receivers, function(data) {
                            if (data && data.ResultCode) {
                                noticeService.updateStatus($scope, {
                                    id: data.Data.Id,
                                    operate: "1",
                                    sendTime: sendTime
                                }, function(data) {
                                    if (data && data.ResultCode) {
                                        $uibModalInstance.close(data);
                                        toaster.pop('success', '', data.ResultMsg);
                                    }
                                })
                            }
                        })
                    }
                })

                // var receivers = getReceivers();
                // noticeService.postRecord($scope, receivers, function(data) {
                //     $uibModalInstance.close(data);
                //     toaster.pop('success', '', data.ResultMsg);
                // })
            },
            close: function() {
                //关闭
                $uibModalInstance.close();
            },
            showSearchPanel: function() {
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
            },
            deleteSelected: function(selected, index) { //删除选中收件人
                selected.splice(index, 1);
            }
        };

        $scope.$on('selectedRoles', function(event, data) {
            $scope.selectedRoles = data;
            $scope.selectedUsers = null;
        });

        $scope.$on('selectedUsers', function(event, data) {
            $scope.selectedUsers = data;
            $scope.selectedRoles = null;
        });
    }
]);

//加载注册用户表格---控制器
app.controller('noticeUserCtrl', ['$scope', 'noticeUserService', 'gridService',
    function($scope, noticeUserService, gridService) {
        gridService.gridInit($scope);
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
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {}
        };
        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, noticeUserService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            save: function() {
                var selectedUsers = $scope.gridOptions.api.getSelectedRows();
                $scope.$emit('selectedUsers', selectedUsers);
                $scope.operation.dropdown = false;
            }
        })
    }
]);
//加载用户角色表格---控制器
app.controller('noticeRoleCtrl', ['$scope', 'noticeRoleService', 'gridService',
    function($scope, noticeRoleService, gridService) {
        gridService.gridInit($scope, $scope.gridOptions);
        $scope.columnDefs = $scope.columnDefs.concat([{
            headerName: "角色名称",
            // checked: true,
            field: "Name",
            width: 275
        }, {
            headerName: "状态",
            checked: true,
            field: "isValid",
            width: 275,
            cellRenderer: $scope.codeToName
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {}
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, noticeRoleService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            save: function() {
                var selectedRoles = $scope.gridOptions.api.getSelectedRows();
                $scope.$emit('selectedRoles', selectedRoles);
                $scope.operation.dropdown = false;
            }
        })
    }
])

//定时发送控制器
app.controller('noticeSendTimingCtrl', ['$scope', '$uibModalInstance',
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
