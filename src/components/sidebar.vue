<template>
<div class="side-bar">
	<div class="title">实时告警</div>
	<div class="content"></div>
</div>	
</template>
<script>
	
</script>
<style lang="less">
	.side-bar{
		position: fixed;
		right: 30px;
		top: 80px;
		bottom: 30px;
		width: 200px;
		z-index: 1000;
		border-radius: 5px;
		overflow: hidden;
		.content{
			background: #fff;
			height: 100%;
			overflow-y: auto;
			border-radius: 0 0 5px 5px;
			border-bottom: 45px solid transparent;
		}
	}
</style>