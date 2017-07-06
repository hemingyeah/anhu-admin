app.factory('ztreeSettingService', function () {
    return {
        constructor: function ($scope, attr, getAsyncUrl) {
            var p = (attr.cp || "") + (attr.cc || "");
            var id = FileUpload.BuildGUID();
            attr.multiselect = attr.multiselect || "true";
            attr.globalsingle = attr.globalsingle || "true";
            attr.selectmode = attr.selectmode || "true";
            var chkStyle = attr.multiselect === "true" ? "checkbox" : "radio";
            var radioType = attr.globalsingle === "true" ? "all" : "level";
            var setting = {
                treeId: id,
                async: {
                    contentType: "application/json",
                    enable: false,
                    type: "GET",
                    url: getAsyncUrl
                },
                edit: {
                    enable: attr.edit
                },
                check: {
                    enable: attr.selectmode === "true",
                    chkboxType: {
                        "Y": p,
                        "N": p
                    },
                    chkStyle: chkStyle,
                    radioType: radioType
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
                        isParent: "IsParent",
                        open: "IsOpen",
                        children: "Child"
                    }
                },
                view: {
                    showLine: false
                },
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        $scope.$apply(function () {
                            if (attr.tree) {
                                $scope[attr.tree].SelectNode = treeNode;
                            } else {
                                $scope.SelectNode = treeNode;
                            }
                        });
                    },
                    onCheck: function (event, treeId, treeNode) {
                        $scope.$apply(function () {
                            if (attr.tree && $scope[attr.tree].checkFun) {
                                $scope[attr.tree].checkFun(treeNode);
                            }
                        });
                    },
                    onNodeCreated: function (event, treeId, treeNode) {
                        $scope.$apply(function () {
                            if (attr.tree && $scope[attr.tree].createNode) {
                                $scope[attr.tree].createNode(treeNode);
                            }
                        });
                    },
                    onAsyncSuccess: $scope.asyncSuccess
                }
            };
            return setting;
        }
    }
});