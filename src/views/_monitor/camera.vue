<template>
<div id="body" transition="fade">
	<div class="camera-list">
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
				:date-picker="grid.datePicker"
				:auto-handle="true"
				:params="gridParams"
				:get-data="grid.getData"
				:html="html"
				@change-dropdown="dropdownFn"
				@handle="handleFn"
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

	let Caller = TNM.Global.monitorCaller;
	export default {
		data () {
			const _self = this;
			return {
				treeData: {},
				selected: null,
				item: null,
				gridTools: {
					dropdowns: [
						{key: 'status', title: '设备状态', list: [
							{name: '所有', value: null},
							{name: '在线', value: 1},
							{name: '离线', value: 0}
						]}
					]
				},
				gridParams: {
					siteId: null,
					zoneId: null,
					status: null
				},
				grid: {
					clz: 'camera-grid',
					title: '摄像机列表',
					hasCheckbox: false,
					datePicker: false,
					paginative: true,
					sequence: null,
					headers: {
						titles: ['摄像机名称', '所属分区', '摄像机类型', '摄像机IP', '在线状态'],
						columns: ['name', 'zoneName', 'type', 'ip', 'status']
					},
					getData (params, cbFn) {
						Caller('getCameraList', params, cbFn);
					}
				}
			};
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
					params.zoneId = null;
					this.grid.title = model.name + '摄像机列表';
				} else {
					this.findItem(model, 0);
					params.siteId = this.item.id;
					params.zoneId = model.id;
					this.grid.title = this.item.name + '/' + model.name + '摄像机列表';
				} 
				this.gridCbFn();
			},
			handleFn (cbFn) {
				this.gridCbFn = cbFn;
			},
			dropdownFn (key, value) {
				this.gridCbFn();
			}
		},
		components: {
			treeView,
			tnmGrid
		},
		ready () {
			const _self = this;
			Caller('getCameraTree', {}, (result) => {			
				_self.treeData = result;
			});
		}
	}
</script>
<style lang="less">
	.camera-list{
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
		.col-name, .col-zoneName, .col-type, .col-ip{
			width: 22%;
		}
		.col-status{
			width: 10%;
			border-right: none !important;
		}
	}
</style>