<template>
<li>
    <div class="t-node" :class="[levelList[model.tier], model.active ? 'active': '']" v-if="model.name" @click="toggle(model)">
    	<span class="t-ico" :class="{'ico-right': isFolder && !open, 'ico-down': isFolder && open}"></span>
    	<div class="t-text" title="获取数据列表">
	    	<span class="t-name">{{model.name}}</span>
	    	<span class="t-num" v-if="model.num || model.num === 0">({{model.num}})</span>
    	</div>
    </div>
    <ul v-show="open || model.tier == -2 || model.tier == -1" v-if="isFolder" transition="collapse">
		<item
			:class="{'node' : model.children.length, 'leaf': !model.children.length}"
			v-for="model in model.children"
			track-by='$index'
			:model="model">
		</item>
		<!-- <li class="add-node" @click="addChild" v-if="model.tier == -1" :class="[levelList[model.tier]]">+</li> -->
    </ul>
</li>
</template>
<script>

	export default {
		name: 'item',
		props: {
			model: Object
		},
		data () {
			return {
				active: 'active',
				levelList: ['l1', 'l2', 'l3'],
				open: false
			}
		},
		computed: {
			isFolder () {
				return this.model.children && this.model.children.length;
			}
		},
		methods: {
			toggle (model) {
				let elClass = event.target.getAttribute('class');
				if (/t-text|t-name|t-num/.test(elClass)) {
					model.active = true;
					this.$dispatch('active-item', model);
				} else{
					if (this.isFolder) {
						this.open = !this.open
					}
				}
			},
			addChild () {
				this.$dispatch('add-child', this.model);
			}
		},
		transitions: {
			collapse: {
				beforeEnter: (el) => {
					if (el.style.maxHeight) return;
					if (el.style.display === 'none') {
						el.style.display = "block";
						let height = el.offsetHeight;
						el.style.display = "none";
						if (height)
							el.style.maxHeight = height + 'px';
					}
				},
				afterEnter: (el) => {
					el.style.maxHeight = '';
				},
				beforeLeave: (el) => {
					el.style.maxHeight = el.offsetHeight + 'px';
					return el.offsetHeight;
				}
			}
		}
	}
</script>
<style lang="less">
	.active{
		.t-name, .t-num{
			color: #00d8ff;
			font-weight: bold;
		}
	}
	.tree{
		.t-node{
			border: 1px solid transparent;
			border-top-color: #2c4259;
			border-bottom-color: #1f2c39;
			&:hover{
				background: rgba(0, 234, 255, 0.4);
				border: 1px solid #00eaff;
			}
			.checkbox-a .checkbox{
				margin: 4px;
			}
			.t-text{
				display: inline-block;
				position: relative;
				&:hover{
					color: #00d8ff;
				}
			}
		}
		.l1{
			padding-left: 25px;
			background: #1e2e3c;
		}
		.l2{
			padding-left: 45px;
			background: #253545;
		}
		.l3{
			padding-left: 65px;
			background: #334559;
			border-color: transparent;
		}
		.t-ico{
			display: inline-block;
			width: 12px;
			height: 12px;
			transition: all 0.2s ease;
			margin-right: 3px;
		}
		.ico-right{
			background: url(../../assets/images/ixpic/arrow-tree-right.png);
		}
		.ico-down{
			transform: rotate(90deg);
			background: url(../../assets/images/ixpic/arrow-tree-down.png);
		}
	}
</style>