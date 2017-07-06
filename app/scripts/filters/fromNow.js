'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('fromNow', function() {
        return function(date) {
            return moment(date).fromNow();
        }
    }).filter('codeToName', function() {
        return function(data) {
            switch (data) {
                case 1:
                    return "已确认违禁";
                    break;
                case 2:
                    return "已确认非违禁";
                    break;
                case 0:
                    return "待确认";
                    break;
                default:
                    return "待确认";
                    break;
            }
        }
    }) //关键词高亮
    .filter('highlight', ['$sce', function($sce) {
        return function(context, obj) {
            var subContext = context.slice(obj.index);
            var kwordsArr = obj.keyWords.split("...");
            if (kwordsArr.length == 2) {
                var reg = new RegExp(kwordsArr[0].concat(".{0,5}", kwordsArr[1]), "g");
                obj.keyWords = reg.exec(subContext)[0];
            }
            var content = context.slice(0, obj.index).concat(subContext.replace(obj.keyWords, "<span>" + obj.keyWords + "</span>"));
            // return context;
            return $sce.trustAsHtml(content);
        };
    }])
    .filter('propsFilter', function() {
        return function(items, props) {
            var out = [];
            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    // var name=item.name;
                    var itemMatches = false;
                    if ((item.Name || item.name).indexOf(props) !== -1) {
                        itemMatches = true;
                    }
                    if (itemMatches) {
                        out.push(item);
                    }
                })
            } else {
                out = items;
            }
            return out;
        }
    });
