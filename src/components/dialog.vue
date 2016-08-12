<template>
<div class="dialog-mask" v-show="show" transition="dialog-confirm">
	<div class="nv-dialog-inner {{clz}}">
		<div class="nv-title">{{title}}</div>
		<div class="content">
			<slot name="content"></slot>
			<ul v-if="unit">
				<li class="pro-{{$key}} property" v-if="defaultFilter($key) && !isDropdown($key)" v-for="property of unit">
					<label class="label" for="{{$key}}">{{$key | getDialogTitle property clz}} :</label>
					<input :class="{disabled: isDisabled($key)}" :disabled="isDisabled($key)" :type="getInputType($key)" name="{{$key}}" v-model="property">
				</li>
				<li class="pro-{{$key}} property" v-if="defaultFilter($key) && isDropdown($key)" v-for="property of unit">
					<label class="label" for="{{$key}}">{{$key | getDialogTitle property clz}} :</label>
					<drop-down
						:key="$key"
						:name="getDropName(property, unit.dropdownList[$key])"
						:value="property"
						:list="unit.dropdownList[$key]"
						@check-fn="defaultCheck"
					></drop-down>
				</li>
				<li class="pro-checkbox property" v-if="unit.checkboxList" v-for="property of unit.checkboxList">
					<check-box
						:selected="property.selected"
						:key="property.key"
						:text="property.text"
						@selected="selected"
					></check-box>
				</li>
				<li class="pro-{{property.key}} property" v-if="unit.properties && !property.type" v-for="property of unit.properties">
					<label class="label" for="{{property.key}}">{{property.title}} :</label>
					<input :class="{disabled: isDisabled(property.key)}" :disabled="isDisabled(property.key)" name="{{property.key}}" :type="getInputType(property.key)" v-model="property.value">
				</li>
				<li class="pro-{{property.key}} property" v-if="unit.properties && property.type == 'dropdown'" v-for="property of unit.properties">
					<label class="label" for="{{property.key}}">{{property.title}} :</label>
					<drop-down
						:key="property.key"
						:name="getDropName(property.value, property.list)"
						:value="property.value"
						:list="property.list"
						@check-fn="checkFn"
					></drop-down>
				</li>
			</ul>
			<div class="pro-tree" v-if="unit && unit.tree">
				<div class="tree-title" v-if="unit.tree.title">{{unit.tree.title}}</div>
				<checkbox-tree
					class="root"
					:tree-data="unit.tree.treeData"
					v-ref:tree
				></checkbox-tree>
			</div>
		</div>
		<div class="foot">
			<a class="ok Enter" @click="ok()"></a>
			<a class="cancel" @click="cancel()"></a>
		</div>
	</div>
</div>
</template>
<script>
	import dropDown from '../components/dropdown.vue';
	import checkBox from '../components/checkbox.vue';
	import checkboxTree from '../components/checkboxTree/checkboxTree.vue';
	/*
	 *   clz,					//class
	 *   title,					//显示title
	 *   content,				//插槽内容
	 *   unit: {				//对象的属性input/dropdown
	 *   	id, 				//基础属性
	 *   	name,		
	 *   	checkboxList: [		//所有的checkbox数组
	 *   		{key, text, selected}
	 *   	],	
	 *   	dropdownArr: [key1, key2],	//使用dropdown类型的基础属性key
	 *    	dropdownList: {
	 *   	  $key: [{name, value}]
	 *      },
	 *   	properties: [		//私有属性数组，便于后台数据库存储
	 *   		{key, title, value, [type, list: [{name, value}]]}
	 *   	],
	 *   	tree: {
	 *   		title,
	 *   		treeData
	 *   	}
	 *   }
	 *   inputTypes: [			//input的类型
	 *   	{key, type}
	 *   ]
	 */
	export default {
		props: {
			clz: String, 
			title: null, 
			unit: null,
			show: Boolean,
			inputTypes: {
				type: Array,
				default () {
					return [];
				} 
			}
		},
		methods: {
			isDisabled (key) {
				if (this.clz == 'edit-device') {
					if (key == 'ip' || key == 'port')
						return false;
					else 
						return true;
				}
				return false;
			},
			getInputType (key) {
				let type = '';
				this.inputTypes.forEach(item => {
					if (item.key == key)
						return type = item.type;
				});
				return type || 'text';
			},
			defaultFilter (key) {
				if (_.indexOf(['properties', 'dropdownArr', 'dropdownList', 'checkboxList', 'tree'], key) == -1)
					return true;
				return false;
			},
			isDropdown (key) {
				if (_.indexOf(this.unit.dropdownArr, key) > -1)
					return true;
				return false;
			},
			getDropName (value, list) {
				if (!value && value !== 0) return '';
				const arr = _.filter(list, (item, idx) => value == item.value);
				return arr[0].name;
			},
			selected (key, status) {
				this.$dispatch('check-checkbox', key, status);
			},
			defaultCheck (key, value) {
				this.$dispatch('check-dropdown', key, value);
				this.unit[key] = value;
			},
			checkFn (key, value) {
				this.unit.properties.forEach((item, idx) => {
					if (item.key == key) 
						return item.value = value;
				});
			},
			getSelectArr () {
				return this.$refs.tree.root;
			},
			ok () {this.$dispatch('ok-fn');},
			cancel () {this.show = false;}
		},
		components: {
			dropDown,
			checkBox,
			checkboxTree
		}
	}
</script>
<style lang="less">
.dialog-mask{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 4000;
	background-color: rgba(0, 0, 0, 0);
	text-align: center;
}
.nv-dialog-inner{
	min-width: 350px;
	position: relative;
	display: inline-block;
	border-radius: 7px;
	font-size: 12px;
	line-height: 30px;
	margin-top: 200px;
	vertical-align: middle;
	box-shadow: 0 10px 30px rgba(0, 0, 0, .44);
	transition: all .3s ease;
	.content{
		min-height: 90px;
		background-color: #fff;
		color: #2E3740;
		padding: 30px 0 10px;
	}
	.property{
		height: 32px;
		margin: 0 20px 15px 10px;
	}
	.label{
		height: 30px;
		width: 50px;
		display: inline-block;
		margin-right: 10px;	
		text-align: right;
	}
	input{
		height: 30px;
		width: 230px;
		background: #d7dce0;
		border: 2px solid transparent;
		border-radius: 5px;
		text-indent: 10px;
		transition: border ease-in-out 0.15s;
		&:hover{
			border: 2px solid #55BDFE;
		}
		&.disabled{
			background: #e7ecf0;
			&:hover{
				border: 2px solid transparent;
			}
		}
	}
	.foot{
	    height: 45px;
	    background: #E8EBF0;
	    border-bottom-right-radius: 7px;
	    border-bottom-left-radius: 7px;
	    a{
	    	cursor: pointer;
	    	display: inline-block;
	    	width: 87px;
	    	height: 28px;
	    	margin: 10px 10px 0 0;
	    }
	    .ok{
	    	background: url(../assets/images/pic/btn-confirm.png) no-repeat;
	    	&:hover{
	    		background-image: url(../assets/images/pic/btn-confirm-hover.png);
	    	}
	    }
	    .cancel{
	    	background: url(../assets/images/pic/btn-cancel2.png) no-repeat;
	    	&:hover{
	    		background-image: url(../assets//images/pic/btn-cancel2-hover.png);
	    	}
	    }
	}
}
.pro-id{
	display: none;
}
</style>