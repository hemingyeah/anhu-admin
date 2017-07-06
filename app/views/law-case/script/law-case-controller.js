app.controller('lawCaseCtrl', ['$scope', 'gridService', 'lawCaseService', 'dialog', 'toaster', '$state', 'commonApiService', '$filter',
    function($scope, gridService, lawCaseService, dialog, toaster, $state, commonApiService, $filter) {
        $scope.dialog = dialog;
        $scope.query = {};
        // $scope.service = lawLetter;
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
            headerName: "案例编号",
            // checked: true,
            field: "Id",
            width: 80
        }, {
            headerName: "案例名称",
            checked: true,
            field: "Title",
            width: 180
        }, {
            headerName: "案例字号",
            checked: true,
            field: "No",
            width: 80
                // }, {
                //     headerName: "审理部门",
                //     checked: true,
                //     field: "EditorName",
                //     width: 200,
        }, {
            headerName: "来源标题",
            checked: true,
            field: "SourceTitle",
            width: 120
        }, {
            headerName: "来源URL",
            checked: true,
            field: "SourceUrl",
            width: 100
        }, {
            headerName: "来源截图",
            checked: true,
            field: "SourceImgPath",
            width: 80
        }, {
            headerName: "来源发布时间",
            checked: true,
            field: "SourcePublishTime",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
                // }, {
                //     headerName: "创建人",
                //     checked: true,
                //     field: "imgPath",
                //     width: 100,
        }, {
            headerName: "创建时间",
            checked: true,
            field: "CreateTime",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "更新人",
            checked: true,
            field: "EditorName",
            width: 80,
        }, {
            headerName: "更新时间",
            checked: true,
            field: "EditTime",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }, {
            headerName: "审核状态",
            checked: true,
            field: "ExamStatus",
            width: 80,
        }, {
            headerName: "审核人",
            checked: true,
            field: "ExaminantName",
            width: 80,
        }, {
            headerName: "审核时间",
            checked: true,
            field: "ExamTime",
            width: 150,
            cellRenderer: $scope.dateTimeToFormatFunc
        }]);
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {},
            rowSelection: 'single' //单选
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope, lawCaseService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            //导出excel
            output: $scope.exportAsExcel, //导出
            add: function() { //添加
                $scope.dialog.show('views/law-case/law-case-add.html', 'lawCaseEditCtrl', 'lg', {
                    data: null
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }

                })
            },
            edit: function(row) {
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                $scope.dialog.show('views/law-case/law-case-add.html', 'lawCaseEditCtrl', 'lg', {
                    data: row || selectedRows[0]
                }, function(data) {
                    if (data) {
                        $scope.event.loadData();
                    }

                })
            },
            delete: function(row) {
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                !selectedRows.length ? toaster.pop("warning", "", "请勾选一条数据仅进行操作！") : lawCaseService.delete($scope, selectedRows[0], function(data) {
                    if (data && data.ResultCode) {
                        toaster.pop('success', '', data.ResultMsg);
                        $scope.event.loadData();
                    }
                })
            },
            review: function(row) { //审核
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                if (selectedRows.length == 1) {
                    $scope.dialog.show('views/law-case/law-case-review.html', 'lawCaseReviewCtrl', 'md', {
                        data: row || selectedRows[0]
                    }, function(data) {
                        if (data) {
                            $scope.event.loadData();
                        }
                    })
                } else {
                    toaster.pop("warning", "", "请勾选一条数据进行操作！");
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
                    ExamResult: $scope.selected.statusList || "",
                    LawList: []
                }
                $scope.event.loadData();
            },
            clear: function() {
                $scope.query.Title = undefined;
                $scope.query.Law = undefined;
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
                $state.go("admin.lawLetter", {
                        id: data.Id
                    })
                    // $scope.dialog.show('views/lawLetter/lawLetter-deal.html', 'lawLetter', 'lg', {
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
                            lawCaseService.uploadFile($scope, {
                                filePath: evt.target.files[0].excelUrl
                            }, function(data) {
                                if (data && data.ResultCode) {
                                    toaster.pop('success', '', data.ResultMsg);
                                }
                            })
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
//案例库修改
app.controller("lawCaseEditCtrl", ['$scope', '$uibModalInstance', 'commonApiService', 'lawCaseService', 'data', '$q', 'toaster',
    function($scope, $uibModalInstance, commonApiService, lawCaseService, data, $q, toaster) {
        var deferred = $q.defer();
        $scope.selected = {};
        $scope.data = data;
        var ossUpload = FileUpload.BuildUploadObj();
        $scope.event = {
            save: function() {
                // $scope.model.SourceImgPath = $scope.imageFile.pocUrl;
                $scope.model.LawItems = [];
                $scope.selected.LawType && $scope.selected.LawType.forEach(function(obj, index, arr) {
                    $scope.model.LawItems.push(obj.Id);
                });
                if (!data) { //新增
                    lawCaseService.postRecord($scope, $scope.model, function(data) {
                        if (data && data.ResultCode) {
                            $uibModalInstance.close(data);
                            toaster.pop('success', '', data.ResultMsg);
                        }
                    });
                } else { //修改
                    lawCaseService.putRecord($scope, $scope.model, function(data) {
                        if (data && data.ResultCode) {
                            $uibModalInstance.close(data);
                            toaster.pop('success', '', data.ResultMsg);
                        }
                    });
                }

            },
            close: function() {
                $uibModalInstance.close();
            },
            fileChange: function(evt) {
                var picFormat = ["JPG", "PNG", "GIF", "JPEG"];
                var extension = evt.target.files[0].name.substr(evt.target.files[0].name.lastIndexOf('.') + 1);
                if ($.inArray(extension.toLocaleUpperCase(), picFormat) === -1) {
                    toaster.pop('warning', '', '您所上传的非图片格式文件，请重新上传！');
                } else {
                    var GUID = FileUpload.BuildGUID();
                    ossUpload.upload(FileUpload.BuildUploadSetting(evt.target.files[0], GUID, function(res) {
                        $scope.$apply(function() {
                            evt.target.files[0].state = "已上传";
                            evt.target.files[0].picUrl = appConfig.aliyun.domain + "/" + GUID + evt.target.files[0].name.substr(evt.target.files[0].name.lastIndexOf('.'));
                            $scope.model.SourceImgPath = evt.target.files[0].picUrl;
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
        };
        lawCaseService.loadLaw($scope, { //获取法律规则
            pageNum: $scope.page.pageNum,
            pageSize: $scope.page.pageSize
        }, function(data) {
            if (data && data.ResultCode) {
                $scope.LawTypes = data.Data.data;
            }
        });
        if (data) {
            lawCaseService.getRecord($scope, data, function(data) {
                if (data && data.ResultCode) {
                    $scope.model = data.Data;
                }
            })
        }
    }
]);
//案例审核
app.controller("lawCaseReviewCtrl", ['$scope', '$uibModalInstance', 'commonApiService', 'lawCaseService', 'data', '$q', 'toaster',
    function($scope, $uibModalInstance, commonApiService, lawCaseService, data, $q, toaster) {
        $scope.event = {
            save: function() {
                $scope.model.IntId = 0;
                $scope.model.StringId = data.Id;
                if ($scope.model && $scope.model.Status) {
                    $scope.model.Status = "已通过";
                } else {
                    $scope.model.Status = "未通过";
                }
                lawCaseService.caseReview($scope, $scope.model, function(data) {
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
