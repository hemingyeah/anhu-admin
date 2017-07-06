'use strict';

agGrid.initialiseAgGridWithAngular1(angular);
angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ng-echarts',
    'agGrid',
    'ui.select',
    'ADM-dateTimePicker',
    'toaster',
    'ncy-angular-breadcrumb'
]);
var anhuMenus;
var limitedWord;
var anhuMenus = [{
    "state": "login",
    "url": "/login",
    "controller": "loginCtrl",
    "templateUrl": "views/login/login.html",
    "resolve": {
        "deps": ["views/login/script/login-service.js",
            "views/login/script/login-controller.js"
        ]
    }
}, {
    "state": "admin",
    "url": "/admin",
    "controller": "adminCtrl",
    "templateUrl": "tpl/blocks/main.html",
    "ncyBreadcrumb": {
        "label": "首页",
        "skip": true
    }
}, {
    "state": "admin.advert",
    "url": "/advert",
    "controller": "advertCtrl",
    "templateUrl": "views/advert/advert.html",
    "resolve": {
        "deps": ["views/advert/script/advert-service.js",
            "views/advert/script/advert-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "广告位"
    }
}, {
    "state": "admin.notice",
    "url": "/notice",
    "controller": "noticeCtrl",
    "templateUrl": "views/notice/notice.html",
    "resolve": {
        "deps": ["views/notice/script/notice-service.js",
            "views/notice/script/notice-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "站内信"
    }
}, {
    "state": "admin.notice_edit",
    "url": "/notice_edit",
    "controller": "noticeEditCtrl",
    "templateUrl": "views/notice-edit/notice-edit.html",
    "resolve": {
        "deps": ["views/notice-edit/script/notice-edit-service.js",
            "views/notice-edit/script/notice-edit-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "编辑站内信",
    }
}, {
    "state": "admin.online",
    "url": "/online",
    "controller": "onlineCtrl",
    "templateUrl": "views/online/online.html",
    "resolve": {
        "deps": ["views/online/script/online-service.js",
            "views/online/script/online-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "在线援助",
    }
}, {
    "state": "admin.online_deal",
    "url": "/online_deal",
    "controller": "onlineDealCtrl",
    "templateUrl": "views/online-deal/online-deal.html",
    "resolve": {
        "deps": ["views/online-deal/script/online-deal-service.js",
            "views/online-deal/script/online-deal-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "在线援助处理",
        "parent": 　 "admin.online"
    },
    "params": {
        "id": {}
    }
}, {
    "state": "admin.feedback",
    "url": "/feedback",
    "controller": "feedbackCtrl",
    "templateUrl": "views/feedback/feedback.html",
    "resolve": {
        "deps": ["views/feedback/script/feedback-service.js",
            "views/feedback/script/feedback-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "意见反馈",
    }
}, {
    "state": "admin.feedback_deal",
    "url": "/feedback_deal",
    "controller": "feedbackDealCtrl",
    "templateUrl": "views/feedback-deal/feedback-deal.html",
    "resolve": {
        "deps": ["views/feedback-deal/script/feedback-deal-service.js",
            "views/feedback-deal/script/feedback-deal-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "意见反馈处理",
        "parent": "admin.feedback"
    },
    "params": {
        "id": {}
    }
}, {
    "state": "admin.usage",
    "url": "/usage",
    "controller": "usageCtrl",
    "templateUrl": "views/usage/usage.html",
    "resolve": {
        "deps": ["views/usage/script/usage-service.js",
            "views/usage/script/usage-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "使用帮助",
    }
}, {
    "state": "admin.wordpackage",
    "url": "/wordpackage",
    "controller": "wordpackageCtrl",
    "templateUrl": "views/wordpackage/wordpackage.html",
    "resolve": {
        "deps": ["views/wordpackage/script/wordpackage-service.js",
            "views/wordpackage/script/wordpackage-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "文字检测用量管理",
    }
}, {
    "state": "admin.photopackage",
    "url": "/photopackage",
    "controller": "photopackageCtrl",
    "templateUrl": "views/photopackage/photopackage.html",
    "resolve": {
        "deps": ["views/photopackage/script/photopackage-service.js",
            "views/photopackage/script/photopackage-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "图片检测用量管理",
    }
}, {
    "state": "admin.grouppackage",
    "url": "/grouppackage",
    "controller": "grouppackageCtrl",
    "templateUrl": "views/grouppackage/grouppackage.html",
    "resolve": {
        "deps": ["views/grouppackage/script/grouppackage-service.js",
            "views/grouppackage/script/grouppackage-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "组合套餐管理",
    }
}, {
    "state": "admin.market",
    "url": "/market",
    "controller": "marketCtrl",
    "templateUrl": "views/market/market.html",
    "resolve": {
        "deps": ["views/market/script/market-service.js",
            "views/market/script/market-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "营销活动管理",
    }
}, {
    "state": "admin.customer",
    "url": "/customer",
    "controller": "customerCtrl",
    "templateUrl": "views/customer/customer.html",
    "resolve": {
        "deps": ["views/customer/script/customer-service.js",
            "views/customer/script/customer-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "大客户定价管理",
    }
}, {
    "state": "admin.dosage",
    "url": "/dosage",
    "controller": "dosageCtrl",
    "templateUrl": "views/dosage/dosage.html",
    "resolve": {
        "deps": ["views/dosage/script/dosage-service.js",
            "views/dosage/script/dosage-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "检测用量管理",
    }
}, {
    "state": "admin.information",
    "url": "/information",
    "controller": "informationCtrl",
    "templateUrl": "views/information/information.html",
    "resolve": {
        "deps": ["views/information/script/information-service.js",
            "views/information/script/information-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "客户信息管理",
    }
}, {
    "state": "admin.userRole",
    "url": "/userRole",
    "controller": "userRoleCtrl",
    "templateUrl": "views/userRole/userRole.html",
    "resolve": {
        "deps": ["views/userRole/script/userRole-service.js",
            "views/userRole/script/userRole-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "客户角色管理",
    }
}, {
    "state": "admin.photo",
    "url": "/photo",
    "controller": "photoTestCtrl",
    "templateUrl": "views/photo-test/photo-test.html",
    "resolve": {
        "deps": ["views/photo-test/script/photo-test-service.js",
            "views/photo-test/script/photo-test-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "图片检测",
    }

}, {
    "state": "admin.photo_detail",
    "url": "/photo_detail",
    "controller": "photoDetailCtrl",
    "templateUrl": "views/photo-detail/photo-detail.html",
    "parentState": {
        "state": "admin.photo",
        "name": "图片检测"
    },
    "resolve": {
        "deps": ["views/photo-detail/script/photo-detail-service.js",
            "views/photo-detail/script/photo-detail-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "图片检测详情",
        "parent": "admin.photo"
    },
    "params": {
        "id": {}
    }
}, {
    "state": "admin.word",
    "url": "/word",
    "controller": "wordTestCtrl",
    "templateUrl": "views/word-test/word-test.html",
    "resolve": {
        "deps": ["views/word-test/script/word-test-service.js",
            "views/word-test/script/word-test-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "文字检测",
    }
}, {
    "state": "admin.word_detail",
    "url": "/detail",
    "controller": "wordDetailCtrl",
    "templateUrl": "views/word-detail/word-detail.html",
    "parentState": {
        "state": "admin.word",
        "name": "文字检测"
    },
    "resolve": {
        "deps": ["views/word-detail/script/word-detail-service.js",
            "views/word-detail/script/word-detail-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "文字检测详情",
        "parent": "admin.word"
    },
    "params": {
        "id": {},
        "content": {}
    }
}, {
    "state": "admin.shop",
    "url": "/shop",
    "controller": "shopCtrl",
    "templateUrl": "views/shop/shop.html",
    "resolve": {
        "deps": ["views/shop/script/shop-service.js",
            "views/shop/script/shop-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "店铺检测",
    }
}, {
    "state": "admin.goods",
    "url": "/goods",
    "controller": "goodsCtrl",
    "templateUrl": "views/goods/goods.html",
    "resolve": {
        "deps": ["views/goods/script/goods-service.js",
            "views/goods/script/goods-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "商品检测",
    }
}, {
    "state": "admin.finance",
    "url": "/finance",
    "controller": "financeCtrl",
    "templateUrl": "views/finance/finance.html",
    "resolve": {
        "deps": ["views/finance/script/finance-service.js",
            "views/finance/script/finance-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "财务概况",
    }
}, {
    "state": "admin.user",
    "url": "/user",
    "controller": "userCtrl",
    "templateUrl": "views/user/user.html",
    "resolve": {
        "deps": ["views/user/script/user-service.js",
            "views/user/script/user-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "用户管理",
    }
}, {
    "state": "admin.role",
    "url": "/role",
    "controller": "roleCtrl",
    "templateUrl": "views/role/role.html",
    "resolve": {
        "deps": ["views/role/script/role-service.js",
            "views/role/script/role-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "角色管理",
    }
}, {
    "state": "admin.search",
    "url": "/search",
    "controller": "searchCtrl",
    "templateUrl": "views/search/search.html",
    "resolve": {
        "deps": ["views/search/script/search-service.js",
            "views/search/script/search-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "类目查询",
    }
}];

limitedWord = [{
    "state": "admin.limited_word",
    "url": "/limited_word",
    "controller": "limitedWordCtrl",
    "templateUrl": "views/limited-word/limited-word.html",
    "resolve": {
        "deps": ["views/limited-word/script/limited-word-service.js",
            "views/limited-word/script/limited-word-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "极限词库",
    }
}, {
    "state": "admin.law_category",
    "url": "/law_category",
    "controller": "lawCategoryCtrl",
    "templateUrl": "views/law-category/law-category.html",
    "resolve": {
        "deps": ["views/law-category/script/law-category-service.js",
            "views/law-category/script/law-category-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "法律类目库",
    }
}, {
    "state": "admin.law_letter",
    "url": "/law_letter",
    "controller": "lawLetterCtrl",
    "templateUrl": "views/law-letter/law-letter.html",
    "resolve": {
        "deps": ["views/law-letter/script/law-letter-service.js",
            "views/law-letter/script/law-letter-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "详细法律条文库",
    }
}, {
    "state": "admin.law_case",
    "url": "/law_case",
    "controller": "lawCaseCtrl",
    "templateUrl": "views/law-case/law-case.html",
    "resolve": {
        "deps": ["views/law-case/script/law-case-service.js",
            "views/law-case/script/law-case-controller.js"
        ]
    },
    "ncyBreadcrumb": {
        "label": "案例库",
    }
}]
window.route = anhuMenus.concat(limitedWord);
