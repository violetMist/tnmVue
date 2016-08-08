<template>
<div class="base-grid">
	<ul class="hdr">
		<li class="col-_check" v-if="hasCheckbox">
			<checkbox @selected="checkFn" :selected="rootSelected" key="root"></checkbox>
		</li>
		<li class="col-_no" v-if="sequence">
			<a data-key="_no">
				<span>{{sequence}}</span>
				<span class="pic-hide"></span>
			</a>
		</li>
		<li class="col-{{col}}" v-if="!headers.widths" v-for="col of headers.columns">
			<a data-key="{{col}}">
				<span>{{headers.titles[$index]}}</span>
				<span class="pic-hide"></span>
			</a>
		</li>
		<li class="col-{{col}}" :style="{width: headers.widths[$index]+'%'}" v-if="headers.widths" v-for="col of headers.columns">
			<a data-key="{{col}}">
				<span>{{headers.titles[$index]}}</span>
				<span class="pic-hide"></span>
			</a>
		</li>
	</ul>
	<div class="g-body">
		<ul class="row" v-for="item of items" track-by="id">
			<li class="col-_check" v-if="hasCheckbox">
				<checkbox @selected="checkFn" :selected="selected(item.id)" :key="item.id"></checkbox>
			</li>
			<li class="col-_no" v-if="sequence">
				<span>{{pageNo * pageSize + ($index + 1)}}</span>
			</li>
			<li class="col-{{key}}" v-if="!headers.widths" v-for="key of headers.columns">
				<span title="{{{key | getGridValue item[key] clz 'title'}}}">{{{key | getGridValue item[key] clz}}}</span>
			</li>
			<li class="col-{{key}}" :style="{width: headers.widths[$index]+'%'}" v-if="headers.widths" v-for="key of headers.columns">
				<span title="{{{key | getGridValue item[key] clz 'title'}}}">{{{key | getGridValue item[key] clz}}}</span>
			</li>
			<li class="rt col-actions" v-if="item.actions">
				<a class="btn act-{{action[0]}}" v-for="action of item.actions" title="{{action[1]}}" @click="action[2](item)"></a>
			</li>
			<li class="rt col-actions" v-if="!item.actions">
				<a class="btn act-{{action[0]}}" v-for="action of actions" title="{{action[1]}}" @click="action[2](item)"></a>
			</li>
		</ul>
	</div>
</div>
</template>
<script>
	import checkbox from '../checkbox.vue';
	/**
	 * params: {
	 * 		clz,				//表格class
	 * 		hasCheckbox,		//是否显示checkbox
	 * 		sequence,			//显示序号名
	 * 		headers: [			//显示表格头和列数及是否拥有width
	 * 			titles: [],		//对应columns的显示文字
	 *   		columns: [],	//表格显示列
	 * 			[widths]: []	//列宽度集合
	 * 		],		
	 * 		items: [			//表格显示数据
	 * 			{id, name....}
	 * 		],
	 * 		selectArr,			//
	 * 		actions: [			//对于每一列表格元素的所有操作集合
	 * 			[key, name, (item) => {...}]
	 * 		]			
	 * }
	 */
	export default {
		props: {
			clz: String,
			hasCheckbox: Boolean,
			pageNo: Number,
			pageSize: Number,
			sequence: String,
			headers: Object,
			items: Array,
			actions: Array,
			selectArr: Array
		},
		data () {
			return {
				rootSelected: false,
				checkFn: (key, isSelected) => {
					if (key == 'root') {
						if (isSelected)
							this.selectArr = this.items.map((item, idx) => {return item.id;});
						else
							this.selectArr = [];
					} else {
						if (isSelected) 
							this.selectArr.push(key);
						else 
							this.selectArr.splice(_.indexOf(this.selectArr, key), 1);
					}
					this.$dispatch('check-box');
				}
			};
		},
		methods: {
			selected (id) {
				if (_.indexOf(this.selectArr, id) > -1)
					return true;
				return false;
			}
		},
		watch: {
		  selectArr (val, oldVal) {
		    this.rootSelected = false;
		    if (val.length !== 0 && val.length === this.items.length) 
		    	this.rootSelected = true;
		  }
		},
		components: {
			checkbox
		}
	}
</script>
<style lang="less">
	.base-grid{
		color: #666;
		font-family: '宋体';
		font-size: 12px;
		.checkbox{
			margin-top: 8px;
			margin-left: 4px;
		}
		ul.hdr{
			background: #e8e8e8;
			height: 31px;
			border: 1px solid transparent;
			a{
				color: #333333;
				font-weight: bold;
			}
			.col-_no{
				text-align: right;
			}
			[class^="col-"] {
				border-right: 1px solid #fff;
				height: 30px;
			}
			.col-_check{
				padding-top: 1px;
			}
		}
		[class^="col-"] {
			display: inline-block;
			text-align: left;
			vertical-align: middle;
			min-width: 56px;
			height: 33px;
			line-height: 35px;
			padding: 0px 8px;
		}
		.col-_check{
			padding-top: 2px;
			min-width: 20px;
		}
		.g-body{
			background: #fff;
			.row:nth-child(even) {
				background: #f2f2f2;
			}
			.row{
				border: 1px solid transparent;
				&:hover{
					background: rgba(0, 234, 255, 0.4);
					border: 1px solid #00eaff;
					color: #fff;
					.col-actions{
						display: block;
					}
				}
			}
		}
		.col-actions{
			line-height: 30px;
			text-align: center;
			display: none;
			width: 10%;
			padding: 0 10px;
			.btn{
				width: 24px;
				height: 24px;
				margin: 4px 10px 0 0;
				position: relative;
				&:hover{
					background-color: #3eb6e3;
					border-radius: 3px;
				}
			}
			.act-edit{
				background-image: url(../../assets/images/pic/ico-edit.png);
			}
			.act-deleted{
				background-image: url(../../assets/images/pic/ico-delete.png);
			}
		}
	}
</style>