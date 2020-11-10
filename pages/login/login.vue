<template>
	<view class="content">
		<view class="login-pic"><image src="../../static/img/login/pic.png" class="logo-img"></image></view>
		<view class="app-title">
			<text class="wz1">sdfasdf</text>
			<text class="wz1-1">asdf</text>
		</view>
		<view class="input-group">
			<view class="input-row">
				<m-input style="text-align:initial;text-indent:0rpx;" class="m-input username" type="text" clearable v-model="account"
				 placeholder="请输入账号" @keydown.enter="enterLogin" confirm-type="next" ref="username"></m-input>
			</view>
			<view class="input-row">
				<m-input style="text-align:initial;text-indent:0rpx;" class="pwd" type="password" displayable v-model="password"
				 placeholder="请输入密码" @confirm="enterLogin" confirm-type="done" ref="pwd"></m-input>
			</view>
		</view>
		<!-- view class="btn-row login-btn" :class="isDisabled?'disabled':null">
			<text type="primary" class="uni-button"  @tap="bindLogin">{{isDisabled?'正在登录':'登录'}}</text>
		</view> -->
		<wButton text="登 录" :rotate="isDisabled" @click.native="bindLogin()"  class="wbutton"></wButton>
		<view class="other-login">
			<div class="p1">
				<hr /><span class="">其他登录方式</span>
				<hr />
			</div>
			<div class="p2" @tap="faceLogin" id="facelogin">
				<image src="../../static/img/login/faceRecognition.png" mode="scaleToFill"></image><span>人脸识别登录</span>
			</div>
			<!-- <face :activename="activeName" :isrest='isRest' @restActive='restactive' @responseFun='responseFun' ></face> -->
		</view>
		<!-- <u-line-progress :percent="50" :striped="true" type="primary" :round="true" :striped-active="true" :show-percent = "true"></u-line-progress> -->
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import wButton from './watch-button.vue' //button
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput,
			wButton
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				test: false,
				isDisabled:false,
				msg: '',
				activeName: '',
				isRest:false
			}
		},
		methods: {
			enterLogin(){
				if(!this.account){
					this.$refs.username.focus()
					return false;
				}
				if(!this.password){
					this.$refs.pwd.focus()
					return false;
				}
				this.bindLogin()
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				if (this.account.length ==0 || this.password.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '账号或密码不能为空'
					});
					return;
				}
				this.isDisabled=true;
				
			},
			faceLogin(){
				
			},
			bingAppCliendId(userId){
				var s = getCurrentPages();
				if (s.length > 1) {
					uni.reLaunch({
						url: '/pages/message/message'
					})
				} else {
					uni.switchTab({
						url: '/pages/message/message'
					})
				}
			}
		},
		onReady() {
			this.initPosition();
					
		},
		onShow(){
			
		},
		onLoad() {
			
		}
	}
</script>

<style>
	.content{
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	    padding-top: 15%;
	}
	.wbutton{
		margin-top: 120rpx;
	}
	.uni-button {
		position: relative;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 14px;
		padding-right: 14px;
		box-sizing: border-box;
		font-size: 18px;
		text-align: center;
		text-decoration: none;
		line-height: 92rpx;
		border-radius: 5px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #00000;
	}
	.disabled{
		background: gray;
		    opacity: 0.2;
		    pointer-events: none;
		    cursor: default;
	}
</style>
