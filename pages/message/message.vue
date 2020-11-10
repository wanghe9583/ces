<template>
	<view class="content">
		<view class="hello">
			123123123
		</view>	
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			}
		},
		mounted() {

		},
		watch:{
			
		},
		methods: {
			
		},
		onNavigationBarButtonTap(e) {
			
		},
	}
</script>

<style>
	.type{
		display: flex;
		justify-content: space-around;
		padding: 40rpx 0;
		text-align: center;
	}
	.type-img{
		width: 92rpx;
		height: 92rpx;
	}
	.type-content{
		position: relative;
	}
	.type-badge,.listCell-badge{
		position: absolute;
		padding: 2rpx;
		background:#FF5A46;
		border: 2rpx solid #fff;
		color: #fff;
		border-radius: 50%;
		
	}
	.type-badge{
		min-width: 34rpx;
		line-height: 1;
		height: 34rpx;
		font-size: 20rpx;
		top: -8rpx;
		right: -4rpx;
	}
	.listCell-badge{
		top: -4rpx;
		left: 72rpx;
		width: 16rpx;
		z-index: 9;
		height: 16rpx;
	}
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}
	.uni-picker-container{display:block;position:fixed;left:0;right:0;top:0;bottom:0;box-sizing:border-box;z-index:999;font-size:32rpx}
	.uni-mask{position:fixed;z-index:999;top:0;right:0;left:0;bottom:0;background: rgba(0,0,0,.2) !important;}
	.box-left{
		background: #ffffff;
		position: fixed;
		z-index: 999;
		top: 20rpx;
		border-radius: 10rpx;
		right:4rpx;
		width: 40%;
	}
	.box-right{
		background:transparent;
		position: fixed;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 888;
	}
	.triangle-up {
	        width: 0;
	        height: 0;
			position: fixed;
	        border-left: 10rpx solid transparent;
	        border-right: 10rpx solid transparent;
	        border-bottom: 20rpx solid #ffffff;
	        margin-left: 20rpx;
			right:30rpx;
			
	}
	.box-title{
		padding:16rpx;
		font-size: 36rpx;
	}
	.list,.listCell{
		display: flex;
		
	}
	.list{
		padding: 30rpx;
		justify-content: space-between;
	}
	.listCell{
		position: relative;
	}
	.listCell-img{
		width: 100rpx;
		height: 100rpx;
		margin-right: 30rpx;
	}
	.listCell-content{
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		width: 420rpx;
		
	}
	.listCell-title{
		font-family: SourceHanSansCN-Regular;
		font-size: 36rpx;
		color: #06060D;
	}
	.listCell-title,.listCell-desc{
		display:block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.listCell-desc{
		font-family: SourceHanSansCN-Regular;
		font-size: 28rpx;
		color: #67686C;
	}
	.listCell-times{
		font-family: SourceHanSansCN-Regular;
		font-size: 24rpx;
		color: #A9AAAF;
	}
</style>
