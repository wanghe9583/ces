<template>
	<view>
	<text @click="isShow=true" v-show="!isShow">{{title}}</text>
	<view class="uni-picker-container" v-if="isShow">
		<view class="uni-mask">
		<view class="choose">
			<view v-if="chooseValueList.length">
				<view v-for="item in chooseValueList" :key="item.rid">
					<view  class="choose-box">
						<text class="choose-text">{{item.name}}</text>
						<ion-icon name="close-outline" @click="chooseDelete(item)"></ion-icon>
				    </view>
				</view>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx)">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in departmentList" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
				<view class="cu-item">搜索</view>
				<view class="cu-item">清空</view>
				<view class="cu-item">取消</view>
				<view class="cu-item" @click="confirm">确定</view>
			</scroll-view>	
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in departmentList" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<ion-icon name="add-circle" @click="chooseAll(index)"></ion-icon>
							<text class="cuIcon-title text-green"></text>{{item.name}}</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item grayscale">
							<view class="cu-avatar radius lg"></view>
							<view class="content" :class="item.isSelected?'selected':null" v-for="item in PersonnelList[index]" :key="item.rid">
								<view @click="chooseValue(item)">
									<text class="text-cut">{{item.name}} <ion-icon name="arrow-forward-circle-outline" class="arrow-forward-circle-outline"></ion-icon> </text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	</view>
	</view>
</template>
<script>
	export default {
		name: 'candidates',
		props: {
		  title: {
			type: String,
			default: "请选择"
		 },
		 value:{
			 type:Array,
			 default:null
		 }
		},
		data() {
			return {
				list: [],
				isShow:false,
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				departmentList:[],
				PersonnelList:[],
				chooseValueList:[]
			};
		},
		mounted() {
		    const s = document.createElement('script');
		    s.type = 'text/javascript';
		    s.src = 'https://unpkg.com/ionicons@5.0.0/dist/ionicons.js';
		    document.body.appendChild(s);
		},
		onLoad() {
			
		},
		onReady() {
			
			uni.hideLoading()
		},
		methods: {
			confirm(){
				
				this.value=this.chooseValueList;
				this.value.forEach(x=>{
					delete x.isSelected;
				})
				this.isShow=false;
				console.log(this.value)
			},
			chooseAll(index){
			   this.PersonnelList[index].forEach(x=>{
				   x.isSelected=true;
				   this.chooseValueList.push(x);
			   })
			    this.chooseValueList=[...new Set(this.chooseValueList)];
			},
			chooseValue(e){
				this.chooseValueList.push(e);
				this.chooseValueList=[...new Set(this.chooseValueList)];
				e.isSelected=true;
			},
			chooseDelete(e){
				this.chooseValueList=this.chooseValueList.filter(x=>x.rid!=e.rid);
				this.departmentList.forEach((x,index)=>{
					console.log(index)
					this.PersonnelList[index].forEach(x=>{
						if(x.rid==e.rid){
							x.isSelected=false;
						}
					})
				})
				
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		line-height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
		color: red;
		
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		padding: 15px;
		flex: 1;
	}
	.padding-top{
		padding: 15px;
		background: #ffffff;
	}
	.action{
		height: 30px;
		line-height:30px;
		font-size: 16px;
		background: rgb(221, 221, 221);
	}
	.content{
		 height: 30px;
		 line-height: 30px;
	     border-bottom: 1px solid #e4e4e4;
	}
	[name=arrow-forward-circle-outline]{
		float: right;
		right: 0;
		padding-top: 7px;       
	}
	[name=add-circle]{
		   float: right;
		       right: 0;
		       padding-top: 7px;
		       margin-right: 65%;
	}
	.choose{
		 height: 360rpx;
		 overflow: auto;
	}
	.choose-text{
		margin-left: 10px;
	}
	.choose-box{
		float: left;
		    width: 90px;
		    padding: 5px;
		    font-size: 15px;
		    margin: 12px;
		    background-color: #e54d42;
		    color: #ffffff;
		    box-shadow: 2px 2px 3px rgba(204, 69, 59, 0.2);
		    border-radius: 2400px;
			position: relative;
	}
	[name=close-outline]{
		    position: absolute;
		    font-size: 22px;
		    right: 10px;
	}
	.selected{
		background:#19be6b;
		pointer-events:none;
	}
	.uni-picker-container{display:block;position:fixed;left:0;right:0;top:0;bottom:0;box-sizing:border-box;z-index:999;font-size:16px}
	.uni-mask{position:fixed;z-index:999;top:0;right:0;left:0;bottom:0;background:#FFFFFF}
</style>
