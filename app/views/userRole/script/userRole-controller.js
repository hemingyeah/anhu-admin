app.controller('userRoleCtrl', ['$scope', 'gridService', 'userRoleService', 'dialog', 'toaster',
    function($scope, gridService, userRoleService, dialog, toaster) {
        $scope.dialog = dialog;
        $scope.service = userRoleService;
        gridService.gridInit($scope);

        $scope.columnDefs = $scope.columnDefs.concat([{
            headerName: "角色名称",
            field: "Name",
            width: 80
        }, {
            headerName: "描述",
            field: "Description",
            width: 208
        }, {
            headerName: "用户数量",
            field: "UserCount",
            width: 80
        }, {
            headerName: "编辑时间",
            field: "EditTime",
            width: 160,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "创建时间",
            field: "CreateTime",
            width: 160,
            cellRenderer: $scope.dateTimeToFormatFunc
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {},
            rowSelection: "single"
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, userRoleService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            add: function() {
                $scope.dialog.show('views/userRole/userRoleEdit.html', 'userRoleEditCtrl', 'lg', {
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
            edit: function(row) {
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                !selectedRows.length && row === undefined ? toaster.pop('warning', '', '请勾选一条数据进行操作！') :
                    $scope.dialog.show('views/userRole/userRoleEdit.html', 'userRoleEditCtrl', 'lg', {
                        data: row || selectedRows[0]
                    }, function(data) {
                        if (data) {
                            $scope.event.loadData();
                        }
                    });
            },
            delete: function(row) {
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                var deleteData = undefined;
                if (selectedRows.length) {
                    deleteData = selectedRows[0];
                } else {
                    deleteData = row;
                }
                deleteData === undefined ? toaster.pop("warning", "", "请勾选一条数据进行操作！") : userRoleService.delete($scope, deleteData, function(data) {
                    if (data && data.ResultCode) {
                        $scope.event.loadData();
                    }
                    toaster.pop('success', '', data.ResultMsg);
                })
            },
            search: function() {
                this.loadData();
            }
        })
    }
])
app.controller("userRoleEditCtrl", ['$scope', '$uibModalInstance', 'userRoleService', 'commonApiService', 'data', 'toaster',
    function($scope, $uibModalInstance, userRoleService, commonApiService, data, toaster) {
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
        }
        $scope.event = {
            save: function() {
                var selectedNodes = $scope.ztree.getCheckedNodes(true); //获取选中的节点
                var selectedPermission = [];
                selectedNodes.forEach(function(obj, index, arr) {
                    selectedPermission.push(obj.Id);
                })
                $scope.model.Permissions = selectedPermission;
                if (data.Id) {//编辑
                    userRoleService.putRecord($scope, $scope.model, function(data) {
                        $uibModalInstance.close(data);
                        toaster.pop('success', '', data.ResultMsg);
                    })
                } else {//新增
                    $scope.model.Category = "0302";
                    $scope.model.CategoryName = "用户角色";
                    userRoleService.postRecord($scope, $scope.model, function(data) {
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
