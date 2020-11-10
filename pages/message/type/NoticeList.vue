<template>
    <view class="content">
		<view  class="hello">
        <!-- <view v-if="hasLogin" class="hello"> -->
			<!-- <uni-nav-bar  leftIcon="back">
			    <view class="nav-title" >接待提示</view>
			    <view slot="right">
					<text class="icon-scan"></text>
					<text class="icon-list"></text>
				</view>
			</uni-nav-bar>	 -->
			<view class="msglist">
				<view class="media-item view"  v-for='(item,index) in data' :key='index'>
				    <view class="view" style="display: flex;align-items: flex-start;" @click="openDetail(item)">
				        <view  class="image-section flex-row image-section-left" style="padding: 20rpx 0;">
							<image class="image-list2"  src="/static/img/msg/announcement_list2.png" mode="aspectFill"></image>
				        </view>
						<view style="padding: 20rpx 0 ;border-bottom: 2rpx solid #EDEFF8;width: 640rpx;">
							<view class="section-right2">
								 <text class="media-title" >{{item.type.name}}</text>
								 <text class="time">{{item.sender.time}}</text>
							</view>
							 <text class="messsge-content">{{item.title}}</text>							
						</view>
				    </view>
				</view>
			
					
			</view>
           <!-- <view class="title">
                您好 {{userName}}，您已成功登录。
            </view>
            <view class="ul">
                <view>这是 uni-app 带登录模板的示例App首页。</view>
                <view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
            </view> -->
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
        data(){
			return {
				type:null,
				data: [
					{
						type:{
							name:"阿斯顿发射点发射点啊手动阀手动阀士大夫阿斯顿阿斯蒂芬啊啊"
						},
						sender:{
							time:"上午8:00"
						},
						title:"asdfhasjdhfhaiusd啊空间的时间发哈岁的艾师傅啊说得好覅"
					}
				]
			}
        },
	   mounted(){
	   	// this.getData();
	   },
	   onLoad(options) {
		   console.log(options.name)
		   this.type = options.name
			uni.setNavigationBarTitle({
				title: options.name=='gg'?'公告':'通知'//此处写页面的title
			});
			if(this.type == 'gg'){
				this.data = [
					{
						type:{
							name:"我校两个市级课题顺利通过中期验收"
						},
						sender:{
							time:"上午8:00"
						},
						title:"株洲顺达科技服务有限公司合作项目的签约仪式及揭牌庆典。"
					},
					{
						type:{
							name:"我校两个市级课题顺利通过中期验收"
						},
						sender:{
							time:"上午8:00"
						},
						title:"株洲顺达科技服务有限公司合作项目的签约仪式及揭牌庆典。"
					}
				]
			}else{
				this.data = [
					{
						type:{
							name:"您有一个新的消息通知"
						},
						sender:{
							time:"上午8:00"
						},
						title:"您有一个新的消息通知。"
					},
					{
						type:{
							name:"您有一个新的消息通知"
						},
						sender:{
							time:"上午8:00"
						},
						title:"您有一个新的消息通知。"
					}
				]
			}
	   },
	   methods:{
	   	getData(){
	   		this.$api.post(this.config.schoolServiceBaseUrl, 'Notice/Receive/Page/' , 
			{
				pageIndex:1,
				pageSize:999,
				user: this.uerInfo.UserId
			}, res => {	   			
	   			// this.data = res.data.list;
	   		}, res => {
	   			uni.showModal({
	   				title: '提示',
	   				content: res.msg,
	   				showCancel: false
	   			})
	   		});
	   	},
		openDetail(item){
			console.log(item)
			if(this.type=='gg'){
				uni.navigateTo({
					url: 'Notice?id='+item.id
				});				
			}
		}
	   },
	   
	   
	   
    }
</script>

<style scoped>
   .image-list2{width: 40rpx;height: 50rpx;vertical-align: text-top;}
   .section-right2{ display: flex;justify-content: space-between;align-items: center;}
   .media-title{ font-size: 36rpx;}
   .media-title,.messsge-content{width: 490rpx;overflow: hidden;   text-overflow: ellipsis;    white-space: nowrap;display:block;}
   .media-item{height: auto;padding-top: 0;padding-bottom: 0;}
</style>
