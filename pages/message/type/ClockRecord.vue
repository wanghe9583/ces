<template>
    <view class="content">
		<view  class="hello" style="text-align: center;">
			<image class="clock-bg" src="@/static/img/msg/announcement_bg.png"/>
        <!-- <view v-if="hasLogin" class="hello"> -->
			<!-- <uni-nav-bar  leftIcon="back">
			    <view class="nav-title" >接待提示</view>
			    <view slot="right">
					<text class="icon-scan"></text>
					<text class="icon-list"></text>
				</view>
			</uni-nav-bar>	 -->
			<view class="record-box">
				<view class="time-now">
					<text>2019-10-21 21:00</text>
				</view>
				<view class="countnum">
					<text><text class="num">2</text>人未有晚间就寝打卡记录</text>
				</view>
				<view class="stulist">
					<i class="tri6"></i>
					<view  class="item"><image src="@/static/img/msg/announcement_sdudent.png" /><text class="name">王东东</text></view>
					<view  class="item"><image src="@/static/img/msg/announcement_sdudent.png" /><text class="name">王东东</text></view>
					<view  class="item"><image src="@/static/img/msg/announcement_sdudent.png" /><text class="name">王东东</text></view>
					<view  class="item"><image src="@/static/img/msg/announcement_sdudent.png" /><text class="name">王东东</text></view>
					<view  class="item"><image src="@/static/img/msg/announcement_sdudent.png" /><text class="name">王东东</text></view>
					<view  class="item"><image src="@/static/img/msg/announcement_sdudent.png" /><text class="name">王东东</text></view>
				</view>
			</view>
        </view>
       
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    export default {
		components: {uniNavBar},
        computed: mapState(['forcedLogin', 'hasLogin', 'uerInfo']),
        onLoad() {
       //      if (!this.hasLogin) {
       //          uni.showModal({
       //              title: '未登录',
       //              content: '您未登录，需要登录后才能继续',
       //              /**
       //               * 如果需要强制登录，不显示取消按钮
       //               */
       //              showCancel: !this.forcedLogin,
       //              success: (res) => {
       //                  if (res.confirm) {
							// /**
							//  * 如果需要强制登录，使用reLaunch方式
							//  */
       //                      if (this.forcedLogin) {
       //                          uni.reLaunch({
       //                              url: '../login/login'
       //                          });
       //                      } else {
       //                          uni.navigateTo({
       //                              url: '../login/login'
       //                          });
       //                      }
       //                  }
       //              }
       //          });
       //      }
        }
    }
</script>

<style>
 .time-now{height:104rpx; color: #515269;font-size: 26rpx;   line-height: 104rpx;    margin: 0 36rpx;    border-bottom: 2rpx solid #F4F5F8;}
  .countnum{height: 104rpx;    line-height: 104rpx;    margin: 0 32rpx;    margin-bottom: 20px; color: #06060D;font-size: 30rpx;}
  .countnum .num{color: #06060D;font-size: 48rpx;}
  .stulist{position: relative;  line-height: 72rpx; background: #EAE8E6;border-radius: 8rpx; margin: 0 32rpx;}
  .stulist .item image{width: 30rpx;height:30rpx;vertical-align: middle;font-family: SourceHanSansCN-Bold;}
   .stulist .item .name{vertical-align: middle;margin-left: 14rpx;font-size: 30rpx;}
  .stulist .item{margin: 0 24rpx;display: inline-block;}
  .tri6 {
	     position: absolute;
	     width: 0;
	     height: 0;
	     border-color: transparent #EAE8E6;
	     border-width: 18.4px 0 0 28px;
	     border-style: solid;
	     top: -16rpx;
   }
	.clock-bg{
		width: 716rpx;
		height: 1146rpx;
	}

</style>
