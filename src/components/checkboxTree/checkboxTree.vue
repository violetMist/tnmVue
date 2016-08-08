<template>
<div class="checkbox-tree">
	<ul class="t-body">
		<tree-view
			class="root"
	    	:model="getData"
		></tree-view>
	</ul>
</div>
</template>
<script>
	
	import treeView from './baseCheckboxTree.vue';

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

		changeStatus(status) {
			if (this.status == status)
				return;
			this.status = status;
			this.updateParentStatus();
			this.updateChildStatus(this.children, status);
		}

		updateParentStatus() {
			if (this.parent) {
				this.parent.checkStatus();
				this.parent.updateParentStatus();
			}
		}

		updateChildStatus(children, status) {
			if (children.length) {
				if (status == 1 || status == 0) {
					for (let child of children) {
						child.status = status;
						this.updateChildStatus(child.children, status);
					}
				}
			}
		}

		checkStatus(status) {
			let _status = 0;
			for (let child of this.children) {
				if (child.status == 1)
					_status += 2;
				if (child.status == 2)
					_status += 1;
			}
			if (_status == 0) 
				this.status = 0;
			else if (_status == this.children.length * 2)
				this.status = 1;
			else 
				this.status = 2;
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
				node.selected = false;
				return node;
			},
			buildTree (parent, data) {
				let node = this.buildNode(data);
				node.tier = parent.tier + 1;
				if (node.tier == 0)
					node.count = 0;
				parent.setChild(node);
				if (data.children) {
					for(let child of data.children) {
						this.buildTree(node, child);
					}
				}
			},
			createRoot () {
				this.buildTree(this.root, this.treeData);
			}
		},
		components: {
			treeView
		},
		ready () {
			this.root.tier = -2;
			this.createRoot();
		}
	}

</script>
<style lang="less">
	.checkbox-tree{
		.t-body{
			background: #d7dce0;
			max-height: 300px;
			overflow-y: auto;
			&::-webkit-scrollbar {
    			width: 12px;
   				background-color: #ccc;
   			}
   			&::-webkit-scrollbar-thumb{
				background-color: #eee;
   				border-radius: 5px;
   			}
		}
	}
</style>