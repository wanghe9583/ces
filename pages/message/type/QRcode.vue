<template>
    <view class="content">
       <!-- <view v-if="hasLogin" class="hello"> -->
		<view  class="app">	
		<!-- <image src="/static/img/app/meeting/bg.png" mode="aspectFit" class="bg"></image> -->
			<view class="qrcode-div">
				
				<view class="qrcodecontent">
					<view class="info">
						<image  class="meeting-icon" src="/static/img/app/meeting/meeting.png" mode="aspectFit"></image>
						<view class="ft">
							<view class="type">{{meeting.type.name}}</view>
							<view class="title">主题：{{meeting.title}}</view>
						</view>
						<i class="yuan1"></i>
						<i class="yuan2"></i>
					</view>
					<hr class="hr-line"/>
					<canvas :click="make()" class="qrcode-img" mode="aspectFit" canvas-id="qrcode" style="width: 550rpx;height: 550rpx;" />
				</view>
				
			</view>
			<view class="ts">
				<image src="/static/img/app/meeting/tips.png" mode="aspectFit" class="tips"></image>
				<text class="tips-txt">扫描上方二维码完成会议签到</text>
			</view>
			<uniPopup ref="popup" type="center">
				<view class="confirm-div">
					<text class="ts1">您已成功签到</text>
					<text class="ts2">请尽快入场</text>
					<navigator open-type="redirect" :url="'/pages/message/type/meetInfo?id='+query.id">
						<button class="ok-btn">好的</button>
					</navigator>
				</view>
			</uniPopup>
		</view>
		
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'
	import uQRCode from '../../../js_sdk/Sansnn-uQRCode/uqrcode.js'
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"
	import moment from 'moment'
    export default {
		data(){
			return {
			  meeting:{type:{name:"部门会议"},title:'关于2019年人才教育方针的探讨'},query:{},
			  pixelRatio:0.5,
			};
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'uerInfo']),
		components: {uniPopup},
		methods:{
			make(){
				var that = this
				let date=moment().format();
				var txt = JSON.stringify({"type":"meeting","key":this.query.id,"time":date});
				console.log(this.pixelRatio*494)
				  uQRCode.make({
				    canvasId: 'qrcode',
				    componentInstance: this,
				    text: txt,
				    size: this.pixelRatio*550,
				    margin: 10,
				    backgroundColor: '#ffffff',
				    foregroundColor: '#000000',
				    fileType: 'jpg',
				    correctLevel: uQRCode.defaults.correctLevel,
				    success: res => {
				    }
				  })
				setInterval(res=>{
					var that = this
					let date2=moment().format();
					var txt = JSON.stringify({"type":"meeting","key":this.query.id,"time":date2});
					
					  uQRCode.make({
					    canvasId: 'qrcode',
					    componentInstance: this,
					    text: txt,
					    size: this.pixelRatio*550,
					    margin: 10,
					    backgroundColor: '#ffffff',
					    foregroundColor: '#000000',
					    fileType: 'jpg',
					    correctLevel: uQRCode.defaults.correctLevel,
					    success: res => {
					    }
					  })
				},600000);
				
			},
			// openPopup:function() { },
		},
		mounted() {
			if(this.query.meeting=="success"){
				this.$refs.popup.open()
			}
		},
        onLoad(option) {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
			        // console.log(res.screenWidth/750*494)
					that.pixelRatio = res.screenWidth/750
			    }
			});
			this.query=option;
			this.$api.get(this.config.schoolServiceBaseUrl,"Moblie/Meeting/"+this.query.id,null, res => {
			        this.meeting=res.data;
			})
        }
    }
</script>

<style>
.ts1 {
	color: #121b72;
	font-size: 44rpx;
	display: block;
	text-align: center;
	margin-bottom: 19rpx;
	padding-top: 196rpx
}

.ts2 {
	font-size: 30rpx;
	color: #121b72;
	display: block;
	text-align: center;
	margin-bottom: 39rpx
}

.ok-btn {
	width: 375rpx;
	height: 67rpx;
	background: #3c5bf2;
	line-height: 67rpx;
	color: #fff;
	box-shadow: 0 2px 6px 0 rgba(42,57,231,.3);
	border-radius: 17px
}

.confirm-div {
	width: 504rpx;
	height: 476rpx;
	margin-top: -200rpx;
	background: url(../../../static/img/app/meeting/bg2.png) no-repeat;
	background-size: cover
}

.yuan1 {
	width: 32rpx;
	height: 64rpx;
	background-color: #3853e2;
	border-radius: 0 100px 100px 0;
	position: absolute;
	bottom: -64rpx;
	left: 20rpx;
	display: inline-block
}

.yuan2 {
	width: 32rpx;
	height: 64rpx;
	background-color: #354cd3;
	border-radius: 100px 0 0 100px;
	bottom: -64rpx;
	right: 20rpx;
	display: inline-block;
	position: absolute
}

.qrcode-img {
	width: 494rpx;
	height: 494rpx;
	margin: 112rpx auto;
	display: block
}

.info {
	padding: 112rpx 0rpx 47rpx 0rpx;
	position: relative
}

.ft {
	display: inline-block;
	vertical-align: middle;
	color: #06060d
}

.type {
	font-family: SourceHanSansCN-Regular;
	font-size: 36rpx;
	margin-bottom: 25rpx
}

.title {
	font-family: SourceHanSansCN-Regular;
	font-size: 12px;
}

.hr-line {
	width: 86%;
	margin: auto;
	border: 1px dashed #ced1e6;
	margin-top: 28rpx
}

.meeting-icon {
	height: 100rpx;
	width: 100rpx;
	vertical-align: middle;
	margin-left: 44rpx;
	margin-right: 25rpx
}

.content {
	height: 100%;
	background: url(../../../static/img/app/meeting/bg.png) no-repeat center;
	padding-bottom: 420rpx;
	position: fixed;
	top: -10;
	left: 0;
	width: 100%;
	height: 100%;    
}

.qrcode-div {
	height: 100%;
	background: url(../../../static/img/app/meeting/kuang1.png) no-repeat 0 28rpx;
	background-size: 100% 100%;
	padding-bottom: 2rpx;
}

.ts {
	background: #304ac9;
	border-radius: 8px;
	display: inline-block;
	text-align: center;
	display: block;
	margin: 30rpx 25rpx;
	padding: 33rpx 0
}

.tips {
	width: 58rpx;
	height: 58rpx;
	display: inline-block;
	vertical-align: middle
}

.tips-txt {
	vertical-align: middle;
	margin-left: 30rpx;
	color: #fff;
	font-size: 30rpx
}
</style>
