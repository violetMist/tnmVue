<template>
<div class="side-bar">
	<div class="title">实时告警</div>
	<div class="content">
		<ul class="bar-body">
			<li class="item" v-for="fault of faultHT">
				<div class="fault-title">{{fault.date}} {{fault.week}}</div>
				<div class="fault" v-for="item of fault.items" @click="toFaultFn(item)">
					<span class="level-{{item.level}} lt"></span>
					<span class="details">{{item.time}}&nbsp;{{item.siteName}}{{item.deviceType}}{{item.details}}</span>
					<div class="bt-border"></div>
				</div>
			</li>
		</ul>
	</div>
</div>	
</template>
<script>
	const Week = {
		0: '星期日',
		1: '星期一',
		2: '星期二',
		3: '星期三',
		4: '星期四',
		5: '星期五',
		6: '星期六'
	};
	export default {
		data () {
			return {
				faultHT: {}
			};
		},
		methods: {
			toDate (date) {
				return (date.getMonth()+1) + '月' + date.getDate() + '日';
			},
			toWeek (date) {
				return Week[date.getDay()];
			},
			toTime (date) {
				return ('0'+date.getHours()).slice(-2) + ':' + ('0'+date.getMinutes()).slice(-2);
			},
			sortData (list, ht) {
				//list = [{id, siteName, deviceType, details, level, time}]
				const _self = this;
				list.forEach((item, idx) => {
					let date = new Date(item.time);
					let dateStr = this.toDate(date);
					let weekStr = this.toWeek(date);
					let timeStr = this.toTime(date);
					if (!ht[dateStr]) {
						ht[dateStr] = {
							date: dateStr,
							week: weekStr,
							items: []
						};
					}
					ht[dateStr].items.push({
						id: item.id,
						siteName: item.siteName,
						deviceType: item.deviceType,
						details: item.details,
						level: item.level,
						time: timeStr
					});
				});
			},
			toFaultFn (item) {
				
			}
		},
		ready () {
			const _self = this;
			TNM.Global.common('rtFaults', {}, (result) => {
				let ht = {};
				_self.sortData(result, ht);
				_self.faultHT = ht;
			});
		}
	};
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
		.title{
			background: #d1f3ff;
			color: #2c3e50;
			font-weight: bold;
			font-family: '微软雅黑';
		}
		.content{
			background: #fff;
			height: 100%;
			overflow-y: auto;
			border-radius: 0 0 5px 5px;
			border-bottom: 45px solid transparent;
		}
		.bar-body{
			padding: 0 10px 10px 10px;
			color: #666;
			.fault-title{
				text-align: center;
				margin: 20px 0 10px 0;
			}
			.fault{
				.level-1, .level-2{
					width: 14px;
					height: 14px;
					margin-top: 3px;
				}
				.level-1{
					background: #ffde00;
				}
				.level-2{
					background: #e93f33;
				}
				.details{
					margin-left: 24px;
					display: block;
					line-height: 16px;
					margin-top: 10px;
					cursor: pointer;
					&:hover{
						color: #00d4de;
					}
				}
				.bt-border{
					border-top: 1px dotted #ddd;
					margin: 5px 5px 0 24px;
				}
			}
		}
	}
</style>