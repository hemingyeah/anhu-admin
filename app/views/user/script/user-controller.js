app.controller('userCtrl', ['$scope', 'gridService', 'userService', 'dialog', 'toaster', 'commonApiService',
    function($scope, gridService, userService, dialog, toaster, commonApiService) {
        $scope.dialog = dialog;
        $scope.service = userService;
        $scope.selected = {};
        gridService.gridInit($scope);

        $scope.columnDefs = $scope.columnDefs.concat([{
            headerName: "用户编号",
            field: "Id",
            width: 80
        }, {
            headerName: "用户名",
            field: "Name",
            width: 90
        }, {
            headerName: "昵称",
            field: "NickName",
            width: 90
        }, {
            headerName: "部门",
            field: "DeptName",
            width: 90
        }, {
            headerName: "头像",
            field: "AvatarPath",
            width: 70
        }, {
            headerName: "电话",
            field: "Mobile",
            width: 100
        }, {
            headerName: "邮箱",
            field: "Email",
            width: 100
        }, {
            headerName: "生日",
            field: "Birthday",
            width: 140,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "性别",
            field: "Gender", //true-man flase-women
            width: 60,
            cellRenderer: function(params) {
                switch (params.data.Gender) {
                    case true:
                        return "男";
                        break;
                    case false:
                        return "女";
                        break;
                    default:
                        return "未填";
                        break;
                }
            }
        }, {
            headerName: "生成时间",
            field: "CreateTime",
            width: 140,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "最后登录时间",
            field: "LastTime",
            width: 140,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "最后登录IP",
            field: "LastIp",
            width: 120
        }, {
            headerName: "是否本地员工",
            field: "isLocal",
            width: 110,
            cellRenderer: function(params) {
                switch (params.data.Gender) {
                    case true:
                        return "是";
                        break;
                    case false:
                        return "否";
                        break;
                    default:
                        break;
                }
            }
        }, {
            headerName: "状态",
            field: "StatusName",
            width: 80
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {},
            rowSelection: 'single' //单选
        };
        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, userService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            add: function() { //新增
                $scope.dialog.show('views/user/user-add.html', 'userEditCtrl', 'lg', {
                    data: null
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }
                })
            },
            edit: function() { //编辑
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                selectedRows.length !== 1 ? toaster.pop('warning', '', '请勾选一条数据进行操作！') :
                    $scope.dialog.show('views/user/user-add.html', 'userEditCtrl', 'lg', {
                        data: selectedRows[0]
                    }, function(data) {
                        if (data) {
                            $scope.event.loadData();
                        }
                    })
            },
            search: function() { //搜索
                $scope.filter = {
                    EmployeeName: $scope.selected.EmployeeName,
                    Status: $scope.selected.type.Id
                }
                $scope.event.loadData();
            },
            delete: function() { //删除
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                if (selectedRows.length !== 1) {
                    toaster.pop('warning', '', '请勾选一条数据进行操作！');
                } else {
                    selectedRows[0].Status === "0509" ? toaster.pop('warning', '', '该用户已删除注销过！') :
                        userService.delete($scope, selectedRows[0], function(data) {
                            if (data && data.ResultCode) {
                                toaster.pop('success', '', data.ResultMsg);
                                $scope.event.loadData();
                            }
                        })
                }

            }
        });
        commonApiService.getCode($scope, { //获取用户类型--正常/注销
            category: "EmployeeStatus",
            isValid: true
        }, function(data) {
            $scope.types = data.Data.data;
        });
    }
]);
app.controller("userEditCtrl", ['$scope', '$uibModalInstance', 'userService', 'commonApiService', 'data', 'toaster',
    function($scope, $uibModalInstance, userService, commonApiService, data, toaster) {
        $scope.selected = {};
        $scope.data = data;
        $scope.event = {
            save: function() {
                $scope.model.No = $scope.model.NickName;
                $scope.model.Name = $scope.model.NickName;
                $scope.model.DeptId = 3945;
                $scope.model.DeptName = "网卫科技";
                $scope.model.Roles = [];
                $scope.model.Roles.push($scope.selected.role);
                if (!data) { //新增
                    if ($scope.model.Password === $scope.model.ConfirmPwd) {
                        $scope.model.Password = $scope.model.ConfirmPwd;
                        userService.postRecord($scope, $scope.model, function(data) {
                            if (data && data.ResultCode) {
                                $uibModalInstance.close(data);
                                toaster.pop('success', '', data.ResultMsg);
                            }
                        });
                    } else {
                        toaster.pop('warning', '', '两次输入的密码不一致！');
                    }
                } else { //修改
                    debugger
                    userService.putRecord($scope, $scope.model, function(data) {
                        if (data && data.ResultCode) {
                            $uibModalInstance.close(data);
                            toaster.pop('success', '', data.ResultMsg);
                        }
                    });
                }
            },
            close: function() { //关闭
                $uibModalInstance.close();
            }
        };

        userService.getRoles($scope, { //获取用户角色列表
            isRoleUser: false
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.roles = data.Data.data;
                $scope.roles.forEach(function(obj, index, arr) {
                    if ($scope.model.Roles && obj.Id === $scope.model.Roles[0].Id) {
                        $scope.selected = {
                            role: obj
                        }
                    }
                })
            }
        });
        if (data) {
            userService.getRecord($scope, data, function(data) {
                if (data && data.ResultCode) {
                    $scope.model = data.Data;
                }
            })
        }
    }
])
