<template>
<nav class="navbar">
	<div class="container-fluid">
		<div class="nav navbar-header lt">
			<a href="#"><span class="nav-logo"></span></a>
		</div>
		<nav-menu></nav-menu>
		<ul class="navbar-right rt">	
			<li class="current-user">
				<span class="sp"></span>
				<span class="user-pic"></span>
				<span>{{userName}}</span>
			</li>	
			<li class="logout">
				<span class="sp"></span>
				<a class="btn" @click="logout">退出</a>
			</li>	
		</ul>
	</div>
</nav>
<nv-confirm :show.sync="confirm.show" :content="confirm.txt" @confirm-ok="confirmOk"></nv-confirm>
<div class="bg"></div>
</template>
<script>
	import navMenu from './menu.vue';
	import nvConfirm from '../components/nvConfirm.vue';

	export default {
		data () {
			return {
				userName: window.getConst().userName,
				confirm: {
					txt: '',
					show: false
				}
			};
		},
		methods: {
			logout () {
				this.confirm.show = true;
				this.confirm.txt = '确定退出系统？';
			},
			confirmOk () {
				TNM.Global.common('logout', {}, () => {
					window.logoutView();
				});
			}
		},
		components: {
			navMenu,
			nvConfirm
		},
		ready () {
			const _self = this;
			globalBus.on('getSession', function(data){
				_self.userName = data.userName;
			});
		}
	}
</script>
<style lang="less">
	.navbar{
	    height: 50px; background: #2a333a; z-index: 2000;
	}
	.container-fluid{min-width: 1050px; padding: 0 20px;
	    .navbar-header{
	        width: 280px; height: 50px; display: inline-block;
	    }
	    .nav-logo{
	        width: 238px; height: 28px; margin: 11px 0; display: inline-block; background: url(../assets/images/logo/logo.png) no-repeat 0 0;
	    }
	    .navbar-right{
			&>li{color: #fff; float: left;}
			a{color: #fff;}
			.current-user span{display: inline-block; vertical-align: top;}
			.newSite,.current-user,.logout{padding: 15px 0 0 20px; height: 50px;}
			.user-pic{background: url(../assets/images/pic/avatar.png) no-repeat; width: 20px; height: 24px; margin: -5px 10px 0 0;}
			.sp{width: 2px; border-left: 1px solid #22272b; border-right: 1px solid #3a4249; height: 24px; margin: -5px 10px 0 0; display: inline-block; vertical-align: top;}
	    }
	}
</style>