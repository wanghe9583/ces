<template>
    <view class="content">
       <!-- <view v-if="hasLogin" class="hello"> -->
		<view  class="app">	
			<view class="meetingList">
				<div v-for="item in list" :key="item.id">
				<view class="item">
					<view class="ft">
						<!-- <switch  @change="switchChange" class="switch" :checked="item.status==0?false:true" /> -->
						<navigator :url="'/pages/message/type/meetInfo?id='+item.id">
						<switch  @change="switchChange" class="switch" disabled :checked="item.status==0?false:true" />
						<view class="type">{{item.type.name}}</view>
						<view class="title">{{item.title}}</view>
						<view class="meettime">{{item.startTime}} ～ {{item.endTime}}</view>
						</navigator>
					</view>
					<view class="rt">
						<navigator :url="'/pages/message/type/QRcode?id='+item.id">
							<image class="meeting_img" src="../../../static/img/app/meeting/erweima.png"></image>
						</navigator>
					</view>
				</view>
				</div>
			</view>
		</view>
		<navigator url="/pages/app/meeting/add">
		<view class="fixed-btn"></view>
		</navigator>
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'
	import moment from 'moment'
    export default {
		data(){
			return {
			  list:[
				  {
					  id:1,
					  status:0,
					  type:{
						  name:"全体会议"
					  },
					  title:"全体教务人员关于2019年人才教育方针的探讨",
					  startTime:"8:00",
					  endTime:"10:00"
				  },
				  {
					  id:2,
					  status:1,
					  type:{
						  name:"全体会议"
					  },
					  title:"全体教务人员关于2019年人才教育方针的探讨",
					  startTime:"8:00",
					  endTime:"10:00"
				  }
			  ],
			  page:{
			  	pageIndex:0,
			  	pageSize:10
			  },
			};
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'uerInfo']),
		methods:{
			get(){
				this.page.user=this.uerInfo.UserId;
				this.page.pageIndex=this.page.pageIndex+1;
				this.$api.post(this.config.schoolServiceBaseUrl,"Moblie/Meeting/Page",this.page, res => {
					// if(this.page.pageIndex==1) this.$msg.msg(res.data.total+"条数据")
					// if(this.page.pageIndex==1) this.$msg.msgGetStorage(","+res.data.total+"条数据");
					    res.data.list.forEach(x=>{this.list.push(x)})
					    uni.stopPullDownRefresh();
				})
			},
		},
		mounted(){
			
		},
		onPullDownRefresh() {
		   this.list=[];
		   this.page.pageIndex=0;
		   // this.get();
		},
		onReachBottom(){
			// this.get();
		},
		onBackPress(options) {
			uni.switchTab({
			    url: '/pages/app/app'
			});
			return true
		},
		// onNavigationBarButtonTap(e) {
		//  uni.navigateTo({
		//      url: '/pages/app/meeting/add'
		//  });
		// },
        onLoad() {
           // this.get();
        }
    }
</script>
<style>
	.fixed-btn {
		position: fixed;
		right: 30rpx;
		bottom: 40rpx;
		width: 160rpx;
		height: 160rpx;
		background: url(../../../static/img/my/log/add.png);
		background-size: cover;
	}
	.meetingList {
		margin: 0rpx 30rpx;
		margin-top: 6px;
	}
	
	.current_time {
		color: #B9BABF;
		font-size: 25rpx;
		margin-bottom: 14rpx;
		margin-top: 28rpx;
	}
	.switch {
		transform:scale(0.5)
	}
	.title {
		color: #06060D;
		font-size: 30rpx;
		height: 114rpx;
		width: 364rpx;
		line-height: 50rpx;
		margin: 16rpx 0rpx 8rpx 30rpx;
		overflow: auto;
		text-overflow: ellipsis;
		/* white-space: nowrap; */
	}
	
	.meettime {
		margin-left: 30rpx;
		color: #B9BABF;
		;   font-size: 25rpx;
		float: left;
		display: inline-block;
		width: 100%;
	}
	
	.type {
		color: #515269;
		font-size: 25rpx;
		margin: 0rpx 28rpx;
	}
	
	.ft {
		margin: 20rpx 0rpx 0rpx 19rpx;
		text-align: left;
		width: 420rpx;
		display: inline-block;
		vertical-align: middle;
	}
	
	.item {
		height: 328rpx;
		background: #FFFFFF;
		box-shadow: 0 0 9px 0 rgba(96,109,184,0.17);
		border-radius: 10px;
		margin-bottom: 39rpx;
		margin-top:2rpx;
	}
	
	.meeting_img {
		width: 200rpx;
		height: 250rpx;
		display: inline-block;
		vertical-align: bottom;
	}
	
	.rt {
		display: inline-block;
		vertical-align: bottom;
		/* padding:28rpx 14rpx; */
		text-align: center;
		/* border: 1px solid #F4F5F8;
		border-radius: 7px; */
	}
	
	.rt-img {
		color: #B9BABF;
		font-size: 19rpx;
		display: block;
	}
	.add-btn{display:inline-block;width:159rpx;height:159rpx;background:url(../../../static/img/my/log/add.png);background-size:cover;}
</style>
