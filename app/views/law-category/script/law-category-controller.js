//法律类目库
app.controller('lawCategoryCtrl', ['$scope', 'gridService', 'lawCategoryService', 'dialog', 'toaster', '$state', 'commonApiService', '$filter',
    function($scope, gridService, lawCategoryService, dialog, toaster, $state, commonApiService, $filter) {
        $scope.dialog = dialog;
        $scope.query = {};
        // $scope.service = lawCategory;
        $scope.selected = {};
        gridService.gridInit($scope);
        var ossUpload = FileUpload.BuildUploadObj();

        //构造业务按钮
        $scope.businessBtns = [{
            "code": "output",
            "name": "批量导出",
            "index": 1010,
            "icon": "fa fa-pencil",
            "group": false
        }, {
            "code": "review",
            "name": "审核",
            "index": 1010,
            "icon": "fa fa-pencil",
            "group": false
        }]
        $scope.columnDefs = $scope.columnDefs.concat([{
            headerName: "编号",
            // checked: true,
            field: "Id",
            width: 80
        }, {
            headerName: "法律规则名称",
            checked: true,
            field: "Title",
            width: 120,
            cellRenderer: function(params) {
                    return "<a class='iscs-table-details' ng-click='event.dealProblems(data, $event)'>" + params.data.Title + "</a>";
                }
                // }, {
                //     headerName: "发文字号",
                //     checked: true,
                //     field: "No",
                //     width: 80
        }, {
            headerName: "内容",
            checked: true,
            field: "Content",
            width: 200
        }, {
            headerName: "发布日期",
            checked: true,
            field: "IssuedDate",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "施行时间",
            checked: true,
            field: "EffectiveDate",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "修改依据",
            checked: true,
            field: "TimeValidName",
            width: 100,
        }, {
            headerName: "来源链接",
            checked: true,
            field: "Source",
            width: 100
        }, {
            headerName: "来源截图",
            checked: true,
            field: "ImgPath",
            width: 80
        }, {
            headerName: "创建时间",
            checked: true,
            field: "CreateTime",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "更新时间",
            checked: true,
            field: "EditTime",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "更新人",
            checked: true,
            field: "EditorName",
            width: 80
        }, {
            headerName: "审核状态",
            checked: true,
            field: "ExamStatus",
            width: 100
        }, {
            headerName: "审核时间",
            checked: true,
            field: "ExamTime",
            width: 100,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "审核人",
            checked: true,
            field: "ExaminantName",
            width: 100
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {},
            rowSelection: 'single' //单选
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, lawCategoryService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            //导出excel
            output: $scope.exportAsExcel, //导出
            add: function() { //添加
                $scope.dialog.show('views/law-category/law-category-add.html', 'lawCategoryEditCtrl', 'lg', {
                    data: null
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }
                })
            },
            edit: function(row) {
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                $scope.dialog.show('views/law-category/law-category-add.html', 'lawCategoryEditCtrl', 'lg', {
                    data: row || selectedRows[0]
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }
                })
            },
            delete: function(row) {
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                var deleteData = undefined;
                if (selectedRows.length) {
                    deleteData = selectedRows[0];
                } else {
                    deleteData = row;
                }
                deleteData === undefined ? toaster.pop("warning", "", "请勾选一条数据进行操作！") : lawCategoryService.delete($scope, deleteData, function(data) {
                    if (data && data.ResultCode) {
                        toaster.pop('success', '', data.ResultMsg);
                        $scope.event.loadData();
                    }
                })
            },
            review: function(row) { //审核
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                if (selectedRows.length == 1) {
                    $scope.dialog.show('views/law-category/law-category-review.html', 'lawCategoryReviewCtrl', 'md', {
                        data: row || selectedRows[0]
                    }, function(data) {
                        if (data) {
                            $scope.event.loadData();
                        }
                    })
                } else {
                    toaster.pop("warning", "", "请勾选一条数据进操作！");
                }
            },
            search: function() { //搜索
                var createEndTime = new Date((new Date($scope.query.createEndTime)).getTime() + 24 * 60 * 60 * 1000)
                createEndTime = $filter("date")(createEndTime, "yyyy-MM-dd");
                $scope.filter = {
                    Title: $scope.query.Title || "",
                    ExaminantId: $scope.selected.reviewUser || "",
                    EditorId: $scope.selected.refreshUser || "",
                    CreateId: $scope.selected.addUser || "",
                    CreatedTimeMin: $scope.query.createBeginTime || "",
                    CreatedTimeMax: $scope.query.createEndTime || "",
                    EditTimeMin: $scope.query.updateBeginTime || "",
                    EditTimeMax: $scope.query.updateEndTime || "",
                    ExamTimeMin: $scope.query.examBeginTime || "",
                    ExamTimeMax: $scope.query.examEndTime || "",
                    ExamResult: $scope.selected.statusList
                }
                $scope.event.loadData();
            },
            clear: function() {
                $scope.query.Title = undefined;
                $scope.selected.reviewUser = undefined;
                $scope.selected.refreshUser = undefined;
                $scope.selected.addUser = undefined;
                $scope.query.createBeginTime = undefined;
                $scope.query.createEndTime = undefined;
                $scope.query.updateBeginTime = undefined;
                $scope.query.updateEndTime = undefined;
                $scope.query.examBeginTime = undefined;
                $scope.query.examEndTime = undefined;
                $scope.selected.statusList = undefined;
            },
            dealProblems: function(data, evt) {
                $state.go("admin.lawCategory", {
                        id: data.Id
                    })
                    // $scope.dialog.show('views/lawCategory/lawCategory-deal.html', 'lawCategory', 'lg', {
                    //     data: data
                    // }, function(data) {
                    //     if (data) {
                    //         $scope.event.loadData();
                    //     }
                    // })
            },
            fileChange: function(evt) {
                debugger
                var picFormat = ["XLS"];
                var extension = evt.target.files[0].name.substr(evt.target.files[0].name.lastIndexOf('.') + 1);
                if ($.inArray(extension.toLocaleUpperCase(), picFormat) === -1) {
                    toaster.pop('warning', '', '您所上传的文件格式不正确，请重新上传！');
                } else {
                    var GUID = FileUpload.BuildGUID();
                    ossUpload.upload(FileUpload.BuildUploadSetting(evt.target.files[0], GUID, function(res) {
                        $scope.$apply(function() {
                            evt.target.files[0].state = "已上传";
                            evt.target.files[0].excelUrl = appConfig.aliyun.domain + "/" + GUID + evt.target.files[0].name.substr(evt.target.files[0].name.lastIndexOf('.'));
                            lawCategoryService.uploadFile($scope, {
                                filePath: evt.target.files[0].excelUrl
                            }, function(data) {
                                if (data && data.ResultCode) {
                                    toaster.pop('success', '', data.ResultMsg);
                                }
                            });
                        });
                    }, function(res) {
                        console.log("上传失败！");
                        evt.target.files[0].state = false;
                    }, function(res) {
                        $scope.$apply(function() {
                            evt.target.files[0].progress = Math.floor((res.loaded / res.total) * 100);
                            console.log(evt.target.files[0].progress);
                        })
                    }));
                }
            }
        });
        $scope.statusLists = [{
            Id: 1,
            Name: "待审核"
        }, {
            Id: 2,
            Name: "已通过"
        }, {
            Id: 3,
            Name: "未通过"
        }];
        commonApiService.getUserList($scope, { //获取用户列表
            pageNum: $scope.page.pageNum,
            pageSize: $scope.page.pageSize
        }, function(data) {
            $scope.userLists = data.Data.data;
        });
    }
]);

//法律类目库 修改
app.controller('lawCategoryEditCtrl', ['$scope', '$uibModalInstance', 'commonApiService', 'lawCategoryService', 'data', '$q', 'toaster',
    function($scope, $uibModalInstance, commonApiService, lawCategoryService, data, $q, toaster) {
        var deferred = $q.defer();
        $scope.data = data;

        function initUiSelect(data) {
            $scope.lawDepartments.forEach(function(obj, index, arr) {
                if (obj.Id === data.Id) {
                    $scope.selected.lawDepartment = obj;
                }

            });
            $scope.LawCategories.forEach(function(obj, index, arr) {
                if (obj.Id === data.Id) {
                    $scope.selected.LawCategory = obj;
                }

            });
            $scope.LawTypes.forEach(function(obj, index, arr) {
                if (obj.Id === data.Id) {
                    $scope.selected.LawType = obj;
                }

            });
            $scope.LawTimeValids.forEach(function(obj, index, arr) {
                if (obj.Id === data.Id) {
                    $scope.selected.LawTimeValid = obj;
                }

            });
        }
        $scope.event = {
            save: function() {
                $scope.model.Publisher = $scope.selected.lawDepartment.Name;
                $scope.model.TimeValidId = $scope.selected.LawTimeValid.Id;
                $scope.model.TimeValidName = $scope.selected.LawTimeValid.Name;
                $scope.model.CategoryId = $scope.selected.LawCategory.Id;
                $scope.model.CategoryName = $scope.selected.LawCategory.Name;
                $scope.model.TypeId = $scope.selected.LawCategory.Id;
                $scope.model.TypeName = $scope.selected.LawCategory.Name;
                if (!data) { //新增
                    lawCategoryService.postRecord($scope, $scope.model, function(data) {
                        if (data && data.ResultCode) {
                            $uibModalInstance.close(data);
                            toaster.pop('success', '', data.ResultMsg);
                        }
                    });
                } else { //修改
                    lawCategoryService.putRecord($scope, $scope.model, function(data) {
                        if (data && data.ResultCode) {
                            $uibModalInstance.close(data);
                            toaster.pop('success', '', data.ResultMsg);
                        }
                    });
                }
            },
            close: function() {
                $uibModalInstance.close();
            }
        };
        commonApiService.getCommonCategoryById($scope, { //法律法规发布部门
            id: "0103"
        }, function(data) {
            $scope.lawDepartments = data.Data.data;
            $scope.selected = {
                lawDepartment: $scope.lawDepartments[0]
            }
        });

        commonApiService.getCode($scope, { //LawCategory 效力级别
            category: "LawCategory",
            isValid: true
        }, function(data) {
            $scope.LawCategories = data.Data.data;
            $scope.selected = {
                LawCategory: $scope.LawCategories[0]
            }
        });

        commonApiService.getCode($scope, { //LawType 法规类别
            category: "LawType",
            isValid: true
        }, function(data) {
            $scope.LawTypes = data.Data.data;
            $scope.selected = {
                LawType: $scope.LawTypes[0]
            }
        });

        commonApiService.getCode($scope, { //LawTimeValid 时效性
            category: "LawTimeValid",
            isValid: true
        }, function(data) {
            $scope.LawTimeValids = data.Data.data;
            $scope.selected = {
                LawTimeValid: $scope.LawTimeValids[0]
            }
        });

        if (data) {
            lawCategoryService.getRecord($scope, data, function(data) {
                if (data && data.ResultCode) {
                    $scope.model = data.Data;
                    initUiSelect($scope.model);
                }
            })
        }
    }
])

//法律类目库 审核
app.controller('lawCategoryReviewCtrl', ['$scope', '$uibModalInstance', 'lawCategoryService', 'data', 'toaster',
    function($scope, $uibModalInstance, lawCategoryService, data, toaster) {
        $scope.event = {
            save: function() {
                $scope.model.IntId = 0;
                $scope.model.StringId = data.Id;
                if ($scope.model && $scope.model.Status) {
                    $scope.model.Status = "已通过";
                } else {
                    $scope.model.Status = "未通过";
                }
                lawCategoryService.lawCategoryReview($scope, $scope.model, function(data) {
                    if (data && data.ResultCode) {
                        $uibModalInstance.close(data.ResultCode);
                        toaster.pop("success", "", data.ResultMsg);
                    }
                })
            },
            close: function() {
                $uibModalInstance.close();
            }
        }
    }
])
