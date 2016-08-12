<template>
<div id="body" transition="fade">
	<div class="stat-list">
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
			@change-dropdown="dropdownFn"
			@handle="handleFn"
			v-ref:grid
		></tnm-grid>
	</div>
</div>
</template>
<script>

	import tnmGrid from '../../components/tnmGrid.vue';
	import Utils from '../../libs/utils.js';

	let Caller = TNM.Global.faultCaller;
	export default {
		data () {
			const _self = this;
			return {
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
					level: null,
					status: null
				},
				grid: {
					clz: 'stat-grid',
					title: '统计分析',
					hasCheckbox: false,
					datePicker: true,
					paginative: true,
					sequence: null,
					headers: {
						titles: ['告警车站', '设备名称', '告警时间', '告警级别', 'IP地址', '处理标志', '告警内容'],
						columns: ['siteName', 'name', 'time', 'level', 'ip', 'handle', 'desc']
					},
					getData (params, cbFn) {
						Caller('getFaultList', params, cbFn);
					}
				}
			};
		},
		computed: {
			
		},
		methods: {
			handleFn (cbFn) {
				this.gridCbFn = cbFn;
			},
			dropdownFn (key, value) {
				this.gridCbFn();
			}
		},
		components: {
			tnmGrid
		},
		ready () {
			this.gridCbFn();
		}
	}
</script>
<style lang="less">
	.stat-list{
		position: relative;
		.t-tool{
			.dropdown, .dropdown-toggle, .dropdown-menu{
				width: 150px;
			}
		}
		.col-siteName, .col-name, .col-ip{
			width: 13%;
		}
		.col-level, .col-handle{
			width: 10%;
		}
		.col-time{
			width: 15%;
		}
		.col-desc{
			width: 26%;
			border-right: none !important;
		}
	}
</style>