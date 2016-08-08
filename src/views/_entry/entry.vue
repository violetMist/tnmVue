<template>
<div class="container">
	<div class="pic_top">
		<div class="pic-ico"></div>
		<div class="pic_char"></div>
	</div>
	<ul>
		<li class="{{focus1}}">
			<span class="pic-user"></span><span class="verLine"></span>
			<input type="text" v-model="account" tabindex="1" placeholder="账号" @focus="focusFn(1)" @blur="blurFn(1)">
		</li>
		<li class="{{focus}}">
			<span class="pic-pwd"></span><span class="verLine"></span>
			<input type="password" v-model="password" tabindex="2" placeholder="密码" @focus="focusFn(0)" @blur="blurFn(0)">
		</li>
	</ul>
	<a class="btn submit Enter" tabindex="3" @click="login"><span>立即登录</span></a>
	<nv-alert :content="alert.txt" :show="alert.show" @show="show"></nv-alert>
</div>
<div class="footer"><span class="footer-bar"></span></div>
</template>
<script>
	import nvAlert from '../../components/nvAlert.vue';

	export default {
		data () {
			return {
				focus: '',
				focus1: '',
				account: '',
				password: '',
				alert: {
					show: false,
					txt: ''
				}
			};
		},
		methods: {
			focusFn (key) {
				if (key)
					return this.focus1 = 'focus';
				this.focus = 'focus';
			},
			blurFn (key) {
				if (key) 
					return this.focus1 = '';
				this.focus = '';
			},
			login () {
				let _self = this;
				let account = this.account.trim();
				let password = this.password.trim();
				if (!(account && password)) {
					this.alert.show = true;
					this.alert.txt = '账号/密码不能为空';
					return;
				}
				TNM.Global.common('login', {userName: account, password: password}, (result) => {
					window.setConst(result);
					_self.$route.router.go({name: "line"});
					globalBus.emit('getSession', result);
				});
			},
			show (data) {
				this.alert.show = data;
			}
		},
		components: {
			nvAlert
		}
	}
</script>
<style lang="less">

</style>