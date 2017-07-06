//在线援助
app.controller('limitedWordCtrl', ['$scope', 'gridService', 'limitedWordService', 'dialog', 'toaster', '$state', 'commonApiService', '$filter',
    function($scope, gridService, limitedWordService, dialog, toaster, $state, commonApiService, $filter) {
        $scope.dialog = dialog;
        $scope.query = {};
        $scope.selected = {};

        var ossUpload = FileUpload.BuildUploadObj();
        gridService.gridInit($scope);
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
            headerName: "极限词",
            // checked: true,
            field: "Name",
            width: 100
        }, {
            headerName: "极限词类型",
            checked: true,
            field: "BanReason",
            width: 100,
        }, {
            headerName: "敏感程度",
            checked: true,
            field: "Weight",
            width: 80,
            // }, {
            //     headerName: "创建人",
            //     checked: true,
            //     field: "",
            //     width: 200,
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
            width: 80,
        }, {
            headerName: "审核状态",
            checked: true,
            field: "ExamStatus",
            width: 80,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "审核时间",
            checked: true,
            field: "ExamTime",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "审核人",
            checked: true,
            field: "ExaminantName",
            width: 80,
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {}
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, limitedWordService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            //导出excel
            output: $scope.exportAsExcel, //导出
            add: function() { //添加
                $scope.dialog.show('views/limited-word/limited-word-add.html', 'limitedWordEditCtrl', 'lg', {
                    data: null
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }
                })
            },
            review: function(row) { //审核
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                if (selectedRows.length == 1) {
                    $scope.dialog.show('views/limited-word/limited-word-review.html', 'limitedWordReviewCtrl', 'md', {
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
            edit: function() {
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                $scope.dialog.show('views/limited-word/limited-word-add.html', 'limitedWordEditCtrl', 'lg', {
                    data: selectedRows[0]
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }
                })
            },
            delete: function() {
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                !selectedRows.length ? toaster.pop("warning", "", "请勾选一条数据进行操作！") : limitedWordService.delete($scope, selectedRows[0], function(data) {
                    if (data && data.ResultCode) {
                        toaster.pop('success', '', data.ResultMsg);
                        $scope.event.loadData();
                    }
                })
            },
            search: function() { //搜索
                var createEndTime = new Date((new Date($scope.query.createEndTime)).getTime() + 24 * 60 * 60 * 1000)
                createEndTime = $filter("date")(createEndTime, "yyyy-MM-dd");
                var industryList = [];
                industryList.push($scope.selected.industry);
                var keywordCategoryId = "";
                $scope.selected.keywordCategory === undefined ? keywordCategoryId = "" : keywordCategoryId = $scope.selected.keywordCategory.Id;
                $scope.filter = {
                    Keyword: $scope.query.Keyword || "",
                    CreateId: $scope.selected.addUser || "",
                    EditorId: $scope.selected.refreshUser || "",
                    ExaminantId: $scope.selected.reviewUser || "",
                    CreateTimeMin: $scope.query.createBeginTime || "",
                    CreateTimeMax: $scope.query.createEndTime || "",
                    EditTimeMin: $scope.query.updateBeginTime || "",
                    EditTimeMax: $scope.query.updateEndTime || "",
                    ExamResult: $scope.selected.statusList || "",
                    Weight: $scope.query.sensitivity || "",
                    IndustryList: industryList || [],
                    CommonCategoryId: keywordCategoryId,
                }
                $scope.event.loadData();
            },
            clear: function() {
                $scope.query.Keyword = undefined;
                $scope.selected.industry = undefined;
                $scope.selected.keywordCategory = undefined;
                $scope.selected.addUser = undefined;
                $scope.selected.refreshUser = undefined;
                $scope.selected.reviewUser = undefined;
                $scope.query.sensitivity = undefined;
                $scope.query.createBeginTime = undefined;
                $scope.query.createEndTime = undefined;
                $scope.query.updateBeginTime = undefined;
                $scope.query.updateEndTime = undefined;
                $scope.selected.statusList = undefined;

            },
            dealProblems: function(data, evt) {
                $state.go("admin.limitedWord_deal", {
                    id: data.Id
                })
            },
            fileChange: function(evt) { //批量上传--上传表格
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
                            limitedWordService.uploadFile($scope, {
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
        }]

        commonApiService.getCommonCategoryById($scope, {
            id: "0102"
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.Industries = data.Data.data;
            }
        });

        commonApiService.getCommonCategoryById($scope, {
            id: "0104"
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.keywordCategorys = data.Data.data;
            }
        });

        commonApiService.getUserList($scope, { //获取用户列表
            pageNum: $scope.page.pageNum,
            pageSize: $scope.page.pageSize
        }, function(data) {
            $scope.userLists = data.Data.data;
        })
    }
]);
//极限词新增
app.controller('limitedWordEditCtrl', ['$scope', '$uibModalInstance', 'commonApiService', 'limitedWordService', 'data', '$q', 'toaster',
    function($scope, $uibModalInstance, commonApiService, limitedWordService, data, $q, toaster) {
        var deferred = $q.defer();
        $scope.selected = {};
        $scope.event = {
            save: function() {
                $scope.model.IndustrysList = [];
                $scope.selected.industries && $scope.selected.industries.forEach(function(obj, index, arr) {
                    var industryObj = { Category: "", Industry: "" };
                    industryObj.Category = 1;
                    industryObj.Industry = obj.Id;
                    $scope.model.IndustrysList.push(industryObj);
                });
                $scope.selected.limitedIndustries && $scope.selected.limitedIndustries.forEach(function(obj, index, arr) {
                    var industryObj = { Category: "", Industry: "" };
                    industryObj.Category = 2;
                    industryObj.Industry = obj.Id;
                    $scope.model.IndustrysList.push(industryObj);
                });
                $scope.model.Category = $scope.selected.keywordCategory.Id;
                $scope.model.LawItemList = [];
                $scope.selected.lawItems && $scope.selected.lawItems.forEach(function(obj, index, arr) {
                    $scope.model.LawItemList.push(obj.Id);
                });
                $scope.model.Cases = [];
                $scope.selected.lawDepartment && $scope.selected.lawDepartment.forEach(function(obj, index, arr) {
                    $scope.model.Cases.push(obj.Id);
                });
                if (!data) { //新增
                    limitedWordService.postRecord($scope, $scope.model, function(data) {
                        if (data && data.ResultCode) {
                            $uibModalInstance.close(data);
                            toaster.pop('success', '', data.ResultMsg);
                        }
                    });
                } else { //修改
                    limitedWordService.putRecord($scope, $scope.model, function(data) {
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
        commonApiService.getCommonCategoryById($scope, { //行业类目
            id: "0102"
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.Industries = data.Data.data;
            }
        });
        commonApiService.getCommonCategoryById($scope, { //极限词类型
            id: "0104"
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.keywordCategorys = data.Data.data;
            }
        });
        limitedWordService.getLawItemList($scope, { //法律规则
            pageNum: $scope.page.pageNum,
            pageSize: $scope.pageSize
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.lawItems = data.Data.data;
            }
        });
        limitedWordService.getCaseList($scope, { //法律规则
            pageNum: $scope.page.pageNum,
            pageSize: $scope.pageSize
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.lawDepartments = data.Data.data;
            }
        });
        if (data) {
            limitedWordService.getRecord($scope, data, function(data) {
                if (data && data.ResultCode) {
                    $scope.model = data.Data;
                }
            })
        }
    }
]);
//极限词审核
app.controller('limitedWordReviewCtrl', ['$scope', '$uibModalInstance', 'commonApiService', 'limitedWordService', 'data', '$q', 'toaster',
    function($scope, $uibModalInstance, commonApiService, limitedWordService, data, $q, toaster) {
        $scope.event = {
            save: function() {
                $scope.model.IntId = data.Id;
                $scope.model.StringId = "";
                if ($scope.model && $scope.model.Status) {
                    $scope.model.Status = "已通过";
                } else {
                    $scope.model.Status = "未通过";
                }
                limitedWordService.lawCategoryReview($scope, $scope.model, function(data) {
                    if (data && data.ResultCode) {
                        $uibModalInstance.close(data.ResultCode);
                        toaster.pop("success", "", data.ResultMsg);
                    }
                })
            },
            close: function() {
                $uibModalInstance.close();
            }
        };
    }
])
