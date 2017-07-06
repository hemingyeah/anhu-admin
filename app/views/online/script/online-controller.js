//在线援助
app.controller('onlineCtrl', ['$scope', 'gridService', 'onlineService', 'dialog', 'toaster', '$state', 'commonApiService', '$filter',
    function($scope, gridService, onlineService, dialog, toaster, $state, commonApiService, $filter) {
        $scope.dialog = dialog;
        $scope.query = {};
        // $scope.service = onlineService;
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
            headerName: "问题ID",
            // checked: true,
            field: "Id",
            width: 70
        }, {
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
            width: 150,
        }, {
            headerName: "内容",
            checked: true,
            field: "Content",
            width: 200,
        }, {
            headerName: "处理状态",
            checked: true,
            field: "StatusName",
            width: 80,
        }, {
            headerName: "处理人",
            checked: true,
            field: "EmployeeName",
            width: 80,
        }, {
            headerName: "用户名",
            checked: true,
            field: "UserName",
            width: 100,
        }, {
            headerName: "更新时间",
            checked: true,
            field: "EditTime",
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
        var consMethods = gridService.construtor($scope, onlineService, $scope.gridOptions);
        $scope.event = $.extend(consMethods, {
            //导出excel
            // output: $scope.exportAsExcel,
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
            clear: function() {
                $scope.query.createBeginTime = undefined;
                $scope.query.createEndTime = undefined;
                $scope.query.employeeName = undefined;
                $scope.query.id = undefined;
                $scope.query.workTopicTitle = undefined;
                $scope.selected.workTopic = {};
                $scope.selected.workTopicStatus = {};
            },
            dealProblems: function(data, evt) {
                $state.go("admin.online_deal", {
                        id: data.Id
                    })
                    // $scope.dialog.show('views/online/online-deal.html', 'onlineDealCtrl', 'lg', {
                    //     data: data
                    // }, function(data) {
                    //     if (data) {
                    //         $scope.event.loadData();
                    //     }

                // })
            }
        });

        commonApiService.getCommonCategoryById($scope, { //获取工单类型
            id: "0105"
        }, function(data) {
            $scope.workTopics = data.Data.data;
            $scope.selected = {
                workTopic: $scope.workTopics[0]
            }
        });


        commonApiService.getCode($scope, { //获取工单处理状态
            category: "WorkTopicStatus",
            isValid: true,
            pageNum: 1,
            pageSize: 20
        }, function(data) {
            $scope.workTopicStatus = data.Data.data;
            $scope.selected = {
                workTopicStatus: $scope.workTopicStatus[0]
            }
        })

    }
]);
