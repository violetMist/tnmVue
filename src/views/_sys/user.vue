<template>
<div id="body" transition="fade">
	<div class="user-grid">
		<grid 
			:clz="grid.clz" 
			:title="grid.title"
			:has-checkbox="hasCheckbox"
			:paginative="grid.paginative"
			:headers="grid.headers" 
			:tools="tools"
			:get-data="grid.getData"
		></grid>
	</div>
	<dialog 
		:show.sync="dialog.show" 
		:clz="dialog.clz"
		:title="dialog.title"
		:input-types="inputTypes"
		:unit.sync="dialog.unit" 
		@ok-fn="okFn">
		<div slot="content">{{{dialog.content}}}</div>
	</dialog>
</div>
</template>
<script>
	import grid from '../../components/grid/grid.vue';
	import dialog from '../../components/dialog.vue';
	import Utils from '../../libs/utils.js';

	const Caller = TNM.Global.sysCaller;

	export default {
		data () {
			const _self = this;
			return {
				actionList: [
					['chgpwd', '修改密码', _self.chgpwd],
					['edit', '编辑', _self.edit],
					['deleted', '删除', _self.deleted]
				],
				grid: {
					clz: 'sys-user',
					title: '用户管理',
					paginative: true,
					headers: {
						titles: ['用户名', '登录账号', '用户类型', '说明'],
						columns: ['name', 'account', 'type', 'desc']
					},
					getData (params, cbFn) {
						Caller('getUsers', _.merge({}, params), (result) => {
							//获取grid配置数据，并判断权限显示不同的actions
							let data = _.map(result.data, (user, idx) => {
								if (window.Super) {
									user.actions = _self.actionList;
									if (user.id == window.getConst().userId) 
										user.actions = [].concat([_self.actionList[0]], [_self.actionList[1]]);
								}
								return user;
							});
							cbFn({
								total: result.total,
								data: data
							});
						});
					}
				},
				dialog: {
					show: false,
					clz: '',
					title: '',
					content: '',
					unit: null
				}
			};
		},
		computed: {
			inputTypes () {
				return [
					{key: 'password', type: 'password'},
					{key: 'valPwd', type: 'password'}
				];
			},
			hasCheckbox () {
				return window.Super;
			},
			tools () { 
				const _self = this;
				return window.Super ? _.reduce(['refresh', 'create', 'deleted'], (obj, item) => {
					obj[item] = _self[item];
					return obj;
				}, {}) : {};
			}
		},
		methods: {
			//default dialog okFn
			okFn () {},
			showDialog (cfg) {
				for (let key in this.dialog) {
					this.dialog[key] = cfg[key];
				}
				this.dialog.show = true;
			},
			//重置dialog提交函数
			resetOkFn (cfg, cbFn) {
				this.okFn = () => {
					if (this.dialog.clz == 'create-user' && cfg.params.password !== cfg.params.valPwd)
						return alert('两次输入密码不一致，请重新输入');
					let msg = Utils.validator(cfg.params, this.dialog.clz);
					if (msg)
						return;
					delete cfg.params.valPwd;
					delete cfg.params.dropdownArr;
					delete cfg.params.dropdownList;
					Caller(cfg.callerName, cfg.params, () => {
						this.dialog.show = false;
						cbFn();
					});
				};
			},
			//表格刷新
			refresh (cbFn) {
				cbFn();
			},
			//新建用户
			create (cbFn) {
				let unit = _.reduce(['name', 'account', 'password', 'valPwd', 'desc', 'type'], (acc, item, idx) => {
					acc[item] = '';
					return acc;
				}, {});
				unit.dropdownArr = ['type'];
				const Const = window.getConst().Const;
				unit.dropdownList = {
					type: [
						{name: Const.UserTypeNamesHT[Const.UserTypes.Admin], value: Const.UserTypes.Admin},
						{name: Const.UserTypeNamesHT[Const.UserTypes.User], value: Const.UserTypes.User}
					]
				};
				this.showDialog({
					clz: 'create-user',
					title: '新建用户',
					unit: unit
				});
				this.resetOkFn({
					callerName: 'createUser',
					params: unit
				}, cbFn);
			},
			//编辑用户
			edit (cbFn, item) {
				Caller('getUser', {id: item.id}, (result) => {
					const type = result.type;
					this.showDialog({
						clz: 'edit-user',
						title: '编辑用户',
						content: `
						<li class="property">
							<label class="label">用户类型 :</label>
							<span>${window.getConst().Const.UserTypeNamesHT[type]}</span>
						</li>
						`,
						unit: result
					});
					this.resetOkFn({
						callerName: 'editUser',
						params: result
					}, cbFn);
				});
			},
			//删除用户
			deleted (cbFn, selected) {
				const ids = _.isArray(selected) ? selected : [selected.id];
				this.showDialog({
					clz: 'deleted-users',
					title: '删除用户',
					content: '是否删除选中用户？'
				});
				this.okFn = () => {
					const _index = _.indexOf(ids, window.getConst().userId);
					if (_index > -1) 
						ids.splice(_index, 1);
					Caller('deleteUsers', {ids: ids}, () => {
						this.dialog.show = false;
						cbFn();
					});
				};
			},
			//修改密码
			chgpwd (cbFn, item) {
				const unit = {
					password: '',
					valPwd: ''
				}
				this.showDialog({
					clz: 'change-password',
					title: `修改 “${item.name}” 的登录密码`,
					unit: unit
				});
				this.okFn = () => {
					if (unit.password !== unit.valPwd)
						return alert('两次输入密码不一致，请重新输入');
					Caller('changePassword', {id: item.id, password: unit.password}, () => {
						this.dialog.show = false;
						cbFn();
					});
				};
			}
		},
		components: {
			grid,
			dialog
		}
	}
</script>
<style lang="less">
	.sys-user{
		.col-name, .col-account{
			width: 20%;
		}
		.col-type{
			width: 10%;
		}
		.col-desc{
			width: 25%;
		}
		.act-chgpwd{
			background-image: url(../../assets/images/pic/ico-chgpwd.png);
		}
		.act-chgpriv{
			background-image: url(../../assets/images/pic/ico-priv.png);
		}
	}
	.change-password{
		.content{
			.label{width: 90px;}
		}
	}
	.edit-user{
		.pro-type{
			display: none;
		}
	}
	.create-user, .edit-user{
		margin-top: 150px !important;
		.content{
			&>div{
				text-align: left;
				li{
					margin-bottom: 10px;
				}
				span{
					margin-left: 5px;
				}
			}
			.label{width: 80px;}
		}
	}
</style>