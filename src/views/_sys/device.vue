<template>
<div id="body" transition="fade">
	<div class="sys-device">
		<div class="list-tree">
			<div class="title">线路设备列表</div>
			<tree-view
				:tree-data="treeData"
				@active-node="getGridParams"
			></tree-view>
		</div>
		<div class="list-grid">
			<grid 
				:clz="grid.clz" 
				:title="grid.title"
				:has-checkbox="grid.hasCheckbox"
				:paginative="grid.paginative"
				:headers="headers" 
				:tools="grid.tools"
				:actions="actions"
				:get-data="grid.getData"
				:auto-handle="true",
				@handle="handleFn"
			></grid>
		</div>
		<dialog 
			:show.sync="dialog.show" 
			:clz="dialog.clz"
			:title="dialog.title"
			:unit.sync="dialog.unit" 
			@ok-fn="okFn">
			<div slot="content">{{dialog.content}}</div>
		</dialog>
	</div>
</div>
</template>
<script>

	import treeView from '../../components/tree/tree.vue';
	import grid from '../../components/grid/grid.vue';
	import dialog from '../../components/dialog.vue';
	import Utils from '../../libs/utils.js';

	let Caller = TNM.Global.sysCaller;
	export default {
		data () {
			const _self = this;
			return {
				treeData: {},
				selected: null,
				item: null,
				gridParams: {
					siteId: null,
					majorTypeId: null,
					deviceTypeId: null
				},
				gridData: {
					headers: {
						titles: [],
						columns: [],
						widths: []
					}
				},
				grid: {
					clz: 'device-grid',
					title: '设备列表',
					paginative: true,
					hasCheckbox: false,
					tools: {},
					getData (params, cbFn) {
						Caller('getDevieList', _.merge({}, _self.gridParams, params), (result) => {
							result.headers.widths = _.map(result.headers.widths, (width) => {
								return Math.floor(width * 0.80);
							});
							_self.gridData.headers = result.headers;
							cbFn(result);
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
			headers () {
				return this.gridData.headers;
			},
			actions () { 
				return window.Super ? [
					['login', '登录', this.login],
					['edit', '编辑', this.edit]
				] : [];
			}
		},
		methods: {
			findItem (node, n) {
				if (node.tier != n) {
					this.findItem(node.getParent(), n);
				} else {
					this.item = {
						id: node.id,
						name: node.name
					};
					return;
				}
			},
			getGridParams (model) {
				this.selected = model;
				let params = this.gridParams;
				if (model.tier === 0){
					params.siteId = model.id;
					params.majorTypeId = null;
					params.deviceTypeId = null;
					this.grid.title = model.name + '设备列表';
				} else if (model.tier === 1) {
					this.findItem(model, 0);
					params.siteId = this.item.id;
					params.majorTypeId = model.id;
					params.deviceTypeId = null;
					this.grid.title = this.item.name + '/' + model.name + '列表';
				} else {
					this.findItem(model, 0);
					params.siteId = this.item.id;
					const name = this.item.name;
					this.findItem(model, 1);
					params.majorTypeId = this.item.id;
					params.deviceTypeId = model.id;
					this.grid.title = name + '/' + this.item.name + '/' + model.name + '列表';
				}
				this.gridCbfn();
			},
			handleFn (cbFn) {
				this.gridCbfn = cbFn;
			},
			//default dialog okFn
			okFn () {},
			showDialog (cfg) {
				for (let key in this.dialog) {
					this.dialog[key] = cfg[key];
				}
				this.dialog.show = true;
			},
			edit (cbFn, item) {
				const _self = this;
				Caller('getEditDevice', {id: item.id}, (result) => {
					_self.showDialog({
						clz: 'edit-device',
						title: '编辑设备',
						unit: result
					});
					_self.okFn = () => {
						let msg = Utils.validator(result, _self.dialog.clz);
						if (msg)
							return;
						Caller('editDevice', result, () => {
							_self.dialog.show = false;
							cbFn();
						});
					}
				});
			},
			login (cbFn, item) {
				window.open(`http://${item.ip}:${item.port}`);
			}
		},
		components: {
			treeView,
			grid,
			dialog
		},
		ready () {
			const _self = this;
			Caller('getDeviceTree', {}, (result) => {			
				_self.treeData = result;
			});
		}
	}
</script>
<style lang="less">
	.sys-device{
		position: relative;
		.title{
			border-bottom: 1px solid #1f2c39;
		}
		.list-tree{
			width: 250px;
			position: absolute;
			top: 0;
			left: 0;
			.t-body{
				min-height: 855px;
				max-height: 855px;
			}
		}
		.list-grid{
			margin-left: 260px;
			.v-body{
				min-height: 780px;
			}
		}
		.edit-device{
			.pro-type{
				display: none;
			}
			.label{
				width: 90px;
			}
		}
		.act-login{
			width: 46px !important;
			background-image: url(../../assets/images/pic/ico-login.png);
		}
	}
</style>