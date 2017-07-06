app.value('btnGroup', {
    gridBtns: [{
        "code": "add",
        "name": "添加",
        "index": 2001,
        "icon": "fa fa-plus"
    }],
    baseBtns: [{ //由于右浮动原因，现排序大号在前
        "code": "add",
        "name": "新增",
        "index": 1000,
        "icon": "fa fa-plus",
        "group": false,
        "float": false //静止浮动排列在左侧
    }, {
        "code": "delete",
        "name": "删除",
        "index": 1006,
        "icon": "fa fa-trash-o",
        "group": false
    }, {
        "code": "edit",
        "name": "编辑",
        "index": 1007,
        "icon": "fa fa-pencil",
        "group": false
    }, {
        "code": "refresh",
        "name": "刷新",
        "index": 1001,
        "icon": "fa fa-refresh",
        "group": false
    // }, {
    //     "code": "search",
    //     "name": "查询",
    //     "index": 1001,
    //     "icon": "fa fa-search",
    //     "group": false
    }, {
        "code": "setting",
        "name": "设置",
        "index": 1001,
        "icon": "",
        "group": false
    }],
    rowBtns: [{
        "code": "delete",
        "name": "删除",
        "index": 3000,
        "icon": "fa fa-trash-o",
        "group": false
    }, {
        "code": "edit",
        "name": "编辑",
        "index": 3001,
        "icon": "fa fa-pencil",
        "group": false,
    }, {
        "code": "enable",
        "name": "启用",
        "index": 3002,
        "icon": "fa fa-pencil",
        "group": false
    }, {
        "code": "disable",
        "name": "停用",
        "index": 3003,
        "icon": "fa fa-pencil",
        "group": false
    }]
})
