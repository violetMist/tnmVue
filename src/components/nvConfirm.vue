<template>
<div class="confirm-mask" v-show="show" transition="dialog-confirm">
	<div class="nv-confirm-inner">
		<div class="nv-title">提示</div>
		<div class="content" v-text="content"></div>
		<div class="foot">
			<a class="ok" @click="choose(1)"></a>
			<a class="cancel" @click="choose(0)"></a>
		</div>
	</div>
</div>
</template>
<script>
	export default {
		props: ['content', 'show'],
		methods: {
			choose (data) {
				if (data)
					this.$dispatch('confirm-ok');
				this.show = false;
			}
		}
	}
</script>
<style lang="less">
.confirm-mask{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.3);
	text-align: center;
	.nv-confirm-inner{
		min-width: 350px;
		position: relative;
		display: inline-block;
		margin: 380px auto;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
		border-radius: 3px;
		font-size: 14px;
		line-height: 27px;
		vertical-align: middle;
		box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
		transition: all .3s ease;
		.content{
			min-height: 90px;
			background-color: #fff;
			color: #2E3740;
			padding-top: 30px;
		}
		.foot{
		    height: 45px;
		    background: #E8EBF0;
		    border-bottom-right-radius: 5px;
		    border-bottom-left-radius: 5px;
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
}
</style>