<template>
<div id="body" transition="fade">
	<div class="fault-list">
		<div class="list-tree">
			<div class="title">设备列表</div>
			<tree-view
				:tree-data="treeData"
				@active-node="getGridParams"
				v-ref:tree
			></tree-view>
		</div>
		<div class="list-grid">
			<tnm-grid
				:clz="grid.clz"
				:title="grid.title"
				:has-checkbox="grid.hasCheckbox"
				:sequence="grid.sequence"
				:paginative="grid.paginative"
				:headers="grid.headers"
				:tools="gridTools"
				:actions="actions"
				:date-picker="grid.datePicker"
				:auto-handle="true"
				:params="gridParams"
				:get-data="grid.getData"
				:html="html"
				@change-dropdown="dropdownFn"
				@handle="handleFn"
				@click-row="clickRowFn"
				v-ref:grid
			></tnm-grid>
		</div>
	</div>
</div>
</template>
<script>

	import treeView from '../../components/tree/tree.vue';
	import tnmGrid from '../../components/tnmGrid.vue';
	import Utils from '../../libs/utils.js';

	let Caller = TNM.Global.faultCaller;
	export default {
		data () {
			const _self = this;
			return {
				treeData: {},
				selected: null,
				item: null,
				gridTools: {
					// disableds: ['add', 'delete'],
					// btns: {
					// 	delete: (cbFn, ids) => {
					// 		console.log(ids)
					// 	},
					// 	add: (cbFn, ids) => {
					// 		console.log(ids);
					// 	}
					// },
					dropdowns: [
						{key: 'level', title: '告警级别', list: [
							{name: '所有', value: null},
							{name: '一般', value: 1},
							{name: '严重', value: 2}
						]},
						{key: 'status', title: '处理状态', list: [
							{name: '所有', value: null},
							{name: '已处理', value: 1},
							{name: '未处理', value: 0}
						]}
					]
				},
				gridParams: {
					siteId: null,
					majorTypeId: null,
					deviceTypeId: null,
					level: null,
					status: null
				},
				grid: {
					clz: 'fault-grid',
					title: '故障告警',
					hasCheckbox: false,
					datePicker: true,
					paginative: true,
					sequence: null,
					headers: {
						titles: ['告警车站', '设备名称', '告警时间', '告警级别', 'IP地址', '处理标志', '告警内容'],
						columns: ['siteName', 'name', 'time', 'level', 'ip', 'status', 'desc']
					},
					getData (params, cbFn) {
						Caller('getFaultList', params, cbFn);
					}
				}
			};
		},
		computed: {
			html () {
				return ['status'];
			},
			actions () { 
				return [
					['details', '详细信息', this.detailsFn]
				];
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
					this.grid.title = model.name + '故障列表';
				} else if (model.tier === 1) {
					this.findItem(model, 0);
					params.siteId = this.item.id;
					params.majorTypeId = model.id;
					params.deviceTypeId = null;
					this.grid.title = this.item.name + '/' + model.name + '故障列表';
				} else {
					this.findItem(model, 0);
					params.siteId = this.item.id;
					const name = this.item.name;
					this.findItem(model, 1);
					params.majorTypeId = this.item.id;
					params.deviceTypeId = model.id;
					this.grid.title = name + '/' + this.item.name + '/' + model.name + '故障列表';
				}
				this.gridCbFn();
			},
			handleFn (cbFn) {
				this.gridCbFn = cbFn;
			},
			dropdownFn (key, value) {
				this.gridCbFn();
			},
			clickRowFn (event, item) {
				if (event.target.className == 'handle') {
					Caller('handleFault', {ids: [item.id]}, (result) => {
						this.gridCbFn();
					});
				}
			},
			getRootEl (el, clz) {
				if (el.className != clz)
					this.getRootEl(el.parentElement, clz);
				else
					return this.parent = el;
			},
			detailsFn (cbFn, item) {
				this.el = event.target.parentElement.previousElementSibling;
				this.getRootEl(this.el, 'g-body');
				_.forEach(this.parent.getElementsByClassName('col-desc'), (el, idx) => {
					if (el == this.el)
						return;
					el.style.display = 'none';
				});
				if (this.el.style.display == 'block')
					this.el.style.display = 'none';
				else
					this.el.style.display = 'block';
			}
		},
		components: {
			treeView,
			tnmGrid
		},
		ready () {
			const _self = this;
			Caller('getFaultTree', {}, (result) => {			
				_self.treeData = result;
			});
		}
	}
</script>
<style lang="less">
	.fault-list{
		position: relative;
		.list-tree{
			width: 250px;
			position: absolute;
			top: 0;
			left: 0;
			.title{
				border-bottom: 1px solid #1f2c39;
			}
			.t-body {
			    min-height: 900px;
			    max-height: 900px;
			}
		}
		.list-grid{
			margin-left: 260px;
		}
		.t-tool{
			.dropdown, .dropdown-toggle, .dropdown-menu{
				width: 150px;
			}
		}
		.col-siteName, .col-name, .col-ip{
			width: 13%;
		}
		.col-level, .col-status{
			width: 10%;
		}
		.col-time{
			width: 15%;
		}
		.handle{
			background-image: url(../../assets/images/pic/btn-handle.png);
			&:hover{
				background-image: url(../../assets/images/pic/btn-handle-hover.png);
			}
			cursor: pointer;
		}
		.hdr{
			.col-desc{
				width: 26%;
				border-right: none !important;
			}
		}
		.g-body {
			.row{
				position: relative;
			}
			.col-status{
				position: relative;
				height: 35px;
				&>span{
					display: inline-block;
					width: 46px;
					height: 26px;
					&>span{
						position: absolute;
						display: inline-block;
						top: 5px;
						left: 4px;
						width: 46px;
						height: 26px;
					}
				}
			}
			.col-actions{
				width: 26%;
				text-align: left;
				position: absolute;
				right: 0;
				top: 0;
			}
			.col-desc{
				width: 100%;
				background: #fff;
				height: 70px;
				overflow-y: auto;
				display: none;
				color: #666;
				border-top: 1px solid #00eaff;
			}
		}
		.act-details{
			width: 66px !important;
			height: 26px !important;
			background-image: url(../../assets/images/pic/detail.png);
		}
	}
</style>