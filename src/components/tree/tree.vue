<template>
<div class="tree">
	<ul class="t-body">
		<tree-view
			class="root"
	    	:model="getData"
	    	@active-item="activeItem"
	    	@add-child="addChild"
		></tree-view>
	</ul>
</div>
</template>
<script>
	
	import treeView from './baseTree.vue';

	class TreeNode {
		constructor () {
			this.parent = null;
			this.children = [];
		}
		getParent () {
			return this.parent;
		}
		getChildren () {
			return this.children;
		}
		setParent (_parent) {
			this.parent = _parent;
		}
		setChild (_child) {
			this.children.push(_child);
			_child.setParent(this);
		}
		removeChild (_child) {
			let _index = null;
			this.children.forEach((child, idx) => {
				if (child.id == _child.id) 
					_index = idx;
			});
			this.children.splice(_index, 1);
		}
	}

	// function findSiteId(node) {
	// 	if (!node.siteId) {
	// 		findSiteId(node.getParent());
	// 	} else {
	// 		return node.siteId;
	// 	}

	// }

	export default {
		props: {
			treeData: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data () {
			return {
				init: true,
				selectArr: [],
				root: new TreeNode()
			};
		},
		computed: {
			getData () {
				return this.root;
			}
		},
		methods: {
			buildTreeAsync (parent, data) {
				const _self = this;
				setTimeout(() => {
					_self.buildTree(parent, data);
				}, 0);
			},
			buildNode (data) {
				let node = new TreeNode();
				for (let key in data) {
					if (key != 'children')
						node[key] = data[key];
				}
				node.active = false;
				return node;
			},
			buildTree (parent, data) {
				let node = this.buildNode(data);
				node.tier = parent.tier + 1;
				if (node.tier === 0 && this.init) {
					this.init = false;
					node.active = true;
					this.root.active = node;
					this.$dispatch('active-node', node);
				}
				parent.setChild(node);
				if (data.children) {
					for(let child of data.children) {
						this.buildTreeAsync(node, child);
					}
				}
			},
			createRoot () {
				this.buildTreeAsync(this.root, this.treeData);
			},
			activeItem (model) {
				if (this.root.active) {
					if (this.root.active != model) {
						this.root.active.active = false;
						this.$dispatch('active-node', model);
					}
				}
				this.root.active = model;
			},
			addChild (model, params) {
				let node = new TreeNode();
				for (let key in params) {
					if (key != 'children')
						node[key] = params[key];
				}
				node.active = true;
				node.tier = model.tier + 1;
				if (params.children) {
					for (let item of params.children) {
						let child = new TreeNode();
						for (let key in item) {
							child[key] = item[key];
						}
						child.active = false;
						child.tier = node.tier + 1;
						node.setChild(child);
					}
				}
				model.setChild(node);
				this.activeItem(node);
			}
		},
		components: {
			treeView
		},
		watch: {
			treeData () {
				this.root.active = null;
				this.root.tier = -2;
				this.createRoot();
			}
		}
	}

</script>
<style lang="less">
	.tree{
		.t-body{
			background: #334558;
			border-radius: 0 0 5px 5px;
			overflow-y: auto;
			&::-webkit-scrollbar {
    			width: 12px;
   				background-color: #ccc;
   				border-radius: 5px;
   			}
   			&::-webkit-scrollbar-thumb{
				background-color: #fff;
   				border-radius: 5px;
   			}
		}
	}
</style>