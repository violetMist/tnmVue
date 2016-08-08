<template>
<div class="pagination">
	<div class="page-total lt">
		<span>从 {{pageNo * pageSize + 1}} 到 {{Math.min(((pageNo + 1) * pageSize), total)}} </span>
		<span>/ 共{{total}}条数据</span>
	</div>
	<div class="page-items">
		<a :class="{'previous btn': true, 'able': pageNo > 0}" @click="change(-1)"><span></span></a>
		<a :class="{'page-item btn': true, 'active': item == pageNo + 1}" v-for="item of items" @click="jump(item)" track-by="$index">{{item}}</a>
		<a :class="{'next btn': true, 'able': pageNo < nums - 1}" @click="change(1)"><span></span></a>
		<input type="text" v-model="jumpNo">
		<a class="go btn" @click="jump(jumpNo)">Go</a>
	</div>
</div>
</template>
<script>

	export default {
		props: {
			pageNo: {
				type: Number,
				default: 0
			},
			pageSize: {
				type: Number,
				default: 20
			},
			total: Number
		},
		data () {
			return {
				jumpNo: ''
			};
		},
		computed: {
			nums () {
				return Math.ceil(this.total / this.pageSize);
			},
			items () {
				if (this.nums <= 5)
					return _.repeat('0', this.nums).split('').map((item, idx) => {return idx + 1;});
				else {
					if (this.pageNo < 3)
						return [1, 2, 3, 4, '...', this.nums];
					else if (this.pageNo > this.nums - 4) 
						return [1, '...',  this.nums - 3, this.nums - 2, this.nums - 1, this.nums];
					else
						return [1, '...', this.pageNo, this.pageNo + 1, this.pageNo + 2, '...', this.nums];
				}
			}
		},
		methods: {
			jump (no) {
				if (_.isNaN(Number(no)) || Number(no) < 0 || no > this.nums) return;
				this.pageNo = no - 1;
				this.$dispatch('change-page', this.pageNo);
			},
			change (no) {
				const number = this.pageNo + no;
				this.pageNo = Math.max(0, Math.min(this.nums - 1, number));
				this.$dispatch('change-page', this.pageNo);
			}
		}
	}
</script>
<style lang="less">
	.pagination{
		position: relative;
		font-family: '宋体';
		font-size: 12px;
		color: #4a4a4b;
		overflow: hidden;
		min-height: 30px;
		.page-total{
			margin:8px 0 0 20px;
		}
		.page-items{
			position: absolute;
			left: 35%;
			&>a{
				background: #f0f0f0;
				padding-top: 5px;
			    min-width: 25px;
			    height: 25px;
			    margin: 0 5px;
			    color: #757775;
			    vertical-align: top;
			    text-align: center;
			    border: 1px solid #e1e1e1;
			    border-radius: 2px;
			}
			input{
				width: 30px; 
				height: 25px;
				padding-left: 5px;
				border: 1px solid #ccc;
				border-radius: 3px;
			}
			.active{
				background: #209bd5;
				color: #fff;
			}
			.previous>span{
				background-image: url(../assets/images/ixpic/pg-prev-disable.png);
			}
			.previous.able{
				span{
					background-image: url(../assets/images/ixpic/pg-prev.png);
				}
				&:hover span{
					background-image: url(../assets/images/ixpic/pg-prev-hover.png);
				}
			}
			.next>span{
				background-image: url(../assets/images/ixpic/pg-next-disable.png);
			}
			.next.able{
				span{
					background-image: url(../assets/images/ixpic/pg-next.png);
				}
				&:hover span{
					background-image: url(../assets/images/ixpic/pg-next-hover.png);
				}
			}
			.previous, .next{
				&>span{
					display: inline-block;
					width: 6px;
					height: 9px;
				}
				cursor: default;
				&.able{
					cursor: pointer;
				}
			}
			.go{
				margin: 0;
				padding: 5px 0 0 0;
				color: #209bd5;
			}
		}
	}
</style>