<template>
<div id="body" transition="fade">
	<div class="sys-base">
		<div class="list-tree">
			<div class="title">线路列表</div>
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
				:headers="grid.headers" 
				:get-data="grid.getData"
				:auto-handle="true",
				@handle="handleFn"
			></grid>
		</div>
	</div>
</div>
</template>
<script>

	import treeView from '../../components/tree/tree.vue';
	import grid from '../../components/grid/grid.vue';

	let Caller = TNM.Global.sysCaller;
	export default {
		data () {
			const _self = this;
			return {
				treeData: {},
				item: null,
				gridParams: {
					siteId: null
				},
				grid: {
					clz: 'base-grid',
					title: '基础信息',
					paginative: true,
					hasCheckbox: false,
					headers: {
						titles: ['服务器名称', '服务类型', 'IP地址', '版本信息'],
						columns: ['name', 'type', 'ip', 'version']
					},
					getData (params, cbFn) {
						Caller('getBaseList', _.merge({}, _self.gridParams, params), cbFn);
					}
				}
			};
		},
		computed: {
			headers () {
				return this.gridData.headers;
			}
		},
		methods: {
			getGridParams (model) {
				this.gridParams.siteId = model.id;
				this.gridCbfn();
			},
			handleFn (cbFn) {
				this.gridCbfn = cbFn;
			}
		},
		components: {
			treeView,
			grid
		},
		ready () {
			const _self = this;
			Caller('getBaseTree', {}, (result) => {			
				_self.treeData = result;
			});
		}
	}
</script>
<style lang="less">
	.sys-base{
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
		.col-name, .col-type, .col-ip, .col-version{
			width: 22%;
		}
		.col-version{
			border-right: none !important;
		}
	}
</style>