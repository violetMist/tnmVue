<template>
<div class="v-grid {{clz}}">
	<div class="title">{{title}}</div>
	<div class="v-tools">
		<div class="btn-{{$key}} btn {{$key == 'deleted'? isabled : ''}}" :data-key="$key" v-for="tool of tools" @click="toolFn($key, tool)"></div>
		<slot name="tool-extend"></slot>
		<div class="date-picker" v-if="datePicker">
			<span>时间：</span>
			<datepicker
				key="from"
			  	:value.sync="from"
			  	:disabled-days-of-Week="disabled"
			  	:format="format"
			  	:show-reset-button="reset"
			  	@check-date="checkDate"
			></datepicker>
			<span> --</span>
			<datepicker
				key="to"
			  	:value.sync="to"
			  	:disabled-days-of-Week="disabled"
			  	:format="format"
			  	:show-reset-button="reset"
			  	@check-date="checkDate"
			></datepicker>
			<button class="okDate" @click="searchDate">查询</button>
		</div>
		<div class="search rt" v-if="search">
			<input type="text" id="search" v-model="params.searchKey" @keyup="searchFn" placeholder="搜索" class="form-control">
			<a class="grid-search btn" @click="searchFn"></a>
		</div>
	</div>
	<div class="v-body">
		<base-grid 
			:clz="clz" 
			:has-checkbox="hasCheckbox"
			:sequence="sequence"
			:headers="headers" 
			:page-no="params.pageNo"
			:page-size="params.pageSize"
			:items="items" 
			:select-arr.sync="selectArr"
			:actions="gridActions"
			@check-box="getSelectArr"
		></base-grid>
	</div>
	<div class="v-foot">
		<pagination
			:page-no="params.pageNo"
			:page-size="params.pageSize"
			:total="total"
			@change-page="changePage"
			v-if="paginative"
		></pagination>
	</div>
</div>
</template>
<script>
	import baseGrid from '../../components/grid/baseGrid.vue';
	import datepicker from '../Datepicker.vue';
	import pagination from '../pagination.vue';

	/**
	 * params: {
	 * 		clz,				//表格class
	 * 		hasCheckbox,		//是否显示checkbox
	 * 		tools: {			//tools对象
	 * 			//回调为表格刷新，selected选中的item数组
	 * 			deleted (cbFn, selected) {
	 * 				
	 * 			}
	 * 		}				
	 * 		datePicker,			//是否显示日历搜索
	 * 		search,				//是否显示时搜索框
	 * 		sequence,			//显示自动排序--名字
	 * 		paginative,			//boolean
	 * 		headers: [			//显示表格头和列数及是否拥有width
	 * 			titles: [],		//对应columns的显示文字
	 *   		columns: [],	//表格显示列
	 * 			[widths]: []	//列宽度集合
	 * 		],
	 * 		items: [			//表格显示数据
	 * 			{id, name....}
	 * 		],
	 * 		actions: [			//对于每一列表格元素的所有操作集合
	 * 			[key, name, (item) => {...}]
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
				type: Boolean,
				default: false
			},
			hasCheckbox: {
				type: Boolean,
				default: false
			},
			autoHandle: {
				type: Boolean,
				default: false
			},
			tools: Object,
			sequence: null,
			headers: Object,
			actions: Array,
			getData: Function
		},
		data () {
			return {
				isabled: 'disabled',
				data: {total: 0},
				params: {
					pageNo: 0,
					pageSize: 20
				},
				selectArr: [],

				format: "yyyy-MM-dd hh:mm",
				reset: true
			};
		},
		computed: {
			cbFn () {
				return () => {this.getData(this.params, (result) => {
					this.data = result;
					this.isabled = 'disabled';
					this.selectArr = [];
				});};
			},
			from () {
				const now = new Date(new Date().getTime() - 24*60*60*90000);
				return this.getDate(now);
			},
			to () {
				const now = new Date(new Date().getTime() + 24*60*60*1000);
				return this.getDate(now);
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
			getDate (date) {
				return date.toLocaleDateString().split("/").map((item, idx) => {if(idx>0) return ('0'+item).slice(-2); return item;}).join('-') + ' ' + '00:00';
			},
			getSelectArr () {
				if (this.selectArr.length === 0) 
					this.isabled = 'disabled';
				else
					this.isabled = '';
			},
			toolFn (key, tool) {
				const _self = this;
				if (key == 'deleted' && _self.isabled == 'disabled')
					return;
				// tool (cbFn, selectArr) 回调函数
				tool(_self.cbFn, _self.selectArr);
			},
			searchFn (event) {
				const _self = this;
				if (event.type == 'click' || event.type == 'keyup' && event.key == 'Enter')
					_self.cbFn();
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
				const _self = this;
				_self.params.pageNo = pageNo;
				_self.cbFn();
			}
		},
		components: {
			baseGrid,
			datepicker,
			pagination
		},
		ready () {
			if (this.datePicker) {
				this.params.from = new Date(this.from).getTime();
				this.params.to = new Date(this.to).getTime();
			}
			if (!this.paginative) {
				delete this.params.pageNo;
				delete this.params.pageSize;
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
			padding: 20px 10px 10px 20px;
			height: 70px;
			background: #fff;
			[class^="btn-"] {
				margin-right: 10px;
				height: 35px;
				min-width: 20px;
			}
			.btn-refresh{
				width: 35px;
				background-image: url(../../assets/images/pic/btn-refresh.png);
				&:hover{
					background-image: url(../../assets/images/pic/btn-refresh-hover.png);
				}
			}
			.btn-create{
				width: 70px;
				background-image: url(../../assets/images/pic/btn-create.png);
				&:hover{
					background-image: url(../../assets/images/pic/btn-create-hover.png);
				}
			}
			.btn-deleted{
				width: 70px;
				background-image: url(../../assets/images/pic/btn-delete.png);
				&.disabled{
					background-image: url(../../assets/images/pic/btn-delete-disable.png);
					&:hover{
						background-image: url(../../assets/images/pic/btn-delete-disable.png);
					}
				}
				&:hover{
					background-image: url(../../assets/images/pic/btn-delete-hover.png);
				}
			}
			.date-picker{
				display: inline-block;
				color: #666;
				vertical-align: top;
				margin-top: 2px;
			}
			.okDate{
				width: 50px;
				height: 30px;
				color: #fff;
				margin-left: 5px;
				cursor: pointer;
				vertical-align: top;
				background: #209bd5;
				border: 1px solid #fff;
				border-radius: 4px;
				&:hover{
					background: #0088d5;
				}
			}
			.search{
				height: 25px;
				margin-right: 5px;
				position: relative;
				input{
					height: 25px;
				}
				.grid-search{
					position: absolute;
					top: 4px;
					right: 4px;
					width: 16px; 
					height: 16px;
					background: url(../../assets/images/ixpic/ico-search.png) no-repeat;
				}
			}
		}
		.v-body{
			padding: 0 15px;
			background: #fff;
			min-height: 750px;
		}
		.v-foot{
			height: 45px;
			background: #f7f7f7;
			padding-top: 10px;
			border-radius: 0 0 5px 5px;
		}
	}
</style>