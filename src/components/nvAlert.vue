<template>
<div class="alert-mask" v-show="show" transition="fade">
	<div class="nv-alert-inner">
		<div v-text="content"></div>
		<button type="button" class="close" @click="close">
		  <span>&times;</span>
		</button>
	</div>
</div>
</template>
<script>
	export default {
		props: ['content', 'show'],
		methods: {
			close () {
				this.$dispatch('show', false);
			}
		}
	}
</script>
<style lang="less">
.alert-mask{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	background-color: rgba(255, 255, 255, 0.3);
	text-align: center;
	.nv-alert-inner{
		position: relative;
		display: inline-block;
		margin: 150px auto;
		text-align: center;
		background-color: rgba(49, 49, 49, 0.8);
		color: #ffffff;
		border-radius: 3px;
		font-size: 14px;
		padding: 18px 70px;
		line-height: 27px;
		vertical-align: middle;
		box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
		transition: all .3s ease;
		.close{
			position: absolute;
		    right: 10px;
		    top: 18px;
		    width: 20px;
		    height: 20px;
		    a{
		    	cursor: pointer;
		    	display: inline-block;
		    	width: 20px;
		    	height: 20px;
		    	font-size: 14px;
		    	color: #fff;
		    }
		}
	}
}
.fade-enter, .fade-leave{
	.nv-alert-inner{
		transform: scale(0.9);
	}
}
</style>