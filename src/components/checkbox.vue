<template>
<a class="checkbox-a" data-key="{{key}}" @click="f()">
	<span class="checkbox {{selected ? 'selected' : ''}}"></span>
	<span class="text" v-text="text"></span>
</a>
</template>
<script>
	export default {
		props: ['selected', 'key', 'text'],
		methods: {
			f () {
				this.selected = !this.selected;
				this.$dispatch('selected', this.key, this.selected);
			}
		}
	}
</script>
<style lang="less">
	.checkbox-a{
		cursor: pointer;
		display: inline-block;
		.checkbox{
			cursor: pointer;
			width: 16px;
			height: 16px;
			display: inline-block;
			vertical-align: top;
			background: url(../assets/images/ixpic/cb-uncheck.png) no-repeat;
		}
		.selected{
			background-image: url(../assets/images/ixpic/cb-checked.png);
		}
	}
</style>