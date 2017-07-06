app.controller('informationCtrl', ['$scope', 'gridService', 'informationService', 'dialog', 'toaster',
    function($scope, gridService, informationService, dialog, toaster) {
        $scope.dialog = dialog;
        $scope.service = informationService;
        $scope.query = {};
        $scope.name = { 'true': '个人', 'false': '企业' };
        gridService.gridInit($scope);

        $scope.columnDefs = $scope.columnDefs.concat([{
            headerName: "用户编号",
            field: "No",
            width: 115
        }, {
            headerName: "用户昵称",
            field: "Nickname",
            width: 115
        }, {
            headerName: "账号名称",
            field: "Name",
            width: 85
        }, {
            headerName: "角色名称",
            field: "RoleName",
            width: 80
        }, {
            headerName: "注册账号",
            field: "No",
            width: 115
        }, {
            headerName: "账号属性",
            field: "IsPersonal",
            width: 80,
            cellRenderer: function(params) {
                switch (params.data.IsPersonal) {
                    case true:
                        return "个人";
                        break;
                    case false:
                        return "企业";
                        break;
                    default:
                        return "未确认";
                        break;
                }
            }
        }, {
            headerName: "最后登录时间",
            field: "LastLogin",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "注册时间",
            field: "RegTime",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {}
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, informationService, $scope.gridOptions);

        $scope.event = $.extend(consMethods, {
            search: function() { //点击查询
                $scope.filter = {
                    name: $scope.query.userName || "",
                    roleId: $scope.query.role ? $scope.query.role.Id : "",
                    no: $scope.query.no || ""
                };
                $scope.event.loadData();
            },
            edit: function(row) { //点击编辑
                if (row) {
                    $scope.dialog.show('views/information/userEdit.html', 'userEditCtrl', 'lg', {
                        data: row
                    }, function(data) {
                        if (data) {
                            $scope.event.loadData();
                        }
                    })
                }
            }
        });

        informationService.getRoles($scope, {
            isRoleUser: false
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.roles = data.Data.data;
            }
        })
    }
])
app.controller("userEditCtrl", ['$scope', '$uibModalInstance', 'informationService', 'commonApiService', 'data', 'toaster',
    function($scope, $uibModalInstance, informationService, commonApiService, data, toaster) {
        $scope.selected = {
            province: "",
            city: "",
            area: "",
            industry: ""
        };
        /**
         * [loadProvinces 获取全部省]
         * @return {[type]} [description]
         */
        function loadProvinces() {
            commonApiService.getAreaById($scope, { id: "100000" }, function(data) {
                if (data) {
                    $scope.provinces = data.Data.data;
                    angular.forEach($scope.provinces, function(obj, index, arr) {
                        if ($scope.model.ProvinceId === obj.id) {
                            $scope.selected.province = $scope.provinces[index];
                        } else {
                            return;
                        }
                    })
                }
            });
        }
        /**
         * [loadIndustries 获取行业分类 字典id="0102"]
         * @return {[type]} [description]
         */
        function loadIndustries() {
            commonApiService.getCommonCategoryById($scope, { id: "0102" }, function(data) {
                if (data) {
                    $scope.industries = data.Data.data;
                    angular.forEach($scope.industries, function(obj, index, arr) {
                        if ($scope.model.IndustryId === obj.Id) {
                            $scope.selected.industry = $scope.industries[index];
                        } else {
                            return;
                        }
                    })
                }
            });
        }
        /**
         * [loadCitys 获取选定省下全部市]
         * @return {[type]} [description]
         */
        function loadCitys(id, isInit) {
            commonApiService.getAreaById($scope, { id: id }, function(data) {
                $scope.citys = data.Data.data;
                if (!isInit) {
                    $scope.selected.city = data.Data.data[0];
                } else {
                    angular.forEach($scope.citys, function(obj, index, arr) {
                        if ($scope.model.CityId === obj.id) {
                            $scope.selected.city = $scope.citys[index];
                        } else {
                            return;
                        }
                    })
                }
            })
        }
        /**
         * [loadAreas 获取选定市下全部区]
         * @return {[type]} [description]
         */
        function loadAreas(id, isInit) {
            commonApiService.getAreaById($scope, { id: id }, function(data) {
                $scope.areas = data.Data.data;
                if (!isInit) {
                    $scope.selected.area = data.Data.data[0];
                } else {
                    angular.forEach($scope.areas, function(obj, index, arr) {
                        if ($scope.model.AreaId === obj.id) {
                            $scope.selected.area = $scope.areas[index];
                        } else {
                            return;
                        }
                    });
                }
            })
        }

        function init() {
            loadProvinces();
            loadIndustries();
        }
        init();
        //获取选定省下全部市
        $scope.$watch('selected.province', function(newVal, oldVal) {
            var isInit = oldVal ? false : true;
            if (newVal != oldVal) {
                loadCitys(newVal.id, isInit);
            }
        }, true);
        //获取选定市下全部区
        $scope.$watch('selected.city', function(newVal, oldVal) {
            var isInit = oldVal ? false : true;
            if (newVal != oldVal) {
                loadAreas(newVal.id, isInit);
            }
        }, true);
        $scope.model = data;
        $scope.event = {
            save: function() {
                var selectedRole = [];
                selectedRole.push($scope.selected.role.Id);
                $scope.model.ProvinceName = $scope.selected.province.name;
                $scope.model.provinceId = $scope.selected.province.id;
                $scope.model.CityId = $scope.selected.city.id;
                $scope.model.CityName = $scope.selected.city.name;
                $scope.model.AreaId = $scope.selected.area.id;
                $scope.model.AreaName = $scope.selected.area.name;
                $scope.model.IndustryId = $scope.selected.industry.Id;
                $scope.model.IndustryName = $scope.selected.industry.Name;
                $scope.model.RoleIds = selectedRole;
                informationService.save($scope, $scope.model, function(data) {
                    $uibModalInstance.close(data);
                    toaster.pop('success', '', data.ResultMsg);
                })
            },
            close: function() {
                //关闭
                $uibModalInstance.close();
            }
        }
        informationService.getRoles($scope, {
            isRoleUser: false
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.roles = data.Data.data;
                $scope.roles.forEach(function(obj, index, arr) {
                    if ($scope.model.Roles && obj.Id === $scope.model.Roles[0].Id) {
                        $scope.selected.role = obj;
                    }
                })
            }
        })
    }
])
