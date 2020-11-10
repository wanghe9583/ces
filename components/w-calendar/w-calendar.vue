<template>
    <div>
        <div class="year_str" v-if="showYear">{{yearMonthStr}}</div>
        <div class="week-slider">
            <div
                class="sliders"
                ref="sliders"
                @touchstart="touchstartHandle"
                @touchmove="touchmoveHandle"
                @touchend="touchendHandle">
                <template v-for="(item, index) in dates" >
                    <div class="slider"
					 v-if="index === activeIndex"
					:key="index"
					:style="[{'transition':isAnimation ? 'transform .5s ease-out' : 'none'},{'transform':'translateX('+ distan.x +'px)'}]"
                        @webkit-transition-end="onTransitionEnd(index)"
                        @transitionend="onTransitionEnd(index)">
                        <div :key="index2" v-for="(day,index2) in item.days" class="day">
                            <div :class="[selectDate==day.date?'active':'']"
								@click.stop="dayClickHandle(day.date)">
                                {{day.week}}<br><span>{{day.date.split('-')[2]}}</span>
                            </div>
							<!-- :style="buildDateStyle(day.isToday, day.isDay)">   :style="getTransform(index)"-->
                        </div>
                    </div>
					<div class="slider"
					:key="index"
					 v-if="index < activeIndex"
					:style="[{'transition':isAnimation ? 'transform .5s ease-out' : 'none'},{'transform':'translateX(-100%)'}]"
					    @webkit-transition-end="onTransitionEnd(index)"
					    @transitionend="onTransitionEnd(index)">
					    <div :key="index2" v-for="(day,index2) in item.days" class="day">
					        <div :class="[selectDate==day.date?'active':'']"
								@click.stop="dayClickHandle(day.date)">
					            {{day.week}}<br><span>{{day.date.split('-')[2]}}</span>
					        </div>
							<!-- :style="buildDateStyle(day.isToday, day.isDay)">   :style="getTransform(index)"-->
					    </div>
					</div>
					<div class="slider"
					:key="index"
					 v-if="index > activeIndex"
					:style="[{'transition':isAnimation ? 'transform .5s ease-out' : 'none'},{'transform':'translateX(100%)'}]"
					    @webkit-transition-end="onTransitionEnd(index)"
					    @transitionend="onTransitionEnd(index)">
					    <div :key="index2" v-for="(day,index2) in item.days" class="day">
					        <div :class="[selectDate==day.date?'active':'']"
								@click.stop="dayClickHandle(day.date)">
					            {{day.week}}<br><span>{{day.date.split('-')[2]}}</span>
					        </div>
							<!-- :style="buildDateStyle(day.isToday, day.isDay)">   :style="getTransform(index)"-->
					    </div>
					</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'weekSlider',
    props: {
        defaultDate: {
            type: String,
            default: moment().format('YYYY-MM-DD')
        },
		selectDate: {
		    type: String,
		    default: moment().format('YYYY-MM-DD')
		},
        showYear: {
            type: Boolean,
            default: false
        },
        activeBgColor: {
            type: String,
            default: 'rgba(255, 255, 255, 1)'
        },
        todayBgColor: {
           type: String,
           default:  'url(/static/img/app/venue/pre.png)'
        },
        activeTxtColor: {
            type: String,
            default: 'rgba(255, 255, 255, 1)'
        },
        todayTxtColor: {
			type: String
		},
		lang: {
			type: String,
			default: 'ch'
		},
		htmlSliders:{
			type:Number,
			default:null
		}
    },
    data () {
        return {
            dates: [],
            direction: null,
            activeIndex: 1,
            isAnimation: false,
            yearMonthStr: '',
            start: {
                x: null,
                y: null
            },
            end: {
                x: null,
                y: null
            },
            distan: {
                x: 0,
                y: 0
            },
			datee:null,
			sliderWidth: 0,
			weekLanguages: {
				ch: ['日', '一', '二', '三', '四', '五', '六'],
				en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
			}
        }
    },
    watch: {
		defaultDate:{
			deep: true,
			handler: function (newVal, oldVal) {
				// console.log(22,newVal)
				this.dates=[]
			    this.init(newVal);
				// this.yearMonthStr = moment(newVal[1].date).format('YYYY-MM')
			}
		},
		// dates: {
		//     handler: function (newVal, oldVal) {
		// 		console.log(11,newVal)
		//         // this.yearMonthStr = moment(newVal[1].date).format('YYYY-MM-DD')
		// 		// console.log(this.yearMonthStr)
		//     },
		//    deep: true
		// },
		selectDate:{
			handler: function (newVal, oldVal) {
			     this.selectDate = newVal
				 this.yearMonthStr = moment(this.selectDate).format('YYYY-MM-DD')
				 
				 // console.log(this.selectDate)
			 },
			deep: true
		}
	},
	computed: {
		
		todayStyle: function () {
			let vm = this
			return {
				color: vm.todayTxtColor ? vm.todayTxtColor : ''
			}
		}
	},
    mounted () {
		this.yearMonthStr = moment().format('YYYY-MM-DD')
        this.sliderWidth = this.$refs.sliders.offsetWidth
    },
    created () {
       this.init(this.defaultDate)
    },
    methods: {
        /**
        *获取制定日期的当前周的日期数据
        */
	   init(defaultdate){
		   // console.log(defaultdate)
		   let vm = this
		   this.dates.push(
		       {
		           date: moment(defaultdate).subtract(7, 'd').format('YYYY-MM-DD'),
		       },
		       {
		           date: defaultdate,
		       },
		       {
		           date: moment(defaultdate).add(7, 'd').format('YYYY-MM-DD'),
		       }
		   )
		   // console.log(this.dates)
			
		  this.dates.forEach(function(e){
			  e.days = vm.getDaies(e.date)
		  })
		  
		},
        getDaies (date) {
            let vm = this,
                arr = []
            let weekOfDate = Number(moment(date).format('E'))
            let weeks = vm.weekLanguages[vm.lang]
            let today = moment()
            let defaultDay = moment(vm.defaultDate)
            if (weekOfDate === 7) {
                weekOfDate = 0
            }
            for (var i = 0; i < 7; i++) {
                let _theDate = moment(date).subtract(weekOfDate - i, 'd')
                arr.push({
                    date: _theDate.format('YYYY-MM-DD'),
                    week: weeks[i],
                    isToday: _theDate.format('YYYY-MM-DD') === today.format('YYYY-MM-DD'),
                    isDay: _theDate.format('E') === defaultDay.format('E')
                })
            }
            return arr
        },
        /**
        *根据索引计算出样式
        */
        getTransform (index) {
            let vm = this
            let style = {}
            if (index === vm.activeIndex) {
                style['transform'] = 'translateX('+ vm.distan.x +'px)'
            }
            if (index < vm.activeIndex) {
                style['transform'] = 'translateX(-100%)'
            }
            if (index > vm.activeIndex) {
                style['transform'] = 'translateX(100%)'
            }
            style['transition'] = vm.isAnimation ? 'transform .5s ease-out' : 'none'
            return style
        },
        /**
         * touchstart handle
         */
        touchstartHandle (event) {
            let vm = this,
                touch = event.touches[0]
            vm.start.x = touch.pageX
            vm.start.y = touch.pageY
        },
        /**
         * touchmove handle
         */
        touchmoveHandle (event) {
			let dom;
            let vm = this,
                touch = event.touches[0]
            vm.isAnimation = true
            vm.end.x = touch.pageX
            vm.end.y = touch.pageY
            vm.distan.x = vm.end.x - vm.start.x
            vm.distan.y = vm.end.y - vm.start.y
			if(this.htmlSliders==null){
				 dom = vm.distan.x < 0 ? this.$refs.sliders.children[2] : this.$refs.sliders.children[0]
			}else{
				 dom = vm.distan.x < 0 ? this.htmlSliders.children[2] : this.htmlSliders.children[0]
			}    
            if (vm.distan.x < 0) {
                dom.style['transform'] = 'translateX('+ (vm.sliderWidth + vm.distan.x) +'px)'
            }else {
                dom.style['transform'] = 'translateX('+ (-vm.sliderWidth + vm.distan.x) +'px)'
            }
        },
        /**
         * touchend handle
         */
        touchendHandle (event) {
            let vm = this,
                touch = event.changedTouches[0]
            vm.isAnimation = true
            vm.end.x = touch.pageX
            vm.end.y = touch.pageY
            vm.distan.x = vm.end.x - vm.start.x
            vm.distan.y = vm.end.y - vm.start.y
            vm.getTouchDirection(vm.distan.x, vm.distan.y)
            if (vm.direction === 'left') {
                vm.activeIndex = 2
            } else if (vm.direction === 'right') {
                vm.activeIndex = 0
            } else {
                for (var i = 0; i < this.$refs.sliders.children.length; i++) {
                    this.$refs.sliders.children[i].style['transform'] = 'translateX('+ (i*100 - 100) +'%)'
                }
            }
            vm.distan.x = 0
            vm.distan.y = 0
            vm.direction = null
        },
        onTransitionEnd (index) {
            let vm = this
            vm.isAnimation = false
            if (index === 2 ) {
                vm.dates.push({
                    date: moment(vm.dates[vm.activeIndex].date).add(7, 'd').format('YYYY-MM-DD')
                })
                vm.dates.shift()
				vm.dates.forEach(function(e){
					e.days = vm.getDaies(e.date)
				})
                vm.activeIndex = 1
            }else if (index === 0) {
                vm.dates.unshift({
                    date: moment(vm.dates[vm.activeIndex].date).subtract(7, 'd').format('YYYY-MM-DD')
                })
                vm.dates.pop()
				vm.dates.forEach(function(e){
					e.days = vm.getDaies(e.date)
				})
                vm.activeIndex = 1
            }
			// console.log(this.dates)
			// this.$msg(this.dates[this.dates.length-1].date)
        },
        /**
         * getAngle 计算角度
         */
        getAngle (x, y) {
            return Math.atan2(y, x) * 180 / Math.PI;
        },
        /**
         * getTouchDirection 获取滑动方向
         */
        getTouchDirection (x, y) {
            let vm = this
            if (Math.abs(x) > 20) {
                let angle = vm.getAngle(x, y)
                if (angle >= -45 && angle <= 45) {//向右
                    vm.direction = 'right'
                } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {//向左
                    vm.direction = 'left'
                }
            }
        },
        dayClickHandle (date) {
		   // this.onTransitionEnd(date)
		   // this.datee=
		   // this.$msg(date)
           this.$emit('dateClick', date)
           this.$emit('update:defaultDate', date)
		},
		/**
		 *生成日期样式
		 */
		buildDateStyle (isToday, isActive) {
			let vm = this
			let res = {}
			if (isActive) {
				res.color = vm.activeTxtColor || ''
				res.background = vm.activeBgColor || ''
				res.backgroundSize = "cover"
			}
			if (isToday) {
				res.color = vm.todayTxtColor || ''
				res.background = vm.todayBgColor || ''
				res.backgroundSize = "cover"
			}
			return res
		}
    }
}
</script>
<style lang="less" scoped>
.active{ background:url(../../static/img/app/venue/pre.png) no-repeat center;background-size: contain ;}
.year_str{position: absolute;
	top: 36rpx; 
	right: 28rpx;
   color: #fff;}
  .week-slider .sliders .slider .day.active{}
.week-slider{
    width: 100%;
    overflow: hidden;
	height: 308rpx; 
	padding: 28rpx 0;
    margin: auto;
    .sliders{
        position: relative;
        .slider{
            height: 112rpx; width: 100%; display: flex; position: absolute; top: 0; left: 0;
            .day{
                flex: 1;
                div{
					    color: #fff;
					    height: 198rpx;
					    width: 96rpx;
					    padding: 12rpx 0;
					    margin: auto;
					    text-align: center;
					    line-height: 98rpx; 
						font-size: 36rpx;                      
                    &.sameDay{
                        background-color: #999; color: #FFF;
                    }
                    span{
                        font-size: 33rpx;
                    }
                }
            }
        }
    }
}
</style>