const Const = {};
Const.SiteTypes = {TCC : 0, OCC: 1, Depot: 2, Station: 3, BOCC: 4, LinePolice: 5, PTSD:6};
Const.UserTypes = {Super: 0, Admin:1, User :2};
Const.SiteTypeNamesHT = {0: "指挥中心", 1: "控制中心", 2: "车辆段／停车场", 3: "车站", 4: "备用控制中心", 5: "公安派出所", 6: "公交总队"};
Const.UserTypeNamesHT = {0: "超级用户", 1: "管理员", 2: "普通用户"};
// Const.DeviceTypes = {
// 	TNM: 0, TVS: 1, TAS: 2, TVR: 3,
// 	Storage: 10, 
// 	IPCFixed: 20, IPCSemiSphere: 21, IPCSphere: 22, 
// 	CameraFixed: 31, CameraSemiSphere: 32, CameraSphere: 33, 
// 	RedirectPickup: 40, OmnidirectPickup: 41,
// 	Coder: 50, Decoder: 51, Spliter: 52, Monitor: 53, Terminal: 54, SpecialDecoder: 55,
// 	HUB: 60, PDH: 61, FiberConvertor: 62, KVM: 63, PDU: 64, VDM: 65,
// 	Other: 90
// };
// Const.DeviceTypeNames = {
// 	0: "网管服务器", 1: "视频服务器", 2: "视频分析服务器", 3: "存储服务器",
// 	10: "存储设备",
// 	20: "固定枪机",  21: "半球机",  22: "球机",
// 	31: "固定枪机",  32: "半球机",  33: "球机",
// 	40: "定向拾音器",41: "全向拾音器",
// 	50: "编码器",  51: "解码器",  52: "画面分割器",53: "监视器",  54: "控制终端", 55: "解码器",
// 	60: "交换机",  61: "光端机",  62: "光纤收发器",63: "数字KVM",64: "数字PDU", 65: "字符叠加器",
// 	90: "其他设备"
// };

window.Test = {};
let session = {};
session.Const = Const;
let userType = 1;
let siteName = '西直门';
Test.login = (params) => {
	if (params.userName == 'root') 
		userType = 0;
	else
		userType = 1;
	session.userName = params.userName;
	session.userId = 1;
	session.userType = userType;
	session.lineName = '13号线';
	return session;
};
Test.refresh = () => {
	session.userName = 'admin';
	session.userId = 1;
	session.userType = 1;
	session.lineName = '13号线';
	return session;
};

Test.logout = () => {
	session = {};
	session.Const = Const;
};

var SiteTypes = Const.SiteTypes;
var SiteTypeNamesHT = Const.SiteTypeNamesHT;

function getRandonItem(arr){
	return arr[Math.floor(Math.random() * arr.length)];
}
function getOneInArr(params, arr){
	let _index = '';
	arr.forEach((item, idx) => {
		if (item.id == params.id)
			_index = idx;
	})
	return arr[_index];
}
function editOneInArr(params, arr){
	let _index = '';
	arr.forEach((item, idx) => {
		if (item.id == params.id)
			_index = idx;
	})
	arr[_index] = params;
}

function getData2Grid(params, arr){
	return {
		total: arr.length,
		data: arr.slice(params.pageNo * params.pageSize, (params.pageNo+1) * params.pageSize)
	};
}

/***********************线路和车站管理****************************/

var Line = {id: 1, name: "13号线"};
var siteIds = [];
var allSiteIds = [];
function genSite(idx, name, type, _idx){
	if (type == 2 || type == 3) {
		siteIds.push(idx);
	}
	allSiteIds.push(idx);
	return {id: idx, name: name, lineId:1, type: type, ip: "192.168.1." + idx, level: _.random(0, 2), 
		no:idx+1, desc: type===3?("第"+ _idx + "站") : ""};
}
var siteNames = "西直门,大钟寺,知春路,五道口,上地,西二旗,龙泽,回龙观,霍营,立水桥,北苑,望京西,芍药居,光熙门,13A柳芳,CBD东直门".split(",");
var Sites = [].concat(
	genSite(0, "地铁指挥中心", 0),
	genSite(1, "13号线控制中心", 1),
	genSite(2, "回龙观车辆段", 2),
	genSite(3, "东直门停车场", 2),
	siteNames.map(function(name, idx) {
		return genSite(4 + idx, name, 3, idx + 1);
	}),
	genSite(4 + siteNames.length, "13号线备用中心", 4),
	genSite(5 + siteNames.length, "13号线派出所", 5),
	genSite(6 + siteNames.length, "公交总队", 6)
);

Test.getLine = () => {
	return Sites;
};

Test.createSite = (params) => {
	params.lineId = 1;
	Sites.push(params);
};

Test.getSite = (params) => {
	return getOneInArr(params, Sites);
};

Test.editSite = (params) => {
	editOneInArr(params, Sites);
};

Test.deleteSites = (params) => {
	var arr = _.difference(allSiteIds, params.ids);
	if (arr.length === 0) 
		return Sites = [];
	var arr1 = _.reduce(Sites, (acc, site) => {
		if (_.indexOf(arr, site.id) > -1)
			acc.push(site);
		return acc;
	}, []);
	Sites = arr1;
	return Sites;
};

Test.copySite = (params) => {
	
};

Test.getAffiliateSites = (params) => {
	return Sites;
};

Test.setAffiliateSites = (params) => {
	Sites.forEach((site) => {
		if (_.indexOf(params.ids, site.id) > -1)
			site.selected = true;
		else
			site.selected = false;
	});
};

/**************************角色管理******************************/

var UserRoles = [ 
["TCC 调度员",					SiteTypes.TCC, true],

["控制中心防灾值班员", 			SiteTypes.OCC],
["控制中心行车调度员", 			SiteTypes.OCC],
["控制中心电力调度员", 			SiteTypes.OCC],
["控制中心AFC调度员", 				SiteTypes.OCC],

["车辆段/停车场防灾值班员",			SiteTypes.Depot],
["车辆段/停车场行车值班员",			SiteTypes.Depot],
["车辆段/停车场运转值班员",			SiteTypes.Depot],
["车辆段/停车场安保值班员", 		SiteTypes.Depot],

["车站防灾值班员", 				SiteTypes.Station],
["车站行车值班员", 				SiteTypes.Station],
["换乘线路车站值班员", 			SiteTypes.Station],
["公安车站值班员",					SiteTypes.Station],

["公安派出所调度员",				SiteTypes.LinePolice],
["公安派出所值班员", 				SiteTypes.LinePolice],
["公安交总队调度员及其它部门人员",		SiteTypes.PTSD]
].map(function(r, idx) {
	return {id:idx+1, name: r[0], siteType: r[1], promptable : r[2] || false};
});

var roleIds = UserRoles.map((role, idx) => {return role.id});

Test.getRoles = () => {
	return {
		total: UserRoles.length,
		data: UserRoles
	};
};

Test.createRole = (params) => {
	params.id = UserRoles.length+1;
	UserRoles.push(params);
};

Test.getRole = (params) => {
	return getOneInArr(params, UserRoles);
};

Test.editRole = (params) => {
	editOneInArr(params, UserRoles);
};

Test.deleteRoles = (params) => {
	var arr = _.difference(roleIds, params.ids);
	if (arr.length === 0) 
		return UserRoles = [];
	var arr1 = _.reduce(UserRoles, (acc, role) => {
		if (_.indexOf(arr, role.id) > -1)
			acc.push(role);
		return acc;
	}, []);
	UserRoles = arr1;
	return UserRoles;
};

/***********************用户管理*********************/

var Users = {
	super : {id: 0, name: "超级用户", type: 0, siteId : 0},
	admin : [
		{id: 1, name: "张无忌", account: "admin1", type: 1, siteId : '站点1'},
		{id: 2, name: "杨无悔", account: "admin2", type: 1, siteId : '站点2'},
		{id: 3, name: "赵敏", account: "admin3", type: 1, siteId : '站点3'},
		{id: 4, name: "阳顶天", account: "admin4", type: 1, siteId : '站点4'}
	],
	users : []
};

var SNames = "赵钱孙李周吴郑王刘花辛魏宋马朱陆".split("");
var LNames = "系统部署时由超级用户创建拥有创建修改删除各自车站的普通用户及赋予权限拥有创建修改删除等权限不能登陆以及云台控制等权限".split("");
var SiteTypeNames = [];
for (var key in SiteTypeNamesHT) {
	SiteTypeNames.push(SiteTypeNamesHT[key]);
}

var RolesSelectable = _.map(SiteTypeNames, function(item, idx){
	return _.reduce(UserRoles, function(acc, r, _idx){
		if (r.siteType === idx)
			acc.push(r.name);
		return acc;
	}, []);
});

function getUser(idx){
	var username = getRandonItem(SNames) + getRandonItem(LNames) +  getRandonItem(LNames);
	var site = getRandonItem(Sites);
	while(site.type == 4)
		site = getRandonItem(Sites);
	return {
		id : 10 + idx, name : username, account: "user" + idx, type: 2,
		siteId: '站点'+site.id, role : getRandonItem(RolesSelectable[site.type]),
		desc : "<asdasd><asdaSD<asd>",
		access:""
	};
}
Users.users = (function(){
	var arr = [];
	for (var i=0; i<300; i++)
		arr.push(getUser(i));
	return arr;
})();

var userIds = [].concat(_.map(Users.admin, user => user.id), _.map(Users.users, user => user.id));

Test.getUsers = (params) => {
	return getData2Grid(params, [].concat(Users.admin, Users.users));
};

Test.changePassword = (params) => {

};

Test.deleteUsers = (params) => {
	var arr = _.difference(userIds, params.ids);
	if (arr.length === 0) {
		Users.users = [];
		return Users.admin = [];
	}
	Users.admin = _.reduce(Users.admin, (acc, user) => {
		if (_.indexOf(arr, user.id) > -1)
			acc.push(user);
		return acc;
	}, []);
	Users.users = _.reduce(Users.users, (acc, user) => {
		if (_.indexOf(arr, user.id) > -1)
			acc.push(user);
		return acc;
	}, []);
	return Users;
};

Test.getUserRoles = () => {
	return _.map([
			"TCC 调度员",
			"控制中心防灾值班员",
			"控制中心行车调度员",
			"控制中心电力调度员",
			"控制中心AFC调度员", 
			"车辆段/停车场防灾值班员",	
			"车辆段/停车场行车值班员",	
			"车辆段/停车场运转值班员",	
			"车辆段/停车场安保值班员", 
			"车站防灾值班员", 		
			"车站行车值班员", 		
			"换乘线路车站值班员",
			"公安车站值班员",		
			"公安派出所调度员",	
			"公安派出所值班员", 
			"公安交总队调度员及其它部门人员"
		], (name, idx) => {
		return {name: name, value: idx};
	});
};

Test.createUser = (params) => {
	if (params.type == Const.UserTypes.Admin) {
		params.id = Users.admin.length +1;
		Users.admin.push(params);
	} else {
		params.id = Users.users.length +20;
		Users.users.push(params);
	}
};

Test.getUser = (params) => {
	let user = {};
	user = getOneInArr(params, Users.admin) || getOneInArr(params, Users.users);
	if (user.type == Const.UserTypes.User) {
		delete user.access;
		user.role = Math.floor(Math.random() * 16);
		user.dropdownArr = ['role'];
		user.dropdownList = {
			role: Test.getUserRoles()
		}
	} else {
		delete user.actions;
	}
	user.desc = '';
	return user;
};

Test.editUser = (params) => {
	
};

Test.chgpriv = (params) => {

};

/********************系统设置************************/

var _config = {
	ControlReleaseTime: "3000",// MS
	TimingSetting: '{"schedule":"01:00:00","ntpIP":"1.1.1.1","ntpPort":"1","autoTiming":true}',
	ServerBackupSetting: '{"backupTVS" : true,"backupSS": true}', 
	StorageBackupSetting : true, 
	Sync : false,
	ControlOsdEnable : true
}

Test.getConfig = () => {
	return _config;
};
Test.setConfig = (params) => {
	for (let key in params) {
		_config[key] = params[key];
	}
};

Test.syncConfig = (params) => {

};

Test.timing = (params) => {

};


/********************设备列表*************************/
function getDeviceTree(i) {
	return {
		id: i+1,
		name: siteNames[i],
		children: [
			{
				id: 50, 
				name: '服务器', 
				num: 22,
				children: [
					{id: 0, name: '网管服务器', num: 0},
					{id: 1, name: '视频服务器', num: 11},
					{id: 2, name: '视频分析服务器', num: 8},
					{id: 3, name: '存储服务器', num: 3}
				]
			},
			{id: 10, name: '存储设备', num: 3},
			{
				id: 56, 
				name: '数字摄像机', 
				num: 51,
				children: [
					{id: 20, name: '固定枪机', num: 15},
					{id: 21, name: '半球机', num: 20},
					{id: 22, name: '球机', num: 16}
				]
			},
			{
				id: 60, 
				name: '模拟摄像机', 
				num: 210,
				children: [
					{id: 31, name: '固定枪机', num: 55},
					{id: 32, name: '半球机', num: 65},
					{id: 33, name: '球机', num: 90}
				]
			},
			{
				id: 64, 
				name: '拾音器', 
				num: 35,
				children: [
					{id: 40, name: '定向拾音器', num: 21},
					{id: 41, name: '全向拾音器', num: 14}
				]
			},
			{id: 50, name: '编码器', num: 24},
			{id: 51, name: '解码器', num: 44},
			{id: 52, name: '画面分割器', num: 26},
			{id: 53, name: '监视器', num: 14},
			{id: 54, name: '控制终端', num: 74},
			{id: 65, name: '字符叠加器', num: 4},
			{
				id: 73, 
				name: '网络和附属设备',
				num: 68, 
				children: [
					{id: 60, name: '交换机', num: 18},
					{id: 61, name: '光端机', num: 4},
					{id: 62, name: '光纤收发器', num: 12},
					{id: 63, name: '数字KVM', num: 18},
					{id: 64, name: '数字PDU', num: 4},
					{id: 90, name: '其他设备', num: 12}
				]
			}
		]
	};
}

const DeviceTypeNames = {
	0: "网管服务器", 1: "视频服务器", 2: "视频分析服务器", 3: "存储服务器",
	10: "存储设备",
	20: "数字固定枪机",  21: "数字半球机",  22: "数字球机",
	31: "模拟固定枪机",  32: "模拟半球机",  33: "模拟球机",
	40: "定向拾音器",41: "全向拾音器",
	50: "编码器",  51: "解码器",  52: "画面分割器",53: "监视器",  54: "控制终端", 55: "解码器",
	60: "交换机",  61: "光端机",  62: "光纤收发器",63: "数字KVM",64: "数字PDU", 65: "字符叠加器",
	90: "其他设备"
};

const numArr = [0, 1, 2, 3, 10, 20, 21, 22, 31, 32, 33, 40, 41, 50, 51, 52, 53, 54, 60, 61, 62, 63, 64, 65, 90];

let Devices = [];
let DevicesIds = [];
for (var i = 0; i < 200; i++) {
	let randomNum = numArr[Math.floor(Math.random() * numArr.length)];
	Devices.push({
		id: i,
		name: DeviceTypeNames[randomNum] + i,
		type: DeviceTypeNames[randomNum],
		desc: '描述：' + DeviceTypeNames[randomNum]
	});
	DevicesIds.push(i);
}

Test.getDeviceTree = (params) => {
	if (siteType === 1){
		let arr = [];
		for (var i = 0; i < siteNames.length-1; i++) {
			arr.push(getDeviceTree(i));
		}
		return {
			id: -1,
			children: arr
		};
	} else {
		let treeData = getDeviceTree(0);
		treeData.name = '西直门';
		return {
			id: -1,
			children: [treeData]
		};
	}
};

Test.getDevieList = (params) => {
	return {
		headers: {
			titles: ['设备类型','设备名称', '备注'],
			columns: ['type', 'name', 'desc'],
			widths: [30, 30, 40]
		},
		total: Devices.length,
		data: getData2Grid(params, Devices).data
	}
};

Test.getCreateDevice = (params) => {
	return {
		name: '',
		type: params.id,
		typeName: DeviceTypeNames[params.id],
		properties: [
			{key: 'ip', title: 'IP地址', value: ''},
			{key: 'version', title: '软件版本号', value: ''},
			{key: 'driver', title: '厂家及型号', value: 1, type: 'dropdown', list: [
				{name: '大华', value: 1},
				{name: '海康', value: 2},
				{name: '安讯士', value: 3},
				{name: '华为', value: 4},
				{name: '网力', value: 5}
			]},
			{key: 'desc', title: '备注', value: ''}
		]
	}
};

Test.getEditDevice = (params) => {
	return {
		id: params.id,
		name: 'xxx设备',
		type: params.id,
		typeName: '设备',
		properties: [
			{key: 'ip', title: 'IP地址', value: '192.168.21.1'},
			{key: 'version', title: '软件版本号', value: '1.0.1'},
			{key: 'desc', title: '备注', value: 'XXX设备描述信息'}
		]
	}
};

Test.createDevice = (params) => {
	Devices.unshift({
		id: Devices.length+1,
		name: params.name,
		type: DeviceTypeNames[params.type],
		desc: '描述：' + DeviceTypeNames[params.type]
	});
};

Test.editDevice = (params) => {
	Devices.forEach((device) => {
		if (device.id == params.id) 
			device.name = params.name;
	});
};

Test.deleteDevices = (params) => {
	var arr = _.difference(DevicesIds, params.ids);
	if (arr.length === 0) 
		return Devices = [];
	Devices = _.reduce(Devices, (acc, device) => {
		if (_.indexOf(arr, device.id) > -1)
			acc.push(device);
		return acc;
	}, []);
};

/********************摄像机分区*************************/
const zone = {
	id: 50, 
	name: '站台层', 
	num: 34,
	children: [
		{id: 20, name: '枪机', num: 15},
		{id: 21, name: '球机', num: 11},
		{id: 22, name: '半球机', num: 8}
	]
};
function getZoneTree(k) {
	let arr = [];
	for (var i = -2; i < k; i++) {
		let one = _.cloneDeep(zone);
		one.id = one.id + i;
		one.name = one.name + i;
		arr.push(one);
	}
	return {
		id: i+1,
		name: siteNames[i],
		children: arr
	};
}

Test.getZoneTree = (params) => {
	if (siteType === 1){
		let arr = [];
		for (var i = 0; i < siteNames.length-1; i++) {
			arr.push(getZoneTree(i));
		}
		return {
			id: -1,
			children: arr
		};
	} else {
		let treeData = getZoneTree(0);
		treeData.name = '西直门';
		return {
			id: -1,
			children: [treeData]
		};
	}
};

Test.createZone = (params) => {
	return {
		id: 123,
		name: params.name,
		num: 0,
		children: [
			{id: 1234, name: '枪机', num: 0},
			{id: 1235, name: '半球', num: 0},
			{id: 1236, name: '球机', num: 0}
		]
	}
};

Test.getZone = (params) => {
	return {
		id: params.id,
		name: '站台层'
	}
};

Test.editZone = (params) => {

};

Test.deleteZone = (params) => {

};

let Cameras = [];

for (var i = 0; i < 180; i++) {
	Cameras.push({
		id: i,
		name: '摄像机'+i,
		type: ['数字枪机', '数字半球', '数字球机', '模拟枪机', '模拟球机', '模拟半球'][_.random(0, 5)],
		desc: '描述描述描述' + i
	});
}

Test.getCamerasList = (params) => {
	return {
		headers: {
			titles: ['设备类型','设备名称', '备注'],
			columns: ['type', 'name', 'desc'],
			widths: [30, 30, 40]
		},
		total: Cameras.length,
		data: getData2Grid(params, Cameras).data
	}
};

Test.getCameras = (params) => {
	let a20 = [];
	let a21 = [];
	let a22 = [];
	for (var i = 0; i < 200; i++) {
		let type = _.random(0, 2);
		if (type == 0)
			a20.push({id: i, name: '站台层-东侧-电梯-上行'+i})
		else if (type == 1)
			a21.push({id: i, name: '摄像机'+i})
		else
			a22.push({id: i, name: '摄像机'+i})
	}
	return {
		id: -1,
		children: [
			{id: 1000, name: '枪机', children: a20},
			{id: 1001, name: '球机', children: a21},
			{id: 1002, name: '半球', children: a22}
		]
	};
};

Test.addCameras = (params) => {
	return [
		{
			id: 48,
			children: [
				{id: 20, num: 20},
				{id: 21, num: 21},
				{id: 22, num: 22}
			]
		}
	]
};

Test.deleteCameras = (params) => {
	return [
		{
			id: 48,
			children: [
				{id: 20, num: 20},
				{id: 21, num: 21},
				{id: 22, num: 22}
			]
		},
		{
			id: 49,
			children: [
				{id: 20, num: 30},
				{id: 21, num: 31},
				{id: 22, num: 32}
			]
		}
	]
};

/*************电视墙/存储管理***************/
Test.getLineTree = (params) => {
	return {
		id: -2,
		children: _.map(Sites, (site, idx) => {
			return {id: site.id, name: site.name};
		})
	}
};

Test.getVideoList = (params) => {
	let arr = null;
	if (params.siteId) 
		arr = new Array(params.siteId+1);
	 else 
		arr = '123'.split('');
	return _.map(arr, (item, idx) => {
		return {
			id: idx+1, 
			name: '电视墙'+idx, 
			monitor: {
				name: '监视器'+idx, 
				style: '大华'
			}, 
			decoder: {
				name: '解码器'+idx, 
				style: '海信'
			}
		};
	});
};

Test.getVideo = (params) => {
	return {
		id: 1,
		monitor: params.id ? 1: '',
		decoder: params.id ? 2: '',
		port: params.id ? 1: '',
		monitorList: _.map(new Array(5), (item, idx) => {
			return {value: idx, name: '监视器' + (idx+1)};
		}),
		decoderList: _.map(new Array(10), (item, idx) => {
			return {value: idx, name: '解码器' + (idx+1), ports: _.map(new Array(_.random(1, 8)), (id, index) => {
				return index + 1;
			})};
		})
	};
};

Test.editVideo = (params) => {

};

Test.addVideo = (params) => {

};

Test.deleteVideo = (params) => {
	
};

Test.getPlanList = (params) => {
	let arr = null;
	if (params.siteId) 
		arr = new Array(params.siteId+1);
	 else 
		arr = '123'.split('');
	return _.map(arr, (item, idx) => {
		return {
			id: idx+1, 
			name: '存储计划'+idx, 
			storage: '存储服务器'+idx,
			circle: [7, 15, 30][_.random(0, 2)],
			days: [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 0], [0, 6]][_.random(0, 2)],
			from: '00:00',
			to: '24:00'
		};
	});
};

Test.getPlan = (params) => {
	return {
		id: params.id || 1,
		name: '存储计划-1',
		siteName: '西直门',
		circle: [7, 15, 30][_.random(0, 2)],
		from: '00:00',
		to: '24:00',
		storage: 1,
		storageList: _.map('123'.split(''), (storage, idx) => {
			return {id: idx, name: '存储服务器-'+idx};
		}),
		deviceName: '摄像机',
		cameras: [],
		freeCameras: []
	};
};

// 		id:params.id,
// 		name:params.name,
// 		siteId: CurrentSite.id,
// 		ssIds: params.storages,
// 		cameraIds: params.cameras ? params.cameras : [],
// 		monitorIds: params.monitors ? params.monitors : [],
// 		circle: params.circle,
// 		days: params.days,
// 		from: params.from,
// 		to: params.to,
// 		storages: IX.map(params.storages, function(s){ return "存储服务器"+s;})