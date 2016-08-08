<template>
<div id="body" transition="fade">
	<div class="title">线路信息</div>
	<div class="line-line">
		<ul class="line-sites">
			<li class="across" :style="{width: sitesData.line}"></li>
			<li class="site level-{{site.level}}" v-for="site of sitesData.sites" :style="{left: site.left}" 
			@click="clickFn(site)" @mouseover="overFn(site)" @mouseout="outFn(site)">
				<div class="center"></div>
				<div class="inside"></div>
				<div class="outside"></div>
				<div class="txt" :style="site.txt">{{site.name}}</div>
			</li>
		</ul>
	</div>
</div>
</template>
<script>

	const Caller = TNM.Global.lineCaller;
	export default {
		data () {
			return {
				sitesData: {},
				one: {}
			};
		},
		methods: {
			getTxtStyle (idx, name) {
				let height = name.split('').length * 16;
				if (idx % 2 === 0) 
					return {
						top: '40px',
						height: height + 'px'
					};
				return {
					top: -1 * (height + 20) + 'px',
					height: height + 'px'
				};
			},
			clickFn (site) {
				this.$router.go({name: 'rack', params: {siteId: 123}});
			},
			overFn (site) {
				this.one = _.cloneDeep(site);
				let txtTop = Number(site.txt.top.slice(0, -2));
				if (txtTop > 0) 
					txtTop += 20;
				else 
					txtTop -= 20;
				site.txt.top = txtTop + 'px';
			},
			outFn (site) {
				site.txt.top = this.one.txt.top;
			}
		},
		ready () {
			const _self = this;
			Caller('getLine', {}, (result) => {
				let _len = result.length;
				let width = _self.$el.clientWidth;
				let space = _.round((width - 100) / _len);
				_self.sitesData = {
					line: space * (_len - 1) + 'px',
					sites: _.map(result, (site, idx) => {
						return _.assign(site, {
							left: 50 + idx * space + 'px',
							txt: _self.getTxtStyle(idx, site.name)
						});
					})
				}
			});
		}
	}
</script>
<style lang="less">
	.keyframes (@name) {
	    @-webkit-keyframes @name {
	        .-frames(-webkit-)
        }
        @-moz-keyframes @name {
            .-frames(-moz-)
        }
        @-o-keyframes @name {
            .-frames(-o-)
        }
        @keyframes @name {
            .-frames()
        }
	}
	.animation(@arguments) {
	    -webkit-animation: @arguments;
	    -moz-animation: @arguments;
	    -o-animation: @arguments;
	    animation: @arguments;
	}
	.loop {
		.keyframes(loop);
		.-frames(@-...){
	        0%{
	            @{-}transform: scale(1);
	        }
	        100%{
	            @{-}transform: scale(2);
	        }
	    }
	}
	.flicker-inside{
		.keyframes(flicker-inside);
		.-frames(@-...){
			0% {
				@{-}transform: scale(0); 
				opacity: 1; 
				top: -60px; 
				left: -60px; 
				width: 140px; 
				height: 140px;
			}
			45% {
				@{-}transform: scale(0.5);
				opacity: 0.8;
			} 
			100% {
				@{-}transform: scale(0.7);
				opacity: 0;
				top: -60px; 
				left: -60px; 
				width: 140px; 
				height: 140px;
			}
		}
	}
	.flicker-outside{
		.keyframes(flicker-outside);
		.-frames(@-...){
			0% {
				@{-}transform: scale(0); 
				opacity: 1; 
				top: -60px; 
				left: -60px; 
				width: 140px; 
				height: 140px;
			}
			55% {
				@{-}transform: scale(0.8);
				opacity: 1;
			} 
			100% {
				@{-}transform: scale(1.1);
				opacity: 0;
				top: -60px; 
				left: -60px; 
				width: 140px; 
				height: 140px;
			}
		}
	}
	.line-line{
		position: fixed;
		left: 30px;
		top: 120px;
		right: 240px;
		bottom: 30px;
		border-radius: 0 0 5px 5px;
		background-image: url(../../assets/images/bg/line-bg.png);
	}
	.line-sites{
		position: absolute;
		top: 49%;
		.across{
			position: absolute;
			height: 1px;
			width: 1500px;
			left: 60px;
			top: 10px;
			background-image: url(../../assets/images/line/line.png);
		}
		.site{
			position: absolute;
			width: 20px;
			height: 20px;
			cursor: pointer;
			transition: all 0.4s ease;
			&>div{
				position: absolute;
				width: 20px;
				height: 20px;
				top: 0;
				left: 0;
			}
			.txt{
				width: 12px;
				left: 4px;
				word-break: break-all;
				word-wrap:break-word;
				font-size: 14px;
				text-align: center;
				line-height: 16px;
				transition: all 0.4s ease;
			}
			.center{
				width: 20px;
				height: 20px;
				background-image: url(../../assets/images/line/site.png);
			}
			.inside, .outside{
				background-image: url(../../assets/images/line/center.png);
			}
			.inside, .outside, .txt{
				opacity: 0;
			}
		}
		.level-1, .level-2{
			.txt{
				opacity: 1;
			}
		}
		.level-0:hover{
			.center{
				.loop();
				.animation(loop 0.75s linear 0s infinite alternate);
			}
			.txt{
				opacity: 1;
			}
		}
		.level-1{
			.center{
				background-image: url(../../assets/images/line/siteY.png);
				.loop();
				.animation(loop 0.75s linear 0s infinite alternate);
			}
			.inside, .outside{
				background-image: url(../../assets/images/line/centerY.png);
			}
		}
		.level-2{
			.center{
				background-image: url(../../assets/images/line/siteR.png);
				.loop();
				.animation(loop 0.75s linear 0s infinite alternate);
			}
			.inside, .outside{
				background-image: url(../../assets/images/line/centerR.png);
			}
		}
		.level-1, .level-2, .level-0{
			&:hover{
				.inside{
					.flicker-inside();
					.animation(flicker-inside 1.5s linear 0.1s infinite);
				}
				.outside{
					.flicker-outside();
					.animation(flicker-outside 1.5s linear 0.1s infinite);
				}
			}
		}
	}
</style>