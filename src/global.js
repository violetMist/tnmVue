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
		case 'getSite':
			/**
			 * 添加站点
			 * @params  {id} ( [description]
			 * @return {id, no, type, name, ip, desc}   [description]
			 */
			setTimeout(() => {cbFn(Test.getSite(params));}, 200);
			break;
		case 'createSite':
			/**
			 * 添加站点
			 * @params  {id, no, type, name, ip, desc} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.createSite(params));}, 200);
			break;
		case 'editSite':
			/**
			 * 修改站点
			 * @params  {id, no, type, name, ip, desc} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.editSite(params));}, 200);
			break;
		case 'deleteSites':
			/**
			 * 删除站点
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deleteSites(params));}, 200);
			break;
		case 'copySite':
			/**
			 * 复制站点信息
			 * @params  {ip} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.copySite(params));}, 200);
			break;
		case 'getAffiliateSites':
			/**
			 * 获取可管辖站点
			 * @params  {} ( [description]
			 * @return {sites: [{id, name, type, selected}]}   [description]
			 */
			setTimeout(() => {cbFn(Test.getAffiliateSites(params));}, 200);
			break;
		case 'setAffiliateSites':
			/**
			 * 设置管辖站点
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.setAffiliateSites(params));}, 200);
			break;
		/*------------------角色管理----------------------*/
		case 'getRoles':
			/**
			 * 进入角色管理页面
			 * @params  {} ( [description]
			 * @return {total, data: [{id, name, promptable, siteType}]}   [description]
			 */
			setTimeout(() => {cbFn(Test.getRoles(params));}, 200);
			break;
		case 'getRole':
			/**
			 * 获取角色信息
			 * @params  {} ( [description]
			 * @return {id, name, promptable, siteType}   [description]
			 */
			setTimeout(() => {cbFn(Test.getRole(params));}, 200);
			break;
		case 'createRole':
			/**
			 * 新建角色
			 * @params  {name, promptable, siteType} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.createRole(params));}, 200);
			break;
		case 'editRole':
			/**
			 * 修改角色
			 * @params  {id, name, promptable, siteType} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.editRole(params));}, 200);
			break;
		case 'deleteRoles':
			/**
			 * 删除角色
			 * @params  {ids: []} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deleteRoles(params));}, 200);
			break;
		/*------------------用户管理----------------------*/
		case 'getUsers':
			/**
			 * 进去用户管理
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
			 * 修改角色密码
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
		case 'getUserRoles':
			/**
			 * 新建用户时，获取可用roles
			 * @params  {} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.getUserRoles(params));}, 200);
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
		case 'chgpriv':
			/**
			 * 修改用户权限
			 * @params  {id,} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.chgpriv(params));}, 200);
			break;
		/*------------------系统设置----------------------*/
		case 'getConfig':
			/**
			 * 进入系统管理页面
			 * @params  {} ( [description]
			 * @return {
			 *      ControlReleaseTime: "3000",// MS
			 *		TimingSetting: '{"schedule":"01:00:00","ntpIP":"1.1.1.1","ntpPort":"1","autoTiming":true}',
			 *		ServerBackupSetting: '{"backupTVS" : true,"backupSS": true}', 
			 *		StorageBackupSetting : true, 
			 *		Sync : false,
			 *		ControlOsdEnable : true
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getConfig(params));}, 200);
			break;
		case 'setConfig':
			/**
			 * 修改系统设置
			 * @params  {
			 *          ControlReleaseTime: "3000"
			 *          或者 TimingSetting: '{"schedule":"01:00:00","ntpIP":"1.1.1.1","ntpPort":"1","autoTiming":true}'
			 *          ....
			 *          只传一条修改数据
			 * } ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.setConfig(params));}, 200);
			break;
		case 'syncConfig':
			/**
			 * 立即同步数据
			 * @params  {} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.syncConfig(params));}, 200);
			break;
		case 'timing':
			/**
			 * 立即校时
			 * @params  {} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.timing(params));}, 200);
			break;
	}
};

TNM.Global.deviceCaller = (name, params, cbFn, failFn) => {
	switch (name) {
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
							id: 50, 
							name: '服务器', 
							num: 22,
							children: [
								{id: 51, name: '网管服务器', num: 0},
								{id: 52, name: '视频服务器', num: 11},
								{id: 53, name: '视频分析服务器', num: 8},
								{id: 54, name: '存储服务器', num: 3}
							]
						},
						{id: 55, name: '存储设备', num: 3},
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
		case 'getCreateDevice':
			/**
			 * 获取新建设备信息
			 * @params  {id} ( [description]
			 * @return {
			 *         name,
			 *         type,
			 *         typeName,
			 *         properties: [
			 *         	{key, title, value, [type, list: [{name, value}]]}
			 *         ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getCreateDevice(params));}, 200);
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
		case 'createDevice':
			/**
			 * 新建设备
			 * @params {
			 *         name,
			 *         type,
			 *         properties: [
			 *         	{key, title, value, [type, list: [{name, value}]]}
			 *         ]
			 * }   [description]
			 * @return  {} ( [description]
			 */
			setTimeout(() => {cbFn(Test.createDevice(params));}, 200);
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
		case 'deleteDevices':
			/**
			 * 删除设备
			 * @params  {ids} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deleteDevices(params));}, 200);
			break;
		/*------------------摄像机分区----------------------*/
		case 'getZoneTree':
			/**
			 * 进入设备管理页面，获取tree数据
			 * @params  {} ( [description]
			 * @return {  
		 	 *      id: i,
					name: siteNames[i],
					children: [
						{
							id: 50, 
							name: '站台层', 
							num: 34,
							children: [
								{id: 20, name: '枪机', num: 15},
								{id: 21, name: '球机', num: 11},
								{id: 22, name: '半球机', num: 8}
							]
						}
					]
			 * }   
			 * [单站点数据，此数据为多站点数据的children里面一项]
			 */
			setTimeout(() => {cbFn(Test.getZoneTree(params));}, 200);
			break;
		case 'getZone':
			/**
			 * 获取单个分区信息
			 * @params  {id} ( [description]
			 * @return {id, name}   [description]
			 */
			setTimeout(() => {cbFn(Test.getZone(params));}, 200);
			break;
		case 'createZone':
			/**
			 * 新建分区
			 * @params  {name} ( [description]
			 * @return {
			 *      id: 123,
					name: params.name,
					num: 0,
					children: [
						{id: 1234, name: '枪机', num: 0},
						{id: 1235, name: '半球', num: 0},
						{id: 1236, name: '球机', num: 0}
					]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.createZone(params));}, 200);
			break;
		case 'editZone':
			/**
			 * 修改分区
			 * @params  {id, name} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.editZone(params));}, 200);
			break;
		case 'deleteZone':
			/**
			 * 删除分区
			 * @params  {ids} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deleteZone(params));}, 200);
			break;
		case 'getCamerasList':
			/**
			 * 获取分区设备列表
			 * @params  {siteId, zoneId, deviceTypeId} ( [description]
			 * @return {
			 *    headers: [
			 *    	titles: [],
			 *    	columns: [],
			 *    	widths: []
			 *    ],
			 *    total,
			 *    data: [id, name, type, desc...]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getCamerasList(params));}, 50);
			break;
		case 'getCameras':
			/**
			 * 获取可添加分区的摄像机
			 * @params  {siteId, zoneId, deviceTypeId} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.getCameras(params));}, 50);
			break;
		case 'addCameras':
			/**
			 * 添加摄像机到分区
			 * @params  {ids} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.addCameras(params));}, 200);
			break;
		case 'deleteCameras':
			/**
			 * 删除分区中摄像机
			 * @params  {ids} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deleteCameras(params));}, 200);
			break;
		/*-------------------电视墙/存储管理---------------------*/
		case 'getLineTree':
			/**
			 * 获取线路tree列表
			 * @params  {} ( [description]
			 * @return {
			 *         id,
			 *         children: [
			 *         	 {id: site.id, name: site.name}
			 *         ]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getLineTree(params));}, 200);
			break;
		case 'getVideoList':
			/**
			 * 获取电视墙列表
			 * @params  {siteId} ( [description]
			 * @return [
			 *  {
					id: idx, 
					name: '电视墙'+i, 
					monitor: {
						name: '监视器'+i, 
						style: '大华'
					}, 
					decoder: {
						name: '解码器'+i, 
						style: '海信'
					}
				};
			 * ]   [description]
			 */
			setTimeout(() => {cbFn(Test.getVideoList(params));}, 200);
			break;
		case 'getVideo':
			/**
			 * 获取电视墙
			 * @params  {[id]} ( [description]
			 * @return {
			 *         monitor: {id, name},
			 *         decoder: {id, name},
			 *         monitorList: [{id, name}],
			 *         decoderList: [{id, name, ports: [1, 2, 3...]}]
			 * }   [description]
			 */
			setTimeout(() => {cbFn(Test.getVideo(params));}, 200);
			break;
		case 'addVideo':
			/**
			 * 添加电视墙
			 * @params  {monitor, decoder, port} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.addVideo(params));}, 200);
			break;
		case 'editVideo':
			/**
			 * 修改电视墙
			 * @params  {id, monitor, decoder, port} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.editVideo(params));}, 200);
			break;
		case 'deleteVideo':
			/**
			 * 删除电视墙
			 * @params  {id} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.deleteVideo(params));}, 200);
			break;
		case 'getPlanList':
			/**
			 * 获取录像计划列表
			 * @params  {siteId} ( [description]
			 * @return {}   [description]
			 */
			setTimeout(() => {cbFn(Test.getPlanList(params));}, 200);
			break;
	}
}