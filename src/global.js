'use strict'

import sim from '../sim/sim.js';
//注册接口数据：接口名、回调函数。

window.TNM = {};
TNM.Global = {};

// let requestHT = {
// 	'login': {
// 		request: 'login',
// 		response: 'response/login'
// 	}
	
// }

// function respenseFn(name, params, cbFn, failFn){
// 	let socket = requestHT[name];

// 	eventBus.once(socket.response, (result) => {
// 		cbFn(result);
// 		failFn(result)
// 	});
// 	client.send(socket.request, params);
// }


// import commnication from './libs/commnication.js';

TNM.Global.common = (name, params, cbFn, failFn) => {
	switch (name) {
		case 'login':
			/**
			 * 登录系统
			 * @params  {userName, password} ( [description]
			 * @return {siteId, siteName, siteType, userName, userId, userType, lineName}   [description]
			 */
			setTimeout(() => {cbFn(Test.login(params));}, 200);
			break;
		case 'logout':
			/**
			 * 退出系统
			 * @params  {} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.logout(params));}, 200);
			break;
		case 'refresh':
			/**
			 * 刷新或多开系统窗口
			 * @params  {} ( [description]
			 * @return {userName, userId, userType, lineName}   [description]
			 */
			cbFn(Test.refresh(params));
			break;
		case 'rtFaults':
			/**
			 * 登录获取sidebar数据
			 * @params  {} ( [description]
			 * @return [
			 *         {id, siteName, deviceType, details, level, time}
			 * ]   [description]
			 */
			cbFn(Test.rtFaults(params));
			break;
	}
};


TNM.Global.lineCaller = (name, params, cbFn, failFn) => {
	switch (name) {
		/*------------------线路管理----------------------*/
		case 'getLine':
			/**
			 * 进入线路页面
			 * @params  {} ( [description]
			 * @return [
		     *      {id, no, type, name, ip, level, desc}
		     * ]  [level: 0 || 1 || 2]
			 */
			setTimeout(() => {cbFn(Test.getLine(params));}, 200);
			break;
	}
};

TNM.Global.sysCaller = (name, params, cbFn, failFn) => {
	switch (name) {
		/*--------------------用户管理--------------------*/
		case 'getUsers':
			/**
			 * 进入用户管理
			 * @params  {pageNo, pageSize} ( [description]
			 * @return {
			 *         total,
			 *         data: [
			 *         	{access,account,desc,id,name,role,siteId,type}
			 *         ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getUsers(params));}, 200);
			break;
		case 'changePassword':
			/**
			 * 修改用户密码
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.changePassword(params));}, 200);
			break;
		case 'deleteUsers':
			/**
			 * 删除用户
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deleteUsers(params));}, 200);
			break;
		case 'createUser':
			/**
			 * 新建用户
			 * @params  {type, account, password, name, desc [role]} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.createUser(params));}, 200);
			break;
		case 'getUser':
			/**
			 * 修改用户信息时，获取用户信息
			 * @params  {id} ( [description]
			 * @return {type, account, name, desc [role]}   [description]
			 */
			setTimeout(() => {cbFn(Test.getUser(params));}, 200);
			break;
		case 'editUser':
			/**
			 * 新建用户
			 * @params  {type, account, name, desc [role]} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.editUser(params));}, 200);
			break;
		/*------------------设备列表----------------------*/
		case 'getDeviceTree':
			/**
			 * 进入设备管理页面，获取tree数据
			 * @params  {} ( [description]
			 * @return {  
		 	 *      id: i,
					name: siteNames[i],
					children: [
						{
							id: 56, 
							name: '数字摄像机', 
							num: 51,
							children: [
								{id: 57, name: '固定枪机', num: 15},
								{id: 58, name: '半球机', num: 20},
								{id: 59, name: '球机', num: 16}
							]
						}
					]
			 * }   
			 * [单站点数据，此数据为多站点数据的children里面一项]
			 */
			setTimeout(() => {cbFn(Test.getDeviceTree(params));}, 200);
			break;
		case 'getDevieList':
			/**
			 * 获取设备列表
			 * @params  {siteId, majorTypeId, deviceTypeId} ( [description]
			 * @return {
			 *    headers: [
			 *    	titles: ['设备类型','设备名称', '备注'],
			 *    	columns: ['type', 'name', 'desc'],
			 *    	widths: [30, 30, 40]
			 *    ],
			 *    total,
			 *    data: [id, name, type, desc...]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getDevieList(params));}, 50);
			break;
		case 'getEditDevice':
			/**
			 * 获取修改设备信息
			 * @params  {id} ( [description]
			 * @return {
			 *         id,
			 *         name,
			 *         type,
			 *         typeName,
			 *         properties: [
			 *         	{key, title, value, [type, list: [{name, value}]]}
			 *         ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getEditDevice(params));}, 200);
			break;
		case 'editDevice':
			/**
			 * 修改设备
			 * @params {
			 *         id,
			 *         name,
			 *         type,
			 *         properties: [
			 *         	{key, title, value, [type, list: [{name, value}]]}
			 *         ]
			 * }   [description]
			 * @return  {} ( [description]
			 */
			setTimeout(() => {cbFn(Test.editDevice(params));}, 200);
			break;
		/*------------------基础信息----------------------*/
		case 'getBaseTree':
			/**
			 * 进入基础信息页面，获取tree数据
			 * @params  {} ( [description]
			 * @return {
			 *      id,
			 *      children: [
			 *      	
			 *      ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getBaseTree(params));}, 200);
			break;
		case 'getBaseList':
			/**
			 * 基础信息列表
			 * @params  {} ( [description]
			 * @return {
			 *      total,
			 *      data: [
			 *      	{id, name, type, ip, version}
			 *      ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getBaseList(params));}, 200);
			break;
	}
};

TNM.Global.faultCaller = (name, params, cbFn, failFn) => {
	switch (name) {
		/*--------------------用户管理--------------------*/
		case 'getFaultTree':
			/**
			 * 进入故障告警页面，获取tree数据
			 * @params  {} ( [description]
			 * @return {
			 *      id,
			 *      children: [
			 *      	
			 *      ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getFaultTree(params));}, 50);
			break;
		case 'getFaultList':
			/**
			 * 获取故障告警列表
			 * @params  {} ( [description]
			 * @return {
			 *         total,
			 *         data: [
			 *         		{id, siteName, name, time, level, ip, status, desc}
			 *         ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getFaultList(params));}, 50);
			break;
		case 'handleFault':
			/**
			 * 处理告警
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.handleFault(params));}, 50);
			break;
		/*------------------统计分析----------------------*/
	}
};

TNM.Global.monitorCaller = (name, params, cbFn, failFn) => {
	switch (name) {
		/*--------------------摄像机状态--------------------*/
		case 'getCameraTree':
			/**
			 * 进入故障告警页面，获取tree数据
			 * @params  {} ( [description]
			 * @return {
			 *      id,
			 *      children: [
			 *      	
			 *      ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getCameraTree(params));}, 50);
			break;
		case 'getCameraList':
			/**
			 * 获取故障告警列表
			 * @params  {} ( [description]
			 * @return {
			 *         total,
			 *         data: [
			 *         		{id, siteName, name, time, level, ip, status, desc}
			 *         ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getCameraList(params));}, 50);
			break;
		case 'handleFault':
			/**
			 * 处理告警
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.handleFault(params));}, 50);
			break;
		/*------------------统计分析----------------------*/
	}
};