// var app = angular.module('PublicApp', ["UrlConfig"]);
app.run(function() {
    //获取菜单数据
    // var id = Request("id") ? Request("id").substr(0, (Request("id") + "#").indexOf('#')) : 1; //获取页面请求参数:id

    // less.modifyVars({
    //  '@public-color': Set.ThemeColor ? Set.ThemeColor : "#478cd0",
    //  '@body-bgColor': Set.bodybgColor ? Set.bodybgColor : "white"
    // });
});
//-------------------------------------指令@表单控件------------------------------------
/**
 * 基于bootstrap封装的基础组件
 * 公用组件的指令都带有"cus"前缀,custom自定义的意思
 * 独孤宇云 2016-9-18
 */
//复选框指令
app.directive('checkBox', [function() {
    return {
        restrict: "E",
        replace: true,
        // require:"ngModel",
        template: function(e, a) {
            var className = 'checkbox';
            if (a.ngclass) {
                className = a.ngclass;
            }
            var html = $('<div class="' + className + '"></div>');
            var label = $('<Label class="i-checks i-checks-sm"></Label>').appendTo(html);
            label.text(a.label ? a.label : "");
            $("<i></i>").prependTo(label);
            var input = $('<input type="checkbox" ng-model="' + a.ngmodel + '" />').prependTo(label);
            input.attr({
                "ng-click": a.ngchange || "",
                "ng-disabled": a.ngdisabled || ""
            });
            for (var item in a) {
                if (item.startsWith("ng-")) {
                    input.attr(item, a[item]);
                }
            }
            html.append(e.context.innerHTML);
            return html[0].outerHTML;
        },
        controller: function($scope) {},
        link: function($scope, element, attr, ngModel) {}
    }
}]);
//文件组件
app.directive("cusFile", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $("<div></div>");
            var item = $('<button class="form-control btn file-btn">').appendTo(html);
            item.html($(
                e).html() || "选择文件")
            var input = $('<input type="file" onchange="angular.element(this).scope().event.fileChange(event)">').appendTo(item);
            if (a.$attr.multiple) {
                input.attr("multiple", "true");
            }
            if (a.$attr.accept) {
                input.attr("accept", a.accept);
            }
            return html[0].outerHTML;
        }
    }
});

//搜索组件
app.directive("cusSearch", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $("<div class='input-group'/>");
            var text = $('<cus-input></cus-input>').appendTo(html);
            if (a.placeholder) {
                text.attr("placeholder", a.placeholder);
            }
            if (a.ngmodel) {
                text.attr("ngmodel", a.ngmodel);
            }
            $('<span class="input-group-addon input-sm"><i class="fa fa-search"></i></span>').appendTo(html);
            return html[0].outerHTML;
        },
        controller: function($scope) {}
    }
});

//单选组件
app.directive("cusRadio", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $('<div class="radio"></div>');
            var label = $('<Label class="i-checks i-checks-sm"></Label>').appendTo(html);
            label.text(a.value ? a.value : "");
            var input = $('<input type="radio" ng-model="' + a.ngmodel + '">').appendTo(label);
            input.attr({
                "ng-click": a.ngchange || "",
                "ng-disabled": a.ngdisabled || ""
            });
            if (a.ngmodel) {
                input.attr("ngmodel", a.ngmodel);
            }
            $("<i></i>").appendTo(label);
            return html[0].outerHTML;
        }
    }
});

//开关组件
app.directive("cusSwitch", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $('<label class="i-switch bg-info m-t-xs"></label>');
            html.addClass(a.class || "");
            var input = $('<input type="checkbox"/>').appendTo(html);
            input.attr("ng-model", a.ngModel);
            $("<i></i>").appendTo(html);
            return html[0].outerHTML;
        }
    }
});

//数字组件
app.directive("cusNumber", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var num = $('<input ui-jq="TouchSpin" type="text" value="0" class="form-control" ng-model=' + a.ngmodel + '>');

            num.attr({
                "data-step": a.step || "1",
                "data-decimals": a.decimals || "0",
                "data-min": a.rangemin || "0",
                "data-max": a.rangemax || "100"
            });
            if (a.buttonstyle === 'top') {
                num.attr({
                    "data-verticalbuttons": true,
                    "data-verticalupclass": "fa fa-caret-up",
                    "data-verticaldownclass": "fa fa-caret-down"
                });
            }
            if (a.typename) {
                if (a.type === "l") {
                    num.attr("data-prefix", a.typename);
                } else if (a.type === "r") {
                    num.attr("data-postfix", a.typename);
                }
            }
            for (var item in a) {
                // if (item.startsWith("ng-")) {
                num.attr(item, a[item]);
                // }
            }
            return num[0].outerHTML;
        }
    }
});

//输入框组件
app.directive("cusInput", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $("<div/>");
            var textbox = $('<input type="text" class="form-control"/>').appendTo(html);
            a.maxlength = a.maxlength || 100;
            if (angular.isDefined(a.required)) {
                textbox[0].attributes.setNamedItem(document.createAttribute('Required'));
                // html.append('<span style="right:14px; color:green;" class="glyphicon glyphicon-ok form-control-feedback" ng-show="form.' + a.ngmodel.replace('.', '_') + '.$dirty && form.' + a.ngmodel.replace('.', '_') + '.$valid"></span>')
            }
            if (a.type) {
                textbox.attr("type", a.type);
            }
            if (a.placeholder) {
                textbox.attr("placeholder", a.placeholder);
            }
            if (a.ngmodel) {
                textbox.attr({
                    "ng-model": a.ngmodel
                });
            }
            if (a.validtype) {
                var pattern = "";
                switch (a.validtype) {
                    case "Phone":
                        pattern = '/^[1][0-9]{10}$/';
                        break;
                    case "EnglishAndNum":
                        pattern = '/^[a-zA-Z0-9]$/';
                        break;
                    case "EnglishAndNumAndUnderline":
                        pattern = '/^[a-zA-Z0-9_]$/';
                        break;
                    case "EnglishAndChineseAndNumAndUnderline":
                        pattern = '/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/';
                        break;
                    case "English":
                        pattern = '/^[a-zA-Z]$/';
                        break;
                    case "IdCardNo":
                        pattern = '/^(\d{18,18}|\d{15,15}|\d{17,17}x)$/';
                        break;
                    case "IpNo":
                        pattern = '/^((([1-9]?|1\d)\d|2([0-4]\d|5[0-5]))\.){3}(([1-9]?|1\d)\d|2([0-4]\d|5[0-5]))$/';
                        break;
                    case "Telephone":
                        pattern = '/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}$/';
                        break;
                    case "Chinese":
                        pattern = '/^[\u4e00-\u9fa5]*$/';
                        break;
                    case "Number":
                        pattern = '/^[0-9]*$/';
                        break;
                }
                if (pattern) {
                    textbox.attr("ng-pattern", pattern);
                }
            }
            if (a.validtype || angular.isDefined(a.required)) {
                html.attr("ng-class", '{"has-error":!form.' + a.ngmodel.replace('.', '_') + '.$valid}')
            }
            if (a.ngdisabled) {
                textbox.attr("ng-disabled", a.ngdisabled);
            } else if (a.disabled === "") {
                textbox.attr("ng-disabled", a.ngdisabled);
            }
            if (a.maxlength) {
                textbox.attr("maxlength", a.maxlength);
            }
            if (a.minlength) {
                textbox.attr("minlength", a.minlength);
            }
            for (var item in a) {
                if (item.startsWith("ng-")) {
                    textbox.attr(item, a[item]);
                }
            }
            return html[0].outerHTML;
        },
        controller: function($scope) {}
    }
});

/**
 * 复合组件
 * 公用组件的指令都带有"cus"前缀,custom自定义的意思
 * 独孤宇云 2016-9-18
 */
app.directive("cusText", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $("<div/>");
            a.maxlength = a.maxlength || 100;

            var row = $((a.morerow ? "<Form-Row/>" : "<cus-form/>")).appendTo(html);
            if (a.padding) row.attr("padding", a.padding);
            if (a.margin) row.attr("margin", a.margin);
            if (a.colspan) row.attr("colspan", a.colspan);
            if (a.label) row.attr("label", a.label);
            var text = $("<cus-input maxlength=" + a.maxlength + "></cus-input>").appendTo(row);
            if (a.required || a.required == '') {
                text[0].attributes.setNamedItem(document.createAttribute('Required'));
                row[0].attributes.setNamedItem(document.createAttribute('Required'));
            }
            if (a.type) text.attr("type", a.type);
            if (a.placeholder) text.attr("placeholder", a.placeholder);
            if (a.ngmodel) text.attr("ngmodel", a.ngmodel);
            if (a.ngdisabled || a.disabled == "") text.attr("ngdisabled", a.ngdisabled);

            return html[0].outerHTML;
        },
        controller: function($scope) {}
    }
});


/**
 * 封装第三方组件
 * 公用组件的指令都带有"cus"前缀,custom自定义的意思
 * 独孤宇云 2016-9-18
 */
//富文本(wangEditor)
app.directive("cusEditor", function() {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        template: function(e, a) {
            var html;
            html = $('<div class="richtext"></div>');
            var textarea = $('<textarea id=' + (a.editorId || 'textarea') + '></textarea>').appendTo(html);
            if (a.style) {
                textarea.attr("style", a.style);
            }
            if (a.ngModel) {
                textarea.attr('ng-model', a.ngModel);
            }
            // for (var item in a) {
            // if (item.startsWith("ng-")) {
            // textarea.attr(item, a[item]);
            // }
            // }
            return html[0].outerHTML;
        },
        controller: function($scope, service) {
            $scope.onchange = function(text) {
                    console.log(text)
                }
                /*            $scope.service = service;
                            $scope.ossUpload = service.FileUpload.BuildUploadObj();

                            //生成imgDom
                            function CreateImgDom(file) {
                                var windowURL = window.URL || window.webkitURL;
                                var $img = $('<img src="" alt="" class="notice">');
                                $img.css({
                                    'width': '70%',
                                    'margin': '5px'
                                });
                                var Url = "http://" + $scope.ossUpload._config.bucket + "." + $scope.ossUpload._config.endpoint.host + "/" + file.Id + file.Extension;
                                $img[0].src = Url;
                                $scope.editor.hideModal();
                                $scope.editor.append($img);
                            }

                            //上传
                            var Upload = function(row) {
                                var GUID = service.FileUpload.BuildGUID();
                                //'Upload/Import/' + GUID 上传到一级目录
                                $scope.ossUpload.upload(service.FileUpload.BuildUploadSetting(row, GUID, function(res) {
                                    $scope.tag = true;
                                    $scope.$apply(function() {
                                        row.state = true;
                                        row.StateName = "已上传";
                                        row.Id = GUID;
                                        row.SavePath = 'Upload/Import/';
                                    });
                                    CreateImgDom(row);
                                    console.log("上传成功！");
                                }, function(res) {
                                    console.log("上传失败！");
                                    row.state = false;
                                    row.StateName = "上传失败"
                                }, function(res) {
                                    $scope.$apply(function() {
                                        row.progress = Math.floor((res.loaded / res.total) * 100);
                                    })
                                }));
                            }
                            $('body').delegate('#files', 'change', function(evt) {
                                var file = evt.target.files[0];
                                $scope.data = [];
                                $scope.data.push(file)
                                file.Extension = file.name.substr(file.name.lastIndexOf('.'));
                                Upload(file)
                            });*/
        },
        link: function($scope, element, attr, ngModel) {
            $scope.editor = new wangEditor(attr.editorId || 'textarea');
            $scope.editor.create();
            if ($scope.model) {
                $scope.editor.$txt.html($scope.model.Content);
            }
            // var $uploadContainer = $('#upload');
            // $scope.editor = $('#' + (attr.richtextid || 'textarea')).wangEditor({
            //     uploadImgComponent: $uploadContainer,
            //     menuConfig: [
            //         // ['viewSourceCode'],
            //         ['bold', 'underline', 'italic', 'foreColor', 'backgroundColor', 'strikethrough'],
            //         ['blockquote', 'fontFamily', 'fontSize', 'setHead', 'justify'],
            //         ['createLink', 'insertTable', 'insertExpression'],
            //         ['insertImage'],
            //         // ['insertImage', 'insertLocation'],
            //         ['undo', 'redo']
            //     ],
            //     onchange: $scope.onchange,
            //     'expressions': $scope.service.expression.getExpressionList()
            // });
            // $scope.editor.html('<p style="text-align: center;"><h1><ol><li><span style="line-height: 1.42857;"><b><font color="#880000">fdasgfad</font></b></span></li></ol></h1></p><img src="http://doc-gtintel.oss-cn-hangzhou.aliyuncs.com/Upload/Import/27811adc-9cd7-4c7d-8ec4-bb2c526da9f8.jpg" alt="" style="width: 70%; margin: 5px;">')
            element.css({
                // 'margin-top': '10px',
                'height': '360px'
            });
        }
    }
});



//------------------------------------指令@布局控件---------------------------
/**
 * 布局组件
 * 公用组件的指令都带有"cus"前缀,custom自定义的意思
 * 独孤宇云 2016-9-18
 */
//面板组件
app.directive("cusPanel", function() {
    return {
        restrict: "E",
        replace: true,
        scope: false,
        template: function(e, a) {
            var html = $('<div class="panel panel-default"></div>');
            if (e.attr('style')) {
                html.attr('style', e.attr('style'));
            }
            if (a.add || a.Edit) {
                html.css("margin-right", 5);
            }

            if ($("phead", e).length > 0) {
                var head = $('<div class="panel-heading font-bold"><span>' + $("phead:eq(0)", e).html() + '</span></div>').appendTo(html);
                if (a.dialog === "") {
                    $('<div style="float:right;cursor:pointer;" ng-click="event.Close()"><i class="icon-gt-delete"></i></div>').appendTo(head);
                }
                //是否聚合按钮
                if (a.record === "") {
                    $('<div style="float:right;cursor:pointer;" ng-click="event.Record(Model, $event)"><i class="icon-gt-record" style="color:#929292;"></i></div>').appendTo(head);
                }
                if (a.edit) {
                    var editName = a.edit === "" ? "EditElse" : a.edit;
                    $('<div style="float:right;cursor:pointer;" ng-click="event.' + editName + '(Model, $event)"><i class="Btn btn-edit" style="color:#929292;">编辑</i></div>').appendTo(head);
                }
                if (a.add) {
                    var addName = a.add === "" ? "AddElse" : a.add;
                    $('<div style="float:right;cursor:pointer;" ng-click="event.' + addName + '(Model, $event)"><a class="btn-link"><span class="btn-add"></span>保存</a></div>').appendTo(head);
                }
                if (a.expand === "") {
                    head.attr("ng-click", "PanelEvent.ToggleBody()").css("cursor", "pointer");
                }
                if (a.selectuser) {
                    $('<div style="float:right;cursor:pointer;" ng-transclude> <selectuser button="true"></selectuser></div>').appendTo(head);
                }
            }
            if ($("pbody", e).length > 0) {
                var body = $('<div class="panel-body"></div>').appendTo(html);
                if (a.expand === "") {
                    $(body).attr("ng-hide", "HideBody");
                }
                body.html($("pbody", e).html());
                if ($("pbody", e).attr("style")) {
                    body.attr("style", $("pbody", e).attr("style"));
                }
            }
            if ($("pfoot", e).length > 0) {
                html.append('<div class="panel-footer text-center">' + $("pfoot", e).html() + '</div>');
            }
            return html[0].outerHTML;
        },
        link: function($scope, element, attr, ngModel) {
            $scope.HideBody = false;
            if (attr.hidebody === "") {
                $scope.HideBody = true;
            }
            $scope.PanelEvent = {
                ToggleBody: function() {
                    $scope.HideBody = !$scope.HideBody;
                }
            }
        }
    }
});

//输入框组组件
app.directive("cusForm", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            a.colspan = a.colspan ? a.colspan : 2;
            var html = $('<div class="form-group"></div>');
            var label = $('<label class="control-label"></label>').appendTo(html);
            label.addClass('col-sm-' + a.colspan);
            if (a.required || a.required == '') {
                label.addClass("GT-Must").addClass('col-sm-' + a.colspan);
            }
            var content = $('<div></div>').appendTo(html);
            content.html($(e.context).html());
            content.addClass('col-sm-' + (a.colspan === '12' ? a.colspan : (12 - parseInt(a.colspan))));
            if (a.label) {
                label.text(a.label);
            } else {
                content.addClass('col-sm-offset-' + a.colspan);
            }
            // for (var item in a) {
            //     if (item.startsWith("ng-")) {
            //         html.attr(item, a[item]);
            //     }
            // }
            return html[0].outerHTML;
        },
        replace: true,
        controller: function($scope) {},
        link: function($scope, element, attr, ngModel) {}
    }
});

//输入框组组件
// app.directive("formRow", function() {
//     return {
//         restrict: "E",
//         replace: true,
//         transclude: true,
//         template: function(e, a) {
//             var html = $('<div class="form-group"></div>');
//             if (a.padding) {
//                 html.css("padding", a.padding)
//             }
//             var label = $('<label class="control-label"></label>').appendTo(html);
//             if (a.margin) {
//                 label.css("margin", a.margin)
//             }
//             if (a.required || a.required == '') {
//                 label.addClass("GT-Must").addClass('col-sm-' + a.colspan);
//             }
//             var content = $('<div ng-transclude></div>').appendTo(html);
//             if (a.label) {
//                 label.text(a.label);
//             } else {
//                 content.addClass('col-sm-offset-' + a.colspan);
//             }
//             return html[0].outerHTML;
//         },
//         controller: function($scope, service) {},
//         link: function($scope, element, attr, ngModel) {}
//     }
// });

//布局组件
app.directive("layout", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $('<div class="hbox hbox-auto-xs bg-light"></div>');
            angular.forEach(e[0].children, function(obj, i) {
                var $item = $('<div class="col lter b-r"><div class="vbox"></div></div>').appendTo(html);
                var $width = $(obj).attr("width");
                if ($(obj).attr("hidefilter")) {
                    $item.attr("ng-hide", "true");
                };
                if ($(obj).attr("label")) {
                    var title = $('<div class="wrapper b-b" style="height:50px;"><div class="font-thin h4" style="float:left;">' + $(obj).attr("label") + '</div></div>').appendTo($(".vbox", $item));
                    if ($(obj).attr("event")) {
                        title.append('<ButtonBar event="' + $(obj).attr("event") + '" style="float:right;"></ButtonBar>');
                    }
                }
                var content = $('<div class="row-row"><div class="cell scroll"><div class="cell-inner" ' + (obj.attributes.bgcolor ? 'style="background-color:' + obj.attributes.bgcolor.value + '"' : "") + '></div></div></div>').appendTo($(".vbox", $item));
                $(".cell-inner", content).html($(obj).html());
                if ($width) {
                    if ($width === 'sm') {
                        $item.addClass('w');
                    } else {
                        $item.width($width);
                    }
                } else {
                    $(".cell-inner", content).css("padding", "10px 10px 10px 6px");
                }
            })
            return html[0].outerHTML;
        }
    }
});

//
app.directive("dialog", function() {
    return {
        restrict: "A",
        replace: true,
        link: function(scope, e, a) {
            e.css("margin-bottom", 0);
            e.css("padding-bottom", 0);
        }
    }
});

app.directive("loginQq", function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: function() {
            return "tpl/blocks/login-qq.html";
        },
        link: function(scope, e, a) {},
        controller: function($scope) {
            $scope.config = {
                show: false
            }
        }
    }
});

//五星评级组件
app.directive('stars', stars);

function stars() {
    var directive = {
        restrict: 'AE',
        template: '<ul class="rating" ng-mouseleave="leave()">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' +
            '<i class="glyphicon glyphicon-star stars"></i>' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            hoverValue: '=',
            max: '=',
            onHover: '=',
            onLeave: '='
        },
        controller: startsController,

        link: function(scope, elem, attrs) {
            elem.css("display", "block");
            elem.css("text-align", "left");
            var updateStars = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };
            updateStars();

            var updateStarsHover = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.hoverValue
                    });
                }
            };
            updateStarsHover();

            scope.$watch('ratingValue', function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
            scope.$watch('hoverValue', function(oldVal, newVal) {
                if (newVal) {
                    updateStarsHover();
                }
            });
        }


    };

    return directive;

    /** @ngInject */
    function startsController($scope) {
        // var vm = this;
        $scope.click = function(val) {
            $scope.ratingValue = val;
        };
        $scope.over = function(val) {
            $scope.hoverValue = val;
        };
        $scope.leave = function() {
            $scope.onLeave();
        }

    }
};
app.directive("zTree", function($timeout) {
        return {
            restrict: 'A',
            require: ['zTree'],
            controller: function($scope, userRoleService) {
                this.getPermission = function(fun) {
                    userRoleService.getPermission($scope, {
                        category: "0203",
                        parentId: ""
                    }, function(data) {
                        if (fun) fun(data);
                    })
                };
                this.getRecord = function(scope, fun) {
                    if (scope.model.Id) { //编辑
                        userRoleService.getRecord(scope, {
                            id: scope.model.Id
                        }, function(data) {
                            if (fun) fun(data);
                        })
                    } else { //新增
                        if (fun) fun(null)
                    }
                }
            },
            // controller: 'testCtrl',
            link: function($scope, element, attrs, ctrls) {
                var zTreeCtrl = ctrls[0];
                zTreeCtrl.getRecord($scope, function(data) {
                    if (data) {
                        var selectedPermission = data.Data.RolePermissions;
                    } else {
                        var selectedPermission = [];
                    }
                    zTreeCtrl.getPermission(function(data) {
                        $scope.ztree = $.fn.zTree.init(element, $scope[attrs.setting], data.Data);
                        var zTreeNodes = $scope.ztree.getNodes();
                        zTreeNodes.forEach(function(obj, index, arr) {
                            selectedPermission.forEach(function(obj1, index1, arr1) {
                                if (obj.Id === obj1.PermissionId) {
                                    $scope.ztree.checkNode(obj, true, true);
                                }
                            })
                        })
                    })
                })
            }
        }
    })
    //用户管理角色管理权限树指令
app.directive("zTreeRole", function($timeout) {
    return {
        restrict: 'A',
        require: ['zTreeRole'],
        controller: function($scope, roleService) {
            this.getPermission = function(fun) {
                roleService.getPermission($scope, {
                    category: "0201",
                    parentId: ""
                }, function(data) {
                    if (fun) fun(data);
                })
            };
            this.getRecord = function(scope, fun) {
                if (scope.model.Id) { //编辑
                    roleService.getRecord(scope, {
                        id: scope.model.Id
                    }, function(data) {
                        if (fun) fun(data);
                    })
                } else { //新增
                    if (fun) fun(null)
                }
            }
        },
        // controller: 'testCtrl',
        link: function($scope, element, attrs, ctrls) {
            var zTreeCtrl = ctrls[0];
            zTreeCtrl.getRecord($scope, function(data) {
                if (data) {
                    var selectedPermission = data.Data.RolePermissions;
                } else {
                    var selectedPermission = [];
                }
                zTreeCtrl.getPermission(function(data) {
                    $scope.ztree = $.fn.zTree.init(element, $scope[attrs.setting], data.Data);
                    var zTreeNodes = $scope.ztree.getNodes();
                    zTreeNodes.forEach(function(obj, index, arr) {
                        selectedPermission.forEach(function(obj1, index1, arr1) {
                            if (obj.Id === obj1.PermissionId) {
                                $scope.ztree.checkNode(obj, true, true);
                            }
                        })
                    })
                })
            })
        }
    }
})
