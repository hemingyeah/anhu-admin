//表格指令
app.directive("cusGrid", ['$compile', '$translate', '$interpolate', function($compile, $translate, $interpolate) {

    return {
        restrict: "E",
        template: function(element, attr) {
            var html = $('<div id="iscs-main" class="text-center" style="position: relative;"></div>');
            var div = $('<div class="custom-fresh" id="customGrid"></div>');
            var pager = $('<uib-pagination ng-model="currentPage" ng-change="pageChanged()" items-per-page="page.pageSize" template-url="/views/template/pagination.html" max-size="maxSize" class="pagination-sm" boundary-links="true" rotate="false"></uib-pagination>')
            var pageSize = '<div class="float-right table-paging mrg20T" >' + '<select ng-options="option.name for option in page.pageSize track by option.id" ng-model="page.selectedPageSize" ng-change="onPageSizeChanged(page.selectedPageSize)" ></select>' + '<span>条记录/页</span></div>';
            html.append(div);
            pager.attr({
                "total-items": "totalItems"
            });
            if (angular.isDefined(attr.style)) {
                div.attr("style", attr.style);
            }else{
                div.attr("style", "text-align: left;height:460px; width: 100%;");
            }
            if (angular.isDefined(attr.gridConfig)) {
                div.attr("ag-grid", attr.gridConfig);
            }
            if (!angular.isDefined(attr.pagination)) {
                html.append(pager);
                // html.append(pageSize);//暂停使用分页大小
            }
            return html[0].outerHTML;
        },
        link: function($scope, element, attr, ctrl) {
            if (angular.isDefined(attr.no) && attr.no === 'false') { //移除序列号
                $scope[attr.gridConfig].columnApi.setColumnVisible('no', false);
                $scope[attr.gridConfig].columnDefs[0].checked = false;
            }
            if (angular.isDefined(attr.checkBox) && attr.checkBox === 'false') { //移除复选框
                $scope[attr.gridConfig].columnApi.setColumnVisible('checkBox', false);
                $scope[attr.gridConfig].columnDefs[1].checked = false;
            }
            if (angular.isDefined(attr.edit) && attr.edit === 'false') { //移除操作列
                $scope[attr.gridConfig].columnApi.setColumnVisible('edit', false);
                $scope[attr.gridConfig].columnDefs[2].checked = false;
            }
            element.find('#south').remove(); //弃用ag-grid原生的分页工具
            $scope.event.loadData();
        },

        controller: ['$scope', '$compile', function($scope, $compile) {
            $scope.flag = false;
            $scope.onPageSizeChanged = function(data) {
                $scope.page.pageNum = $scope.currentPage = 1;
                $scope.event.loadData();
            };
            $scope.pageChanged = function() {
                $scope.page.pageNum = $scope.currentPage;
                $scope.event.loadData();
            };
            $scope.save = function() {
                $scope.columns.forEach(function(obj, index) {
                    if (!obj.checked) {
                        $scope.gridOptions.columnApi.setColumnVisible(obj.field, false);
                    } else {
                        $scope.gridOptions.columnApi.setColumnVisible(obj.field, true);
                    }
                });
                $scope.getGridWidth();
                $scope.flatGrid();
                $scope.flag = false;
            };
            $scope.close = function() {
                $scope.flag = false;
            };
            //初始化列选中状态
            $scope.initColumnsState = function() {
                $scope.columns.forEach(function(obj, index) {
                    if (!obj.checked) {
                        $scope.gridOptions.columnApi.setColumnVisible(obj.field, false);
                    }
                })
            };
        }]
    }
}]);
