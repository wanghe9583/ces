<template>
	<view class="content">
		<!-- <view v-if="hasLogin" class="hello"> -->
		<view class="app">
			<view class="">
				<view class="info">
					<h2>{{ui.name}}</h2>
					<view class="title">{{ui.details.title}}</view>
					<view class="opinion">{{ui.details.content}}</view>
					<view class="hr"></view>
				</view>
				<view class="rec-item view">
					<view class="view" style="flexDirection:column">
						<view class="rec-item-left">
							<text class="rec-txt">会议时间</text>
						</view>
						<view class="rec-item-right">
							<text class="rec-txt2">{{ui.details.date}} {{ui.details.startTime}} ～ {{ui.details.endTime}}</text>
						</view>
					</view>
				</view>
				<view class="rec-item view">
					<view class="view" style="flexDirection:column">
						<view class="rec-item-left">
							<text class="rec-txt">参与人员</text>
						</view>
						<view class="rec-item-right">
							<view class="rec-txt2">{{ui.percentage}}</view>
						</view>
					</view>
					<view class="view2" style="min-height: 4rem;">
						<view class="rec-name">
							<text v-for="item in ui.Members" :key="item.rid" :class="item.sign.done?'attend':'unattend'">{{item.name}}</text>
						</view>
					</view>
				</view>
				<view class="rec-item view">
					<view class="view" style="flexDirection:column">
						<view class="rec-item-left">
							<text class="rec-txt">会议地点</text>
						</view>
						<view class="rec-item-right">
							<text class="rec-txt2">{{ui.details.address}}</text>
						</view>
					</view>
				</view>
				
				<view v-if="ui.files.length!=0" class="rec-item view">
					<view class="view" style="flexDirection:column">
						<view class="rec-item-left">
							<text class="rec-txt">附件</text>
						</view>
						<view class="rec-item-right">
							<a v-show="!ui.IsFiles" class="viewFile" @click="ui.IsFiles=true">查看</a>
							<a v-show="ui.IsFiles" class="viewFile" @click="ui.IsFiles=false">隐藏</a>
						</view>
						<view v-show="ui.IsFiles" class="files-border">
							<view v-for="(item,index) in ui.files" :key="index">
								<view class="rec-item-left">
									<text class="rec-txt">{{item.name}}</text>
								</view>
								<view class="rec-item-right">
									<a :href="item.fullPath" class="viewFile">下载</a>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="btn-group">
				<view class="btn-cencel">取消会议</view>
				<navigator :url="'/pages/message/type/QRcode?id='+query.id">
					<view class="btn-sub">生成签到二维码</view>
				</navigator>
			</view>
			<!-- <view class="control-btns"> -->
			<!-- <button type="primary" class="refuse-btn">取消会议</button> -->
			<!-- </view> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import moment from 'moment'
	export default {
		data() {
			return {
				ui: {
					details: {
						title:"关于2019年人才教育方针的探讨",
						content:"与会嘉宾认为，当前国际形势面临多重考验，各方应积极携手合作，推动全球治理",
						date:"2019-10-21",
						startTime:"08：00",
						endTime:"10:00",
						address:"会议室503"
					},
					name: "部门会议",
					Members: [
						{name:"向美玲",sign:{done:true}},{name:"王丹凤",sign:{done:true}},{name:"揭奇卡",sign:{done:true}},{name:"华小冬",sign:{done:false}}
					],
					percentage: "3/4",
					files: [
						{name:"附件1",fullPath:''}
					],
					IsFiles: false,
					query:{}
				},

			};
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'uerInfo']),
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/app/meeting/list'
			})
		},
		onLoad(option) {
			this.query=option;
			// this.$api.get(this.config.schoolServiceBaseUrl, "Moblie/Meeting/" + option.id, null, res => {
			// 	this.ui.details = res.data;
			// 	this.ui.name = res.data.type.name;
			// 	this.ui.details.date = moment(this.ui.details.date).format('YYYY-MM-DD')
			// 	this.ui.Members = res.data.members;
			// 	if (res.data.uploadInfo.files) {
			// 		this.ui.files = res.data.uploadInfo.files;
			// 	}
			// 	let cancel = 0;
			// 	let all = 0;
			// 	this.ui.Members.forEach((x, index) => {
			// 		if (x.sign.done) {
			// 			cancel++;
			// 		}
			// 		all = index;
			// 	});
			// 	this.ui.percentage = cancel + "/" + (all + 1);
			// })
		}
	}
</script>

<style>
	.info{margin:0rpx 30rpx}
	h2{height:140rpx;border-bottom:2px dashed #edeff8;color:#06060d;font-weight:400;font-size:39rpx;font-family:SourceHanSansCN-Regular;line-height:140rpx}
	.title{height:81rpx;color:#06060d;font-size:36rpx;line-height:81rpx}
	.opinion{margin-bottom:40rpx;color:#515269;font-size:25rpx;line-height:42rpx}
	.hr{margin-bottom:40rpx;height:10rpx;background:url(/static/img/app/meeting/xian.png) no-repeat;background-size: cover;}
	.attend,.unattend{margin-right:10rpx}
	.unattend{color:#b9babf}
	.viewFile{color:#3870FF}
	.refuse-btn{border:1px solid #8d94b7;border-radius:21px 0 0 21px;background:#9098be}
	.agree-btn{border:1px solid #3870FF;border-radius:0 21px 21px 0;background:#3870FF}
	.control-btns{margin-top:100rpx;margin-bottom:30rpx;text-align:center}
	.control-btns button{display:inline-block;margin:0rpx 11rpx;width:336rpx;height:84rpx;line-height:84rpx}
	.files-border{padding:0rpx 40rpx;box-shadow:0 0 20rpx 2rpx rgba(213,213,213,.9)}
	.btn-group{
		margin:60rpx 30rpx;
		display: flex;
		justify-content: space-between;
	}
	.btn-cencel{width:338rpx;height:84rpx;border-radius:42rpx 0 0 42rpx;background:#8D94B7;color:#fff;font-size:36rpx;line-height:84rpx;text-align: center;}
	.btn-sub{width:342rpx;height:84rpx;border-radius:0 42rpx 42rpx 0;background:#3870FF;color:#fff;font-size:36rpx;line-height:84rpx;text-align: center;}
	.rec-name{
		width: 100%;
		margin: 0 !important;
		padding: 0 28rpx;
		font-size: 34rpx !important;
		box-sizing: border-box;
		word-wrap:break-word;
		/* overflow: visible; */
		word-break: break-all;
	}
</style>
