app.controller('roleCtrl', ['$scope', 'gridService', 'roleService', 'dialog', 'toaster',
    function($scope, gridService, roleService, dialog, toaster) {
        $scope.dialog = dialog;
        $scope.service = roleService;
        gridService.gridInit($scope);

        $scope.columnDefs = $scope.columnDefs.concat([{
            headerName: "用户名",
            field: "Name",
            width: 140
        }, {
            headerName: "数据查看权限",
            field: "",
            width: 140
        }, {
            headerName: "数据添加编辑权限",
            field: "",
            width: 140
        }, {
            headerName: "数据删除权限",
            field: "",
            width: 140
        }, {
            headerName: "数据审核权限",
            field: "",
            width: 140
        }, {
            headerName: "系统用户管理权限",
            field: "",
            width: 140
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {},
            rowSelection: 'single'
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, roleService, $scope.gridOptions);

        $scope.event = $.extend(consMethods, {
            add: function() {
                $scope.dialog.show('views/role/role-add.html', 'roleEditCtrl', 'lg', {
                    zNodes: function() {
                        return $scope.zNodes;
                    },
                    data: {}
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }

                })
            },
            edit: function() { //编辑
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                selectedRows.length !== 1 ? toaster.pop('warning', '', '请勾选一条数据进行操作！') :
                    $scope.dialog.show('views/role/role-add.html', 'roleEditCtrl', 'lg', {
                        data: selectedRows[0]
                    }, function(data) {
                        if (data) {
                            $scope.event.loadData();
                        }
                    })
            },
            delete: function() {
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                selectedRows.length !== 1 ? toaster.pop('warning', '', '请勾选一条数据进行操作！') :
                    roleService.delete($scope, selectedRows[0], function(data) {
                        if (data && data.ResultCode) {
                            toaster.pop('success', '', data.ResultMsg);
                            $scope.event.loadData();
                        }
                    })
            },
            search: function() {
                $scope.event.loadData();
            }
        });
    }
]);
app.controller("roleEditCtrl", ['$scope', '$uibModalInstance', 'roleService', 'commonApiService', 'data', 'toaster',
    function($scope, $uibModalInstance, roleService, commonApiService, data, toaster) {
        $scope.model = data;
        $scope.setting = {
            check: {
                enable: true,
                chkStyle: "checkbox",
                // radioType: radioType
            },
            data: {
                simpleData: {
                    idKey: "Id",
                    pIdKey: "ParentId",
                    enable: true
                },
                key: {
                    name: "Name",
                    checked: "IsChecked",
                    isParent: "Child",
                    // open: "",
                    children: "Child"
                }
            },
            callback: {
                onClick: function(event, treeId, treeNode, clickFlag) {
                    console.log(treeNode)
                }
            }
        };
        $scope.event = {
            save: function() {
                var selectedNodes = $scope.ztree.getCheckedNodes(true); //获取选中的节点
                var selectedPermission = [];
                selectedNodes.forEach(function(obj, index, arr) {
                    selectedPermission.push(obj.Id);
                })
                $scope.model.Permissions = selectedPermission;
                if (data.Id) {//编辑
                    roleService.putRecord($scope, $scope.model, function(data) {
                        $uibModalInstance.close(data);
                        toaster.pop('success', '', data.ResultMsg);
                    })
                } else {//新增
                    $scope.model.Category = "0301";
                    $scope.model.CategoryName = "员工角色";
                    roleService.postRecord($scope, $scope.model, function(data) {
                        $uibModalInstance.close(data);
                        toaster.pop('success', '', data.ResultMsg);
                    })
                }
            },
            close: function() {
                //关闭
                $uibModalInstance.close();
            }
        }
    }
])
