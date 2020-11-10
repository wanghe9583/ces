<template>
  <view class="content">
    <view class="hello" style="text-align: center;">
      <image src="../../../static/img/msg/announcement_bg.png" mode="" class="clock-bg" style="height: 1180rpx;">
      </image>
      <!-- <view v-if="hasLogin" class="hello"> -->
      <!-- <uni-nav-bar  leftIcon="back">
			    <view class="nav-title" >接待提示</view>
			    <view slot="right">
					<text class="icon-scan"></text>
					<text class="icon-list"></text>
				</view>
			</uni-nav-bar>	 -->
      <view class="record-box">
        <text class="header-title">{{detailData.title}}</text>
        <text class="author">{{detailData.sender.name}} {{detailData.sender.time}}</text>
        <view class="news-content">
          <text v-html="detailData.content"></text>
          <br>
          <br>
          <br>
          <!-- <p> 株洲顺达科技服务有限公司合作项目的签约仪式及揭牌庆典。秋风送爽，硕果飘香的十月，茶送爽，硕果飘香的十月，茶陵职业中专迎来了与株中专迎来了与株洲顺达科技服务有限公司合作项目的签约仪式及洲顺达科技服务有限公司合作项目的签约仪式及揭牌庆典。</p>
					<p> 签约仪式及揭牌庆典的签约仪式及洲顺达科技服务有限公司合作项目的签约仪式及揭牌秋风送爽，硕果飘香的十月，茶陵职业中专迎来了。  </p> -->
        </view>
      </view>
      <view class="triangle">
        <view class="triangle-bottomleft"></view>
        <view class="triangle-bottomright"></view>
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
  components: { uniNavBar },
  computed: mapState(['forcedLogin', 'hasLogin', 'uerInfo']),
  data () {
    return {
      detailData: {
        title: '我校两个市级课题顺利通过中期验收',
        sender: {
          name: '黄宗人',
          time: '2020-10-21 21:00'
        },
        content: `<p>  株洲顺达科技服务有限公司合作项目的签约仪式及揭牌庆典。秋风送爽，硕果飘香的十月，茶送爽，硕果飘香的十月，阿勒泰职业中专迎来了与株中专迎来了与株洲顺达科技服务有限公司合作项目的签约仪式及洲顺达科技服务有限公司合作项目的签约仪式及揭牌庆典。</p>
					<p>  株洲顺达科技服务有限公司合作项目的签约仪式及揭牌庆典。秋风送爽，硕果飘香的十月，茶送爽，硕果飘香的十月，阿勒泰职业中专迎来了与株中专迎来了与株洲顺达科技服务有限公司合作项目的签约仪式及洲顺达科技服务有限公司合作项目的签约仪式及揭牌庆典。</p>
					<p>  签约仪式及揭牌庆典的签约仪式及洲顺达科技服务有限公司合作项目的签约仪式及揭牌秋风送爽，硕果飘香的十月，阿勒泰职业中专迎来了。  </p>`
      }
    }
  },
  onLoad (option) {
    this.$api.get(this.config.schoolServiceBaseUrl, 'Notice/' + option.id, null, res => {
      // this.detailData = res.data;					
    }, res => {

    });
  }
}
</script>

<style>
.header-title {
  font-size: 40rpx;
  width: 400rpx;
  display: block;
  text-align: center;
  margin: 18rpx auto;
  font-family: SourceHanSansCN-Medium;
}
.author {
  text-align: center;
  display: block;
  font-size: 24rpx;
  color: #cbcad2;
  padding-bottom: 32rpx;
  border-bottom: 2rpx solid #edeff8;
  margin: 0 30rpx;
}
.news-content {
  display: inline-block;
  margin: 0 30rpx;
  line-height: 52rpx;
  font-size: 30rpx;
  color: #06060d;
  letter-spacing: 0.14px;
  text-align: justify;
  height: 800rpx;
  overflow: auto;
}
.news-content p {
  text-indent: 40rpx;
  margin-top: 40rpx;
}
.hello {
  position: relative;
}
.triangle {
  position: absolute;
  /* background: #000000; */
  width: 676rpx;
  height: 292rpx;
  bottom: 20rpx;
  right: 36rpx;
  overflow: hidden;
}
.triangle-bottomleft {
  position: absolute;
  background: #fff;
  width: 748rpx;
  margin-top: 136rpx;
  margin-left: -92rpx;
  height: 304rpx;
  -webkit-transform: rotate(23.5deg);
  transform: rotate(23.5deg);
}
.triangle-bottomright {
  width: 748rpx;
  margin-top: 136rpx;
  margin-left: 20rpx;
  height: 304rpx;
  background: #fff;
  border-top: 2rpx solid #dee1e5;
  -webkit-transform: rotate(-23.5deg);
  transform: rotate(-23.5deg);
  /* border-bottom: 146px solid red; */
  /* border-left: 338px solid transparent; */
}
</style>
