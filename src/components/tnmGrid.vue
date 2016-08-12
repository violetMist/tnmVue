<template>
<div class="v-grid {{clz}}">
	<div class="title">{{title}}</div>
	<div class="v-tools">
		<tool
			:params="params"
			:disableds="disableds"
			:disabled="isDisabled"
			:btns="tools.btns"
			:dropdowns="tools.dropdowns"
			:date-picker="datePicker"
			:search="search"
			@click-btn="clickBtnFn"
			@check-dropdown="dropdownFn"
			@change-params="changeParamsFn"
		></tool>
	</div>
	<div class="v-body">
		<base-grid 
			:clz="clz" 
			:has-checkbox="hasCheckbox"
			:sequence="sequence"
			:headers="headers" 
			:page-no="defaultParams.pageNo"
			:page-size="defaultParams.pageSize"
			:items="items" 
			:html="html"
			:select-arr.sync="selectArr"
			:actions="gridActions"
			@check-box="getSelectArr"
			@click-row="clickRowFn"
		></base-grid>
	</div>
	<div class="v-foot">
		<pagination
			v-if="paginative"
			:page-no="defaultParams.pageNo"
			:page-size="defaultParams.pageSize"
			:total="total"
			@change-page="changePage"
		></pagination>
	</div>
</div>
</template>
<script>

	import tool from './tool.vue';
	import baseGrid from './grid/baseGrid.vue';
	import pagination from './pagination.vue';

	/**
	 * params: {
	 * 		clz,				//表格class
	 * 		hasCheckbox,		//是否显示checkbox
	 * 		tools: {			//tools对象
	 * 			disableds: []	//默认disabled状态按钮
	 * 			btns: {key: (cbFn, ids) => {}},		//按钮点击执行函数
	 * 			dropdowns: [{key, title, value, list: [{name, value}], disabled}],			//下拉框列表
	 * 		}
	 * 		params: {}				//grid参数				
	 * 		datePicker: Boolean 	//是否显示日历搜索
	 * 		search: String 		//搜索框搜索字段
	 * 		sequence,			//显示自动排序--名字
	 * 		paginative,			//boolean
	 * 		headers: [			//显示表格头和列数及是否拥有width
	 * 			titles: [],		//对应columns的显示文字
	 *   		columns: [],	//表格显示列
	 * 			[widths]: []	//列宽度集合
	 * 		],
	 * 		html: []			//显示html
	 * 		actions: [			//对于每一列表格元素的所有操作集合
	 * 			[key, name, (cbFn, item) => {...}]
	 * 		],			
	 * 		getData (params, cbFn) {
				Caller('name', _.merge({s: 1}, params), cbFn);
			},
			autoHandle			//是否手动加载数据，默认false
	 * }
	 */
	 /**@*/
	export default {
		props: {
			title: String,
			clz: String,
			paginative: {
				type: Boolean,
				default: false
			},
			datePicker: {
				type: Boolean,
				default: false
			},
			search: {
				type: null,
				default: ''
			},
			hasCheckbox: {
				type: Boolean,
				default: false
			},
			autoHandle: {
				type: Boolean,
				default: false
			},
			tools: {
				type: Object,
				default () {
					return {};
				}
			},
			params: {
				type: Object,
				default () {
					return {};
				}
			},
			sequence: null,
			headers: Object,
			actions: {
				type: Array,
				default () {
					return [];
				}
			},
			html: Array,
			getData: Function
		},
		data () {
			return {
				data: {total: 0},
				defaultParams: {
					pageNo: 0,
					pageSize: 20
				},
				isDisabled: 'disabled',
				selectArr: [],
				format: "yyyy-MM-dd hh:mm",
				reset: true
			};
		},
		computed: {
			disableds () {
				let arr = _.cloneDeep(this.tools.disableds);
				return arr;
			},
			from () {
				let date = new Date().getTime();
				return this.getDate(date);
			},
			to () {
				let date = new Date().getTime() + 24*60*60*1000;
				return this.getDate(date);
			},
			cbFn () {
				return () => {
					this.getData(this.gridParams(), (result) => {
						this.data = result;
						this.isDisabled = 'disabled';
						this.selectArr = [];
					});
				};
			},
			items () {
				const _self = this;
				if (this.data.data) {
					return _.reduce(this.data.data, (acc, item) => {
						if (item.actions) {
							let obj = _.cloneDeep(item.actions);
							item.actions.forEach((action, idx) => {
								obj[idx][2] = (item) => {
									action[2](_self.cbFn, item);
								};
							});
							item.actions = obj;
						}
						acc.push(item);
						return acc;
					}, []);
				}
				return this.data.data;
			},
			total () {
				return this.data.total;
			},
			gridActions () {
				const _self = this;
				let actionArr = _.cloneDeep(_self.actions);
				_self.actions.forEach((action, idx) => {
					actionArr[idx][2] = (item) => {
						//actionFn (cbFn, item) 回调函数
						action[2](_self.cbFn, item); 
					};
				});
				return actionArr;
			}
		},
		methods: {
			gridParams () {
				if (this.datePicker && !this.params.from)
					this.params.from = this.from;
				if (this.datePicker && !this.params.to)
					this.params.to = this.to;
				return _.assign(this.defaultParams, this.params);
			},
			getDate (date) {
				let _date = new Date(date).toLocaleDateString().split("/").map((item, idx) => {
					if (idx>0) 
						return ('0'+item).slice(-2); 
					return item;
				}).join('-') + ' ' + '00:00:00';
				return new Date(_date).getTime();
			},
			getSelectArr () {
				if (this.selectArr.length === 0) 
					this.isDisabled = 'disabled';
				else
					this.isDisabled = '';
			},
			clickRowFn (event, item) {
				this.$dispatch('click-row', event, item);
			},
			clickBtnFn (key) {
				this.tools.btns[key](this.cbFn, this.selectArr);
			},
			dropdownFn (key, value) {
				this.$dispatch('change-dropdown', key, value);
			},
			changeParamsFn (key, value) {
				this.cbFn();
			},
			checkDate (key, value) {
				this.params[key] = new Date(value).getTime();
			},
			searchDate () {
				const _self = this;
				if (_self.params.from > _self.params.to)
					return alert("开始时间不能超过结束时间");
				_self.cbFn();
			},
			changePage (pageNo) {
				this.defaultParams.pageNo = pageNo;
				this.cbFn();
			},
			setData (_data) {
				this.data = _data;
			}
		},
		components: {
			tool,
			baseGrid,
			pagination
		},
		ready () {
			if (!this.paginative) {
				delete this.defaultParams.pageNo;
				delete this.defaultParams.pageSize;
			}
			if (this.autoHandle) 
				this.$dispatch('handle', this.cbFn);
			else
				this.cbFn();
		}
	}
</script>
<style lang="less">
	.v-grid{
		.v-tools{
			padding: 10px 10px 20px 20px;
			background: #fff;
		}
		.v-body{
			padding: 0 15px;
			background: #fff;
			min-height: 780px;
		}
		.v-foot{
			height: 45px;
			background: #f7f7f7;
			padding-top: 10px;
			border-radius: 0 0 5px 5px;
		}
	}
</style>