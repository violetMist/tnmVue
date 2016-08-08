<template>
<li>
    <div class="t-node" :class="[levelList[model.tier]]" v-if="model.name" @click="toggle(model)">
    	<div class="t-text" @click="selectFn(model)">
			<span class="checkbox" :class="{'selected': model.selected, 'part': model.children.length && model.count != 0 && model.count != model.children.length}"></span>
	    	<span class="t-name">{{model.name}}</span>
    	</div>
    	<span class="t-ico" :class="{'ico-right': isFolder && !open, 'ico-down': isFolder && open}" v-if="model.children.length"></span>
    </div>
    <ul v-show="open || model.tier == -2 || model.tier == -1" v-if="isFolder" transition="collapse">
		<item
			:class="{'node' : model.children.length, 'leaf': !model.children.length}"
			v-for="model in model.children"
			track-by='$index'
			:model="model">
		</item>
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
				if (/t-text|checkbox|t-name/.test(elClass)) {
					
				} else{
					if (this.isFolder) {
						this.open = !this.open
					}
				}
			},
			selectFn (model) {
				if (model.children.length) {
					model.selected = !model.selected;
					for (let child of model.children) {
						child.selected = model.selected;
					}
					if (model.selected)
						model.count = model.children.length;
					else
						model.count = 0;
				} else {
					model.selected = !model.selected;
					const parent = model.getParent();
					if (model.selected) {
						parent.count++;
						if (parent.count == parent.children.length)
							parent.selected = true;
					} else {
						parent.count--;
						parent.selected = false;
					}
				}
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
	.checkbox-tree{
		.t-node{
			border: 1px solid transparent;
			border-top-color: #b9c3cb;
			border-bottom-color: #78838d;
			padding: 0 10px;
			.checkbox{
				margin: 2px;
				display: inline-block;
				width: 14px;
				height: 14px;
				vertical-align: middle;
				background-image: url(../../assets/images/ixpic/cb-uncheck.png);
				&.selected{
					background-image: url(../../assets/images/ixpic/cb-checked.png);
				}
				&.part{
					background-image: url(../../assets/images/ixpic/cb-part.png);
				}
			}
			.t-text{
				display: inline-block;
			}
		}
		.leaf{
			display: inline-block;
			width: 200px;
			margin: 5px 5px 0 5px;
			text-align: left;
			& .t-node{
				border: 1px solid transparent;
			}
		}
		.l1{
			padding-left: 15px;
			background: #9da7b0;
		}
		.l2{
			background: #d7dce0;
			color: #5f7f9b;
			&:hover{
				background: rgba(0, 228, 255, 0.7);
				border: 1px solid #00eaff;
				color: #fff;
			}
		}
		.t-ico{
			display: inline-block;
			width: 12px;
			height: 12px;
			transition: all 0.2s ease;
			background: #aff;
			float: right;
			margin: 8px 20px;
			background: url(../../assets/images/ixpic/arrow-down.png);
		}
		.ico-right{
			transform: rotate(0deg);
		}
		.ico-down{
			transform: rotate(180deg);
		}
	}
</style>