<template>
<div class="dropdown">
	<button class="dropdown-toggle" type="button" @click="open" data-key="{{key}}">
		<span class="key-{{key}} btn">{{name}}</span>
		<span class="split"></span>
		<span class="pic-"></span>
	</button>
	<ul class="dropdown-menu" v-show="showMenu">
		<li class="list" v-for="item of list" @click="check(item.name, item.value)">{{item.name}}</li>
	</ul>
</div>
</template>
<script>
	import EventListener from '../libs/EventListener.js';
	export default {
		props: ['key', 'name', 'value', 'list'],
		data () {
			return {
				showMenu: false
			};
		},
		methods: {
			open () {
				this.showMenu = !this.showMenu;
			},
			check (name, value) {
				this.name = name;
				this.value = value;
				this.showMenu = false;
				this.$dispatch('check-fn', this.key, value);
			}
		},
		ready() {
			this._closeEvent = EventListener.listen(window, 'click', (e)=> {
				if (!this.$el.contains(e.target)) this.showMenu = false;
			});
		},
		beforeDestroy() {
			if (this._closeEvent) this._closeEvent.remove();
		}
	}
</script>
<style lang="less">
	.dropdown{
		display: inline-block;
		height: 30px;
		width: 230px;
		vertical-align: top;
		position: relative;
		.dropdown-toggle{
			position: relative;
			height: 30px;
			width: 230px;
			background: #d7dce0;
			border: 2px solid transparent;
			border-radius: 5px;
			text-align: left;
			cursor: pointer;
			&:hover{
				border: 2px solid #55BDFE;
				.split{
					height: 26px;
					top: 0;
				}
			}
			&>span{
				display: inline-block;
			}
			[class^="key-"] {
				width: 200px;
				height: 25px;
				line-height: 25px;
				margin-left: 3px;
			}
			.split{
				width: 2px;
				height: 30px;
				position: absolute;
				right: 28px;
				top: -2px;
				background: #fff;
			}
			.pic-{
				position: absolute;
				right: 10px;
				top: 11px;
				width: 8px;
				height: 5px;
				background: url(../assets/images/ixpic/drop-down.png) no-repeat;
			}
		}
		.dropdown-menu{
			position: absolute;
			top: 32px;
			max-height: 125px;
			width: 230px;
			background: #fff;
			border: 1px solid #ccc;
			border-radius: 5px;
			overflow-y: auto;
			overflow-x: hidden;
			box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
			padding-top: 2px;
			z-index: 5000;
			.list{
				cursor: pointer;
				width: 228px;
				height: 30px;
				padding-left: 10px;
				text-align: left;
				&:hover{
					background: #eee;
				}
			}
		}
	}
</style>