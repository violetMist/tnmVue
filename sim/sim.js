const Const = {};
Const.SiteTypes = {TCC : 0, OCC: 1, Depot: 2, Station: 3, BOCC: 4, LinePolice: 5, PTSD:6};
Const.UserTypes = {Super: 0, Admin:1, User :2};
Const.SiteTypeNamesHT = {0: "指挥中心", 1: "控制中心", 2: "车辆段／停车场", 3: "车站", 4: "备用控制中心", 5: "公安派出所", 6: "公交总队"};
Const.UserTypeNamesHT = {0: "超级用户", 1: "管理员", 2: "普通用户"};

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
/********************实时告警*************************/

let FaultDetails = [
	"CPU使用率过高",
	"内存使用率过高",
	"磁盘阵列不能写",
	"磁盘阵列不能读写",
	"磁盘阵列没有做RAID",
	"通道损坏",
	"端口电压异常",
	"端口电流异常",
	"磁盘满",
	"存储文件的完整性检测报警",
	"授权文件错误",
	"授权文件恢复",
	"电源关闭或异常",
	"电源恢复",
	"数据口网络异常",
	"数据口网络恢复",
	"磁盘被拔出或异常",
	"磁盘插入"
];

Test.rtFaults = (params) => {
	return _.map(new Array(_.random(0, 100)), (item, idx) => {
		return {
			id: idx, 
			siteName: siteNames[_.random(0, siteNames.length-1)],
			deviceType: DeviceTypeNames[numArr[_.random(0, numArr.length-1)]],
			details: FaultDetails[_.random(0, FaultDetails.length-1)],
			level: _.random(1, 2),
			time: new Date().getTime() - (60*60*1000*idx)
		};
	});
};


/***********************线路和车站管理****************************/

var Line = {id: 1, name: "13号线"};
var siteIds = [];
var allSiteIds = [];
function genSite(idx, name, type, _idx){
	if (type == 2 || type == 3) {
		siteIds.push(idx);
	}
	allSiteIds.push(idx);
	return {id: idx, name: name, lineId:1, type: type, ip: "192.168.1." + idx, no:idx+1, desc: type===3?("第"+ _idx + "站") : ""};
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
	return _.map(Sites, (site, idx) => {
		return _.assign(site, {level: _.random(0, 2)});
	});
};

/***********************用户管理*********************/

var Users = {
	super : {id: 0, name: "超级用户", type: 0},
	admin : [
		{id: 1, name: "张无忌", account: "admin1", type: 1},
		{id: 2, name: "杨无悔", account: "admin2", type: 1},
		{id: 3, name: "赵敏", account: "admin3", type: 1},
		{id: 4, name: "阳顶天", account: "admin4", type: 1}
	],
	users : []
};

var SNames = "赵钱孙李周吴郑王刘花辛魏宋马朱陆".split("");
var LNames = "系统部署时由超级用户创建拥有创建修改删除各自车站的普通用户及赋予权限拥有创建修改删除等权限不能登陆以及云台控制等权限".split("");
var SiteTypeNames = [];
for (var key in SiteTypeNamesHT) {
	SiteTypeNames.push(SiteTypeNamesHT[key]);
}


function getUser(idx){
	var username = getRandonItem(SNames) + getRandonItem(LNames) +  getRandonItem(LNames);
	return {
		id : 10 + idx, name : username, account: "user" + idx, type: 2,
		desc : "<asdasd><asdaSD<asd>"
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
	delete user.actions;
	user.desc = '';
	return user;
};

Test.editUser = (params) => {
	
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


/********************设备管理*************************/
function getDeviceTree(i) {
	return {
		id: i+1,
		name: siteNames[i],
		children: [
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
			{id: 50, name: '编码器', num: 24},
			{id: 51, name: '解码器', num: 41},
			{
				id: 73, 
				name: '网络和附属设备',
				num: 4, 
				children: [
					{id: 64, name: '数字PDU', num: 4}
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
		ip: '192.168.21.'+i,
		port: _.random(0, i),
		version: '1.'+i,
		desc: '描述：' + DeviceTypeNames[randomNum]
	});
	DevicesIds.push(i);
}

Test.getDeviceTree = (params) => {
	let arr = [];
	for (var i = 0; i < siteNames.length-1; i++) {
		arr.push(getDeviceTree(i));
	}
	return {
		id: -1,
		children: arr
	};
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

Test.getEditDevice = (params) => {
	return {
		id: params.id,
		name: 'xxx设备',
		type: params.id,
		typeName: '设备',
		properties: [
			{key: 'version', title: '软件版本号', value: '1.0.1'},
			{key: 'desc', title: '备注', value: 'XXX设备描述信息'},
			{key: 'ip', title: 'IP地址', value: '192.168.21.1'},
			{key: 'port', title: '端口号', value: _.random(0, 500)}
		]
	}
};

Test.editDevice = (params) => {
	Devices.forEach((device) => {
		if (device.id == params.id) 
			device.name = params.name;
	});
};

/********************基础信息*************************/
Test.getBaseTree = (params) => {
	return {
		id: -1,
		children: _.map(Sites, (site, idx) => {
			return {id: site.id, name: site.name};
		})
	}
};

Test.getBaseList = (params) => {
	let devices = _.map(new Array(_.random(0, 50)), (device, idx) => {
		const randomNum = _.random(0, 3);
		return {
			id: idx,
			name: DeviceTypeNames[randomNum] + idx,
			type: DeviceTypeNames[randomNum],
			ip: '192.168.21.'+idx,
			version: '1.'+idx
		}
	});
	return getData2Grid(params, devices);
};


/********************故障告警*************************/
function getFaultTree(i) {
	return {
		id: i+1,
		name: siteNames[i],
		children: [
			{
				id: 50, 
				name: '服务器', 
				children: [
					{id: 0, name: '网管服务器'},
					{id: 1, name: '视频服务器'},
					{id: 2, name: '视频分析服务器'},
					{id: 3, name: '存储服务器'}
				]
			},
			{id: 10, name: '存储设备'},
			{
				id: 56, 
				name: '数字摄像机', 
				children: [
					{id: 20, name: '固定枪机'},
					{id: 21, name: '半球机'},
					{id: 22, name: '球机'}
				]
			},
			{
				id: 60, 
				name: '模拟摄像机', 
				children: [
					{id: 31, name: '固定枪机'},
					{id: 32, name: '半球机'},
					{id: 33, name: '球机'}
				]
			},
			{
				id: 64, 
				name: '拾音器', 
				children: [
					{id: 40, name: '定向拾音器'},
					{id: 41, name: '全向拾音器'}
				]
			},
			{id: 50, name: '编码器'},
			{id: 51, name: '解码器'},
			{id: 52, name: '画面分割器'},
			{id: 53, name: '监视器'},
			{id: 54, name: '控制终端'},
			{id: 65, name: '字符叠加器'},
			{
				id: 73, 
				name: '网络和附属设备',
				children: [
					{id: 60, name: '交换机'},
					{id: 61, name: '光端机'},
					{id: 62, name: '光纤收发器'},
					{id: 63, name: '数字KVM'},
					{id: 64, name: '数字PDU'},
					{id: 90, name: '其他设备'}
				]
			}
		]
	};
}

Test.getFaultTree = (params) => {
	let arr = [];
	for (var i = 0; i < siteNames.length-1; i++) {
		arr.push(getFaultTree(i));
	}
	return {
		id: -1,
		children: arr
	};
}

Test.getFaultList = (params) => {
	let faults = _.map(new Array(_.random(0, 50)), (device, idx) => {
		const randomNum = numArr[_.random(0, numArr.length)];
		return {
			id: idx,
			siteName: '站点',
			name: DeviceTypeNames[randomNum] + idx,
			type: DeviceTypeNames[randomNum],
			time: new Date().getTime() - 1000 * _.random(0, 10000),
			level: _.random(1, 2),
			ip: '192.168.21.'+idx,
			status: _.random(0, 1),
			desc: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'
		}
	});
	return getData2Grid(params, faults);
};

Test.handleFault = (params) => {

};

/*****************************摄像机状态**********************************/

function getCameraTree(i) {
	return {
		id: i+1,
		name: siteNames[i],
		children: _.map(new Array(_.random(0, 6)), (item, idx) => {
			return {id: idx+1, name: '站台层' + (idx + 1)};
		})
	};
}

Test.getCameraTree = (params) => {
	let arr = [];
	for (var i = 0; i < siteNames.length-1; i++) {
		arr.push(getCameraTree(i));
	}
	return {
		id: -1,
		children: arr
	};
};

Test.getCameraList = (params) => {
	let Cameras = _.map(new Array(_.random(0, 50)), (device, idx) => {
		const randomNum = numArr[_.random(0, numArr.length)];
		return {
			id: idx,
			name: '摄像机'+idx,
			type: ['数字枪机', '数字半球', '数字球机', '模拟枪机', '模拟球机', '模拟半球'][_.random(0, 5)],
			zoneName: '站台层',
			ip: '192.168.2.'+idx,
			status: _.random(0, 1)
		}
	});
	return getData2Grid(params, Cameras);
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