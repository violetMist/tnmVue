"use strict"

import utils from  './libs/utils';

/**格式化时间
 *  @param {string} time 需要格式化的时间
 *  @param {bool} friendly 是否是fromNow
 */
exports.getLastTimeStr = (time, friendly) => {
    if (friendly) {
        return utils.MillisecondToDate(new Date() - new Date(time));
    } else {
        return utils.fmtDate(new Date(time),'yyyy-MM-dd hh:mm');
    }
};

/**
 * 获取录像计划days显示
 * @param  {[Array]} days [description]
 * @return {[String]}      [description]
 */
exports.getDaysStr = (days) => {
    if (days.length === 7)
        return '全周';
    return _.map(days, (day, idx) => {
        switch (day) {
            case 0:
                return '周日';
                break;
            case 1:
                return '周一';
                break;
            case 2:
                return '周二';
                break;
            case 3:
                return '周三';
                break;
            case 4:
                return '周四';
                break;
            case 5:
                return '周五';
                break;
            case 6:
                return '周六';
                break;
        }
    }).join(',');
};


/** 获取表格每一个栏数据
 *  @param {string} [key] [这列数据的key值]
 *  @param {string} [value] [用于显示的值]
 *  @param {string} [clz] [此表格的clz类区别]
 *  @param {string} [title] [此表格的title区别]
 *  @return {[string/html]}       [description]
 */

exports.getGridValue = (key, value, clz, title) => {
    const Const = window.getConst();
    const CustomSysUser = (key, value) => {
        switch (key) {
            case 'type':
                return Const.Const.UserTypeNamesHT[value];
                break;
            default:
                return value;
                break;
        }
    };
    const CustomFaultList = (key, value) => {
        switch (key) {
            case 'level':
                return value == 1 ? '一般': '严重';
                break;
            case 'time': 
                return utils.fmtDate(new Date(value),'yyyy-MM-dd hh:mm:ss');
                break;
            case 'status':
                return value ? (title ? '处理': '<span class="handle"></span>') : '已处理';
                break;
            default:
                return value;
                break;
        }
    };
    const CustomCameraList = (key, value) => {
        switch (key) {
            case 'status':
                return value == 1 ? '在线': '离线';
                break;
            default:
                return value;
                break;
        }
    };
    switch (clz) {
        case 'sys-user':
            return CustomSysUser(key, value);
            break;
        case 'fault-grid':
            return CustomFaultList(key, value);
            break;
        case 'camera-grid':
            return CustomCameraList(key, value);
            break;
        default:
            return value;
            break;
    }
};

/**
 * 显示dialog的每一项title
 * @param  {[string]} key   [列名]
 * @param  {[null]} value [参数]
 * @param  {[string]} clz   [dialog的class]
 * @return {[string]}       [description]
 */
exports.getDialogTitle = (key, value, clz) => {
    const CreateSite = (key, value) => {
        switch (key) {
            case 'id':
                return '标识号';
            case 'no':
                return '编号';
            case 'name':
                return '名称';
            case 'type':
                return '类型';
            case 'ip':
                return 'IP地址';
            case 'desc':
                return '说明';
            default:
                return value;
        }
    };
    const CreateRole = (key, value) => {
        switch (key) {
            case 'name':
                return '角色名称';
            case 'siteType':
                return '所属单位类型';
            default:
                return value;
        }
    };
    const CreateUser = (key, value) => {
        switch (key) {
            case 'name':
                return '用户名';
            case 'account':
                return '登录账号';
            case 'password':
                return '登录密码';
            case 'account':
                return '登录账号';
            case 'valPwd':
                return '确定密码';
            case 'desc':
                return '说明';
            case 'type':
                return '用户类型';
            case 'role':
                return '用户角色';
            default:
                return value;
        }
    };
    const ChangePassword = (key, value) => {
        switch (key) {
            case 'password':
                return '新密码';
            case 'valPwd':
                return '确认新密码';
            default:
                return value;
        }
    }; 
    const CreateDevice = (key, value) => {
        switch (key) {
            case 'name':
                return '设备名称';
            case 'typeName':
                return '设备类型';
            default:
                return value;
        }
    };
    const handleVideo = (key, value) => {
        switch (key) {
            case 'monitor':
                return '监视器';
            case 'decoder': 
                return '关联设备名称';
            case 'port':
                return '关联设备通道号';
        }
    };
    switch (clz) {
        case 'create-site':
            return CreateSite(key, value);
            break;
        case 'copy-site':
            return '数据源站点IP';
            break;
        case 'set-site':
            return '当前站点';
            break;
        case 'create-role':
            return CreateRole(key, value);
            break;
        case 'create-user': case 'edit-user':
            return CreateUser(key, value);
            break;
        case 'change-password':
            return ChangePassword(key,value);
            break;  
        case 'create-device': case 'edit-device':
            return CreateDevice(key, value);
            break; 
        case 'create-zone': case 'edit-zone':
            return '分区名称';
            break;
        case 'edit-video': case 'add-video':
            return handleVideo(key, value);
            break;
        default:
            return value;
            break;
    }
};