<template>
    <view class="content">
		<view  class="hello">
			<view class="msglist">
				<view class="rec-item view"  >
				    <view class="view" style="flexDirection:column">
				        <view  class="rec-item-left">
							<text class="rec-txt">带队领导</text>
				        </view>
						<view class="rec-item-right">
							<text class="rec-txt2">揭其敏</text>
						</view>
				    </view>
				</view>
				<view class="rec-item view"  >
				    <view class="view" style="flexDirection:column">
				        <view  class="rec-item-left">
							<text class="rec-txt">到校时间</text>
				        </view>
						<view class="rec-item-right">
							<text class="rec-txt2">2019-10-22 9:00</text>
						</view>
				    </view>
				</view>
				<view class="rec-item view"  >
				    <view class="view" style="flexDirection:column">
				        <view  class="rec-item-left">
							<text class="rec-txt">来访人数</text>
				        </view>
						<view class="rec-item-right">
							<text class="rec-txt2">8人</text>
						</view>
				    </view>
				</view>
				<view class="rec-item view"  >
				    <view class="view" style="flexDirection:column;border: 0;">
				        <view  class="rec-item-left">
							<text class="rec-txt">来访嘉宾</text>
				        </view>
				    </view>
					<view class="view2" style="flexDirection:column">
						<text  class="rec-name">张三</text>
					    <text  class="rec-name">揭其敏</text>
						<text  class="rec-name">三四五零</text>
						<text  class="rec-name">三四零</text>
						<text  class="rec-name">周琴</text>
					</view>
				</view>
				<view class="rec-item view"  >
				    <view class="view" style="flexDirection:column">
				        <view  class="rec-item-left">
							<text class="rec-txt">接待人员</text>
				        </view>
						<view class="rec-item-right">
							<text class="rec-txt2">8人</text>
						</view>
				    </view>
				</view>
				<view class="rec-item view"  >
				    <view class="view" style="flexDirection:column;border: 0;">
				        <view  class="rec-item-left">
							<text class="rec-txt">具体安排</text>
				        </view>
				    </view>
					<view class="view2" style="flexDirection:column">
						<text  class="rec-name">安排参观人员参观办公区及教学区安排参观人员参观办公区及教学区</text>
					</view>
				</view>
				<view class="rec-item view"  >
				    <view class="view" style="flexDirection:column">
				        <view  class="rec-item-left">
							<text class="rec-txt">相关联系人</text>
				        </view>
						<view class="rec-item-right">
							<text class="rec-txt2">揭其敏</text>
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
    .hello {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .title {
        color: #8f8f94;
        margin-top: 50upx;
    }

    .ul {
        font-size: 30upx;
        color: #8f8f94;
        margin-top: 50upx;
    }

    .ul>view {
        line-height: 50upx;
    }
</style>
