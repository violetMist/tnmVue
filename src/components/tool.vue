<template>
<div class="t-tool">
	<div class="btn-{{$key}} btn {{isDisabled($key) ? disabled : ''}}" v-for="btn of btns" @click="btnFn($key)"></div>
	<div class="tool-dropdown dropdown-{{item.key}}" v-for="item of dropdowns">
		<label class="label" for="{{item.key}}">{{item.title}} :</label>
		<dropdown
			:key="item.key"
			:name="getDropName(params[item.key], item.list)"
			:value="params[item.key]"
			:disabled="item.disabled"
			:list="item.list"
			@check-fn="defaultCheck"
		></dropdown>
	</div>
	<div class="date-picker" v-if="datePicker">
		<span>时间：</span>
		<datepicker
			key="from"
		  	:value.sync="from"
		  	:format="format"
		  	@check-date="checkDate"
		></datepicker>
		<span> --</span>
		<datepicker
			key="to"
		  	:value.sync="to"
		  	:format="format"
		  	@check-date="checkDate"
		></datepicker>
	</div>
	<div class="search rt" v-if="search">
		<input type="text" id="search" v-model="params[search]" @keyup="searchFn(search)" placeholder="搜索{{search}}" class="form-control">
		<a class="grid-search btn" @click="searchFn(search)"></a>
	</div>
</div>
</template>
<script>

	import datepicker from './Datepicker.vue';
	import dropdown from './dropdown.vue';

	/**
	 * params {
	 * 		params: {}		//参数
	 * 		disableds: []	//默认disabled状态
	 * 		btns: {
	 * 			key: () => {} 	//click执行函数
	 * 		},
	 * 		dropdowns: [
	 * 			{key, title, list: [{name, value}], disabled}
	 * 		],
	 * 		datePicker: Boolean
	 * 		search: Boolean
	 * }
	 */
	export default {
		props: {
			params: {
				type: Object,
				default () {
					return {};
				}
			},
			disableds: {
				type: Array,
				default () {
					return ['delete'];
				}
			},
			disabled: String,
			btns: {
				type: Object,
				default () {
					return {};
				}
			},
			dropdowns: {
				type: Array,
				default () {
					return [];
				}
			},
			datePicker: {
				type: Boolean,
				default: false
			},
			search: {
				type: null,
				default: ''
			}
		},
		data () {
			return {
				format: "yyyy-MM-dd hh:mm:ss"
			};
		},
		computed: {
			from () {
				let date = null;
				if (this.params.from)
					date = this.params.from;
				date = new Date().getTime();
				return this.getDate(date);
			},
			to () {
				let date = null;
				if (this.params.to)
					date = this.params.to;
				date = new Date().getTime() + 24*60*60*1000;
				return this.getDate(date);
			}
		},
		methods: {
			isDisabled (key) {
				if (_.indexOf(this.disableds, key) > -1)
					return true;
				return false;
			},
			getDate (date) {
				let _date = new Date(date);
				let localeDate = _date.toLocaleDateString().split("/").map((item, idx) => {
					if (idx>0) 
						return ('0'+item).slice(-2); 
					return item;
				}).join('-');
				let localeTime = _date.toLocaleTimeString().slice(2).split(':').map((item, idx) => {
					if (idx === 0) 
						return ('0' + item).slice(-2);
					return item;
				}).join(':');
				if (!(this.params.from || this.params.to))
					localeTime = '00:00:00';
				return localeDate + ' ' + localeTime;
			},
			getDropName (value, list) {
				const arr = _.filter(list, (item, idx) => value == item.value);
				return arr[0].name;
			},
			btnFn (key) {
				if (this.isDisabled(key) && this.disabled)
					return;
				this.$dispatch('click-btn', key);
			},
			defaultCheck (key, value) {
				this.params[key] = value;
				this.$dispatch('check-dropdown', key, value);
			},
			checkDate (key, value) {
				this.params[key] = new Date(value).getTime();
				if ((key == 'from' && value > this.to) || (key == 'to' && value < this.from))
					return alert('开始时间不能大于结束时间');
				this.$dispatch('change-params', key, this.params[key]);
			},
			searchFn () {
				if (event.type == 'click' || event.type == 'keyup' && event.key == 'Enter') {
					this.$dispatch('change-params', search, this.params[search]);
				}
			}
		},
		components: {
			datepicker,
			dropdown
		}
	};
</script>
<style lang="less">
	.t-tool{
		color: #000;
		.tool-dropdown, .date-picker, [class^="btn-"]{
			display: inline-block;
			margin: 10px 20px 0 0;
			line-height: 35px;
			height: 35px;
			min-width: 20px;
			vertical-align: top;
		}
		.search{
			display: inline-block;
			height: 30px;
			margin: 11px 20px 0 0;
			position: relative;
			input{
				font-size: 12px;
				height: 30px;
			}
			.grid-search{
				position: absolute;
				top: 7px;
				right: 6px;
				width: 16px; 
				height: 16px;
				background: url(../assets/images/ixpic/ico-search.png) no-repeat;
			}
		}
	}
</style>