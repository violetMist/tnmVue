<template>
  <div class="datepicker">
    <input class="form-control datepicker-input" type="text"
        v-bind:style="{width:width}"
        @click="inputClick"
        @keydown="inputKeydown"
        v-model="value"/>
    <span class="ico-dt" @click="inputClick"></span>
    <div class="datepicker-popup" v-show="displayDayView">
      <div class="datepicker-inner">
        <div class="datepicker-body">
          <div class="datepicker-ctrl">
            <span class="month-btn datepicker-preBtn" @click="preNextMonthClick(0)">&lt;</span>
            <span class="month-btn datepicker-nextBtn" @click="preNextMonthClick(1)">&gt;</span>
            <p @click="switchMonthView">{{stringifyDayHeader(currDate)}}</p>
          </div>
          <div class="datepicker-weekRange">
            <span v-for="w in weekRange">{{w}}</span>
          </div>
          <div class="datepicker-dateRange">
            <span v-for="d in dateRange" v-bind:class="d.sclass" @click.stop="daySelect(d.date,this)">{{d.text}}</span>
          </div>
        </div>
        <div class="datepicker-time">
        	Time: <input type="text" v-model="hour" @keydown="timeKeyDown" @keyup="timeKeyUp(23)" @focus="focus = 'hour'"> :
        	<input type="text"  v-model="minute" @keydown="timeKeyDown" @keyup="timeKeyUp(59)" @focus="focus = 'minute'"> :
        	<input type="text" v-model="second" @keydown="timeKeyDown" @keyup="timeKeyUp(59)" @focus="focus = 'second'"> 
        	<!-- <span class="icons">
        		<a @click="changeTime(1)">
        			<span class="dt-prev"></span>
        		</a>
        		<a @click="changeTime(-1)">
        			<span class="dt-next"></span>
        		</a>
        	</span> -->
        	<button class="ok" @click="checkDate">确定</button>
        </div>
      </div>
    </div>
    <div class="datepicker-popup" v-show="displayMonthView">
      <div class="datepicker-inner">
        <div class="datepicker-body">
          <div class="datepicker-ctrl">
            <span class="month-btn datepicker-preBtn" @click="preNextYearClick(0)">&lt;</span>
            <span class="month-btn datepicker-nextBtn" @click="preNextYearClick(1)">&gt;</span>
            <p @click="switchDecadeView">{{stringifyYearHeader(currDate)}}</p>
          </div>
          <div class="datepicker-monthRange">
            <template v-for="m in monthNames">
              <span   v-bind:class="{'datepicker-dateRange-item-active':
                  (this.monthNames[this.parse(this.currDate).getMonth()]  === m)}"
                  @click="monthSelect($index)"
                >{{m.substr(0,3)}}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="datepicker-popup" v-show="displayYearView">
      <div class="datepicker-inner">
        <div class="datepicker-body">
          <div class="datepicker-ctrl">
            <span class="month-btn datepicker-preBtn" @click="preNextDecadeClick(0)">&lt;</span>
            <span class="month-btn datepicker-nextBtn" @click="preNextDecadeClick(1)">&gt;</span>
            <p>{{stringifyDecadeHeader(currDate)}}</p>
          </div>
          <div class="datepicker-monthRange decadeRange">
            <template v-for="decade in decadeRange">
              <span v-bind:class="{'datepicker-dateRange-item-active':
                  this.parse(this.currDate).getFullYear() === decade.text}"
                  @click.stop="yearSelect(decade.text)"
                >{{decade.text}}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventListener from '../libs/EventListener.js';
export default {
  props: {
  	key: {
  		type: null,
  		default: 'time'
  	},
    value: {
      type: String,
      twoWay: true
    },
    format: {
      default: 'yyyy-MM-dd hh:mm:ss'
    },
    disabledDaysOfWeek: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: String,
      default: '180px'
    }
  },
  data() {
    return {
      weekRange: ['日', '一', '二', '三', '四', '五', '六'],
      dateRange: [],
      decadeRange: [],
      currDate: new Date,
      hour: '00',
      minute: '00',
      second: '00',
      focus: '',
      displayDayView: false,
      displayMonthView: false,
      displayYearView: false,
      monthNames: [
        '一月', '二月', '三月',
        '四月', '五月', '六月',
        '七月', '八月', '九月',
        '十月', '十一月', '十二月'
      ]
    }
  },
  computed: {
  	time () {
  		return this.hour + ':' + this.minute + ':' + this.second;
  	}
  },
  watch: {
    currDate() {
      this.getDateRange()
    }
  },
  methods: {
    close() {
      this.displayDayView = this.displayMonthView = this.displayYearView = false
    },
    inputClick() {
      if (this.displayMonthView || this.displayYearView) {
        this.displayDayView = false
      } else {
        this.displayDayView = !this.displayDayView
      }
    },
    filterKey (key) {
      if (_.indexOf(['Backspace', 'Escape', 'Tab', 'F5'], key) > -1)
        return true;
      return false;
    },
    inputKeydown() {
      if (this.filterKey(event.key)) 
        return;
      event.returnValue = false
    },
    setTime (data) {
  		const year = this.currDate.getFullYear()
  		const months = this.currDate.getMonth()
  		const date = this.currDate.getDate()
  		const hour = this.hour
  		const minute = this.minute
  		const second = this.second
  		if (this.focus == 'hour')
  			this.currDate = new Date(year, months, date, data || hour, minute, second)
  		else if (this.focus == 'minute')
  			this.currDate = new Date(year, months, date, hour, data || minute, second)
  		else
  			this.currDate = new Date(year, months, date, hour, minute, data || second)
    },
    timeKeyDown () {
      if (this.filterKey(event.key)) 
        return;
  		if (_.isNaN(Number(event.key)))
  			return event.returnValue = false
    },
    timeKeyUp (max) {
      const value = event.target.value
  		const data = Math.min(Number(value), max)
  		event.target.value = ('0' + data).slice(-2)
  		this.setTime(data)
    },
    checkDate () {
    	this.setTime()
    	this.value = this.stringify(this.currDate)
    	this.$dispatch('check-date', this.key, this.value)
    	this.displayDayView = false
    },
    preNextDecadeClick(flag) {
      const year = this.currDate.getFullYear()
      const months = this.currDate.getMonth()
      const date = this.currDate.getDate()
      if (flag === 0) {
        this.currDate = new Date(year - 10, months, date)
      } else {
        this.currDate = new Date(year + 10, months, date)
      }
    },
    preNextMonthClick(flag) {
      const year = this.currDate.getFullYear()
      const month = this.currDate.getMonth()
      const date = this.currDate.getDate()
      if (flag === 0) {
        const preMonth = this.getYearMonth(year, month - 1)
        this.currDate = new Date(preMonth.year, preMonth.month, date)
      } else {
        const nextMonth = this.getYearMonth(year, month + 1)
        this.currDate = new Date(nextMonth.year, nextMonth.month, date)
      }
    },
    preNextYearClick(flag) {
      const year = this.currDate.getFullYear()
      const months = this.currDate.getMonth()
      const date = this.currDate.getDate()
      if (flag === 0) {
        this.currDate = new Date(year - 1, months, date)
      } else {
        this.currDate = new Date(year + 1, months, date)
      }
    },
    yearSelect(year) {
      this.displayYearView = false
      this.displayMonthView = true
      this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate())
    },
    daySelect(date, el) {
      if (el.$el.classList[0] === 'datepicker-item-disable') {
        return false
      } else {
        this.currDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.hour, this.minute, this.second);
      }
    },
    switchMonthView() {
      this.displayDayView = false
      this.displayMonthView = true
    },
    switchDecadeView() {
      this.displayMonthView = false
      this.displayYearView = true
    },
    monthSelect(index) {
      this.displayMonthView = false
      this.displayDayView = true
      this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate())
    },
    getYearMonth(year, month) {
      if (month > 11) {
        year++
          month = 0
      } else if (month < 0) {
        year--
          month = 11
      }
      return {year: year, month: month}
    },
    stringifyDecadeHeader(date) {
      const yearStr = date.getFullYear().toString()
      const firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0
      const lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10
      return firstYearOfDecade + '-' + lastYearOfDecade
    },
    stringifyDayHeader(date) {
      return this.monthNames[date.getMonth()] + ' ' + date.getFullYear()
    },
    parseMonth(date) {
      return this.monthNames[date.getMonth()]
    },
    stringifyYearHeader(date) {
      return date.getFullYear()
    },
    stringify(date, format = this.format) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      const monthName = this.parseMonth(date)
      return format
      .replace(/yyyy/g, year)
      .replace(/MM/g, ('0' + month).slice(-2))
      .replace(/dd/g, ('0' + day).slice(-2))
      .replace(/hh/g, ('0' + hour).slice(-2))
      .replace(/mm/g, ('0' + minute).slice(-2))
      .replace(/ss/g, ('0' + second).slice(-2))
    },
    parse(str) {
      if (!str) {
        const now = new Date()
        str = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDay()
      }
      const date = new Date(str)
      return isNaN(date.getFullYear()) ? null : date
    },
    getDayCount(year, month) {
      const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (month === 1) {
        if ( (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0) ) {
          return 29
        }
        return 28
      }
      return dict[month]
    },
    getDateRange() {
      this.dateRange = []
      this.decadeRange = []
      const time = {
        year: this.currDate.getFullYear(),
        month: this.currDate.getMonth(),
        day: this.currDate.getDate()
      }
      const yearStr = time.year.toString()
      const firstYearOfDecade = (yearStr.substring(0, yearStr.length - 1) + 0) - 1
      for (let i = 0; i < 12; i++) {
        this.decadeRange.push({
          text: firstYearOfDecade + i
        })
      }
      const currMonthFirstDay = new Date(time.year, time.month, 1)
      let firstDayWeek = currMonthFirstDay.getDay() + 1
      if (firstDayWeek === 0) {
        firstDayWeek = 7
      }
      const dayCount = this.getDayCount(time.year, time.month)
      if (firstDayWeek > 1) {
        const preMonth = this.getYearMonth(time.year, time.month - 1)
        const prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month)
        for (let i = 1; i < firstDayWeek; i++) {
          const dayText = prevMonthDayCount - firstDayWeek + i + 1
          this.dateRange.push({
            text: dayText,
            date: new Date(preMonth.year, preMonth.month, dayText),
            sclass: 'datepicker-item-gray'
          })
        }
      }
      for (let i = 1; i <= dayCount; i++) {
        const date = new Date(time.year, time.month, i)
        const week = date.getDay()
        let sclass = ''
        this.disabledDaysOfWeek.forEach((el)=> {
          if (week === parseInt(el, 10)) sclass = 'datepicker-item-disable'
        })
	      if (i === time.day) {
	        if (this.currDate) {
	          sclass = 'datepicker-dateRange-item-active'
	        }
	      }
	      this.dateRange.push({
	        text: i,
	        date: date,
	        sclass: sclass
	      })
      }
      if (this.dateRange.length < 42) {
        const nextMonthNeed = 42 - this.dateRange.length
        const nextMonth = this.getYearMonth(time.year, time.month + 1)
        for (let i = 1; i <= nextMonthNeed; i++) {
          this.dateRange.push({
            text: i,
            date: new Date(nextMonth.year, nextMonth.month, i),
            sclass: 'datepicker-item-gray'
          })
        }
      }
    }
  },
  ready() {
  	this.hour = this.value.split(' ')[1].split(':')[0] || '00'
  	this.minute = this.value.split(' ')[1].split(':')[1] || '00'
  	this.second = this.value.split(' ')[1].split(':')[2] || '00'
    this.$dispatch('child-created', this)
    this.currDate = this.parse(this.value) || this.parse(new Date())
    this._closeEvent = EventListener.listen(window, 'click', (e)=> {
      if (!this.$el.contains(e.target)) this.close()
    })
  },
  beforeDestroy() {
    if (this._closeEvent) this._closeEvent.remove()
  }
}
</script>

<style lang="less">
input.datepicker-input{
  padding-right: 25px;
  cursor: pointer;
  color: #428bca;
}
.ico-dt{
  cursor: pointer;
  position: absolute;
  right: 7px;
  top: 7px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url(../assets/images/ixpic/dt-icon.png);
}
.datepicker{
    position: relative;
    display: inline-block;
}
.datepicker-popup{
    position: absolute;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    margin-top: 2px;
    z-index: 1000;
    box-shadow: 0 6px 12px rgba(0,0,0,0.175);
}
.datepicker-inner{
    width: 218px;
}
.datepicker-body{
    padding: 10px 10px;
    color: #333;
}
.datepicker-ctrl p,
.datepicker-ctrl span,
.datepicker-body span{
    display: inline-block;
    width: 28px;
    line-height: 28px;
    height: 28px;
    border-radius: 4px;
}
.datepicker-ctrl p {
    width: 65%;
}
.datepicker-ctrl span {
  position: absolute;
}
.datepicker-body span {
  text-align: center;
}
.datepicker-monthRange span{
  width: 48px;
  height: 50px;
  line-height: 45px;
}
.datepicker-item-disable {
  background-color: white!important;
  cursor: not-allowed!important;
}
.decadeRange span:first-child,
.decadeRange span:last-child,
.datepicker-item-disable,
.datepicker-item-gray{
    color: #999;
}
.datepicker-dateRange-item-active:hover,
.datepicker-dateRange-item-active {
    background: rgb(50, 118, 177)!important;
    color: white!important;
}
.datepicker-monthRange {
  margin-top: 10px
}
.datepicker-monthRange span,
.datepicker-ctrl span,
.datepicker-ctrl p,
.datepicker-dateRange span {
  cursor: pointer;
}
.datepicker-monthRange span:hover,
.datepicker-ctrl p:hover,
.datepicker-ctrl i:hover,
.datepicker-dateRange span:hover,
.datepicker-dateRange-item-hover {
    background-color : #eeeeee;
}
.datepicker-weekRange span{
    font-weight: bold;
}
.datepicker-label{
    background-color: #f8f8f8;
    font-weight: 700;
    padding: 7px 0;
    text-align: center;
}
.datepicker-ctrl{
    position: relative;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    text-align: center;
}
.month-btn{
  font-weight: bold;
  -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
.datepicker-preBtn{
    left: 2px;
}
.datepicker-nextBtn{
    right: 2px;
}
.datepicker-time{
	padding: 0 0 10px 15px;
	color: #555;
	font-family: 'Helvetica-Neue', 'Helvetica', 'Arial', 'sans-serif';
	input{
		font-family: 'Arial';
		color: #333;
		padding-left: 4px;
		width: 25px;
		border: 1px solid #ccc;
		height: 25px;
		border-radius: 4px;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    &:focus{
      border-color: #66afe9;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 3px rgba(102, 175, 233, 0.6);
    }
	}
	/* .icons{
		display: inline-block;
		vertical-align: middle;
		width: 25px;
		height: 30px;
		border: 1px solid #ccc;
		border-radius: 2px;
		a:first-child{
			border-bottom: 1px solid #ccc;
		}
		a{
			height: 15px;
			width: 24px;
			padding: 0 5px;
			display: inline-block;
			&:hover{
				.dt-prev{
					background-image: url(../assets/images/ixpic/dt-prev-hover.png);
				}
				.dt-next{
					background-image: url(../assets/images/ixpic/dt-next-hover.png);
				}
			}
			span{
				display: inline-block;
				width: 12px;
				height: 6px;
				vertical-align: top;
				margin-top: 4px;
			}
		}
		.dt-prev{
			background-image: url(../assets/images/ixpic/dt-prev.png);
		}
		.dt-next{
			background-image: url(../assets/images/ixpic/dt-next.png);
		}
	} */
	.ok{
		background: #8fc31f;
		border: 1px solid transparent;
		color: #fff;
		border-radius: 5px;
		height: 25px;
		width: 48px;
		text-align: center;
    margin-left: 7px;
    cursor: pointer;
		&:hover{
			background: #86b61d;
		}
	}
}
</style>