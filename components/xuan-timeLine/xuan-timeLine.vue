<template>
<view class="uni-picker-container" v-show="open">
	<view class="uni-mask">
	<scroll-view class="time-line-wrap">
		<view class="time-line">
			<!-- 标题 -->
			<view class="time-line-title">
				<view class="top-left-confirm" @click="open=false">取消</view>
				<view class="top-right-confirm" @click="close">确定</view>
			</view>
			<!-- 时间轴 -->
			<view class="time-line-container" :class="addTypeClass">
				<!-- 时间轴内容块列表 -->
				<view class="time-line-list">	
					<!-- 时间轴内容块 -->
					<view class="time-line-info" :key="index" :class="[layoutClass(index)]" :id="'timeline'+index" v-for="(item,index) of time_line_list">			
						<!-- 内容块内容 -->
						<view class="line-info-content" >
							<!-- 时间轴圆点 -->
							<view class="line-on-round" :style="{ opacity: current[index]&&current[index].is=='ok'?1:1,top:'50px'}" :class="current[index]&&current[index].is=='ok'?comeani:''"></view>
							<view class="info-content-wrap" :style="{ opacity: current[index]&&current[index].is=='ok'?1:1}" :class="current[index]&&current[index].is=='ok'?comeani:''">
								<!-- 标题 -->
								<view class="info-title">
									{{item.title?item.title:''}}<span>{{item.title_span}}</span>
								</view>
								<!-- 内容 -->
								<view class="info-content">
									<!-- 内容 -->
									<view class="info-txt" v-if="item.content">{{item.content}}</view>
									<input class="info-txt" v-model="content" placeholder="请输入审批意见" style="height: 40px;background: #fff;" v-else>
								</view>
							</view>	
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
                time_line_list:[],
				HEIGHT:0,//屏幕高度
				result:[],//监听的结果
				current:[],//当前在屏幕内的
				sum:0,//加载完成个数
				comeani:'come-ani',//入场动画
				isScroll:true,//是否加载动画
				content:'',
				open:false
			}
		},
		props:{
			location:{
				type:String,
				default:'left',
			},
			value:{
				type:Array,
				default:null
			},
			interiorFun:{
				type:String,
				default:null
			},
			dispose:{
				type:Function,
				default:null
			}
		},
		computed:{	
		addTypeClass(){
				let _class="";
				let arrType =["left","right","center"];
				if (arrType.indexOf(this.location)!==-1&&this.location!=='center') {
					_class+=this.location+"-time-line";
				}
				return _class;
			}
		},
		mounted() {
			if(this.interiorFun=="audit"){
				let current1=0;
				this.value.forEach(x=>{
					if(x.operator){
						if(!x.role){
							x.role={
								name:"特选人员"
							};
							// x.role.name="特定处理人"
						}
						let name="["+x.role.name+"]"+x.operator.name;
						if(x.operateTime){
						x.operateTime=this.moment(x.operateTime);
						}
						this.time_line_list.push({title:x.operateTime,title_span:name,content:x.comment});										  
					}else{
						if(current1==0){
							this.time_line_list.push({title:null,title_span:x.role.name,content:x.comment});
							current1=current1+1;
						}									 	
					}				  
				}) 
			}	
			if(this.interiorFun=="onaudit"){
				this.value.forEach(x=>{
					if(x.operator){
						if(!x.role){
							x.role={
								name:"特选人员"
							};
							// x.role.name="特定处理人"
						}
						let name="["+x.role.name+"]"+x.operator.name;
						if(x.operateTime){
						x.operateTime=this.moment(x.operateTime);
						}
						this.time_line_list.push({title:x.operateTime,title_span:name,content:x.comment});										  
					}			  
				}) 
			}
			this.init();
		},
		methods:{
			show() {
			   this.open = true;
			},
			hide() {
			   this.open = false;
			},
			close(){
			  this.dispose(this.content);
			  this.hide();
			},
			init(){
				try {
					// 获取屏幕高度
					const res = uni.getSystemInfoSync();
					this.HEIGHT=res.screenHeight;
					// 添加标志位
					for(let i=0;i<this.time_line_list.length;i++){
						this.current.push({tag:'timeline'+i,is:'no'});
					}	
					// 开始获取位置信息
					this.getScroll();		
				} catch (e) {
					// error
				}
				
			},
			moment(time){
				let arr = time.split(' '); 
				let arrLeft = arr[0].split('/');
				let arrRight = arr[1].split(':'); 
				arr = arrLeft.concat(arrRight); 
				arr = arr.map(item => item.length < 2 ? '0' + item : item);
				time = `${arr[0]}.${arr[1]}.${arr[2]} ${arr[3]}:${arr[4]}`;
				return time;
			},
			loadani(){
				for(let i=0;i<this.result.length;i++){
					for(let j=0;j<this.result[i].info.length;j++){
						// 是否没加载动画
						if(this.current[j].is!='ok'){
							// 是否进入视野
							if(this.current[j].tag==this.result[i].info[j].tag &&
							   this.result[i].info[j].domTop+90<this.HEIGHT){
								// 加载动画
								this.current[j].is='ok';
								this.sum=j+1;
							}
						}
					}
					// 移除当前
					this.result.splice(i,1);
				}
				// 是否全部加载完成
				if(this.sum==this.time_line_list.length){this.isScroll=false;}
			},
			async getScroll(){
				if(!this.isScroll){return;}
				let info=[];
				// 返回位置信息加入数组
				for(let i=0;i<this.time_line_list.length;i++){
					await this.getNodeList('timeline'+i,i).then(res => {
						info.push(res);
					});
				}
				this.result.push({info:info});
				// 加载动画
				this.loadani();
			},
			getNodeList(id,i){
				// 获取位置信息并返回
				return new Promise(resolve=>{
					const query = uni.createSelectorQuery().in(this);
					query.select('#'+id).boundingClientRect(data => {
					  // console.log("得到布局位置信息" + JSON.stringify(data));
					  if(data==null) data={height:0,domTop:0}
					  resolve({domInfo:data.height,domTop:data.top,tag:id})
					}).exec();
				});
				
			},
			// 添加动画
			layoutClass(index){
				let _class="";
				if(this.location=='center'&&index%2!=0){
					_class='right-info';
				}
				return _class;
			}
		},
	}
</script>

<style lang="scss">
	.time-line-wrap{
		width: 100%;
		overflow-x: hidden;
	}
	.time-line-wrap{
		font-family: 'sans-serif';
		.time-line{
			.time-line-title{
				font-size: 25px;
				font-weight: 800;
				text-align: center;
				// padding-bottom: 6px;
				height: 33px;
				// position: fixed;
				width: 100%;
				// top: 26%;
				z-index: 999;
				background: #ffffff;
				border-bottom: 2px solid #EDEFF8;    
			}
			// 中间的轴
			.time-line-container{
				padding: 10% 1% 3% 1%;
				position: relative;
				z-index: 99;
				&::before{
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					margin: 0 auto;
					height: 100%;
					width: 4px;
					background: #1177dd;
				}
				.time-line-list{
					width: 100%;
					.time-line-info{	
						position: relative;
						.line-info-content{
							will-change: auto;
							width: 43%;
							display: flex;
							flex-direction: column;
							.line-on-round{
								height: 20px;
								width: 20px;
								border: 4px solid #1177dd;
								border-radius: 50%;
								background: #fff;
								position: absolute;
								left: 0;
								right: 0;
								margin: 0 auto;
								top: 50px;
								box-shadow: 0px 2px 1px 1px rgba(0,0,0,.1);
								z-index: 10;
								&.come-ani{
									animation: come-round .8s ease-in-out;
								}
							}
							.info-content-wrap{
								position: relative;
								.info-title{
									min-height: 30px;
									word-break: break-word;
									text-align: right;
									margin: 5px 0;
									font-size: 34rpx;
									font-weight: 500;
									span{color: #1177dd;font-size: 38rpx;font-weight: 600;padding-left: 3px;}
									
								}
								.info-content{
									box-shadow: 1px 1px 1px 1px #d7e4ed;
									border-radius: 8px;
									padding: 5px;
									min-height: 40px;
									position: relative;	
									.info-txt{
										line-height: 40px;
									}
									&::before{
										content: '';
										border: 7px solid;
										border-color: transparent transparent transparent #aaa;
										position: absolute;
										left: 100%;
										top: 18px;
									}
								}
								&.come-ani{
									animation: come-in-left .6s ease-in-out;
								}		
							}
						}
					}
					.right-info{
						transform: rotateY(180deg);
						.line-info-content{
							.info-content-wrap{
								.info-title{
									transform: rotateY(180deg);
									text-align: left;
								}
								.info-content{
									.info-txt{transform: rotateY(180deg)}
								}
							}
						}
					}
				}
			}
			
			// 轴在左边
			.left-time-line{
				&::before{
					margin: 0;
					left: 15px;
				}
				.time-line-list{
					.time-line-info{	
						.line-info-content{
							width: auto;
							.line-on-round{
								left: 0;
								margin: 0;
							}
							.info-content-wrap{
								margin-left: 45px;
								margin-bottom: 15px;
								.info-title{
									text-align: left;	
								}
								.info-content{
									&::before{
										border-color: transparent #aaa transparent transparent;
										left: -15px;
									}
								}
								&.come-ani{
									animation: come-in-right .6s ease-in-out;
								}
							}
						}
					}
				}
			}
			
			// 轴在右边
			.right-time-line{
				&::before{
					margin: 0;
					left: 92.8%;
				}
				.time-line-list{
					.time-line-info{	
						.line-info-content{
							width: auto;
							.line-on-round{
								left: 90%;
								margin: 0;
							}
							.info-content-wrap{
								margin-right: 55px;
								margin-bottom: 15px;
								.info-content{
									&::before{
										border-color: transparent transparent transparent #aaa;
									}
								}
								
							}
						}
					}
				}
			}
		}
	}
	
	@keyframes come-in-left {
		0% {
			transform: translateX(-120%);
		}
		70% {
			transform: translateX(8%);
		}
		100% {
			transform: translateX(0);
		}
	}
	@keyframes come-in-right {
		0% {
			transform: translateX(120%);
		}
		70% {
			transform: translateX(-8%);
		}
		100% {
			transform: translateX(0);
		}
	}
	@keyframes come-round {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		40% {
			opacity: 0;
		}
		60% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}
.uni-picker-container{display:block;position:fixed;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.6);box-sizing:border-box;z-index:999;font-size:16px}
.uni-mask{position:fixed;z-index:999;top: 30%;right:0;left:0;bottom:0;background:#FFFFFF;overflow: auto;}
.top-left-confirm{
    float: left;
    color: #888;
    font-weight: 500;
    padding: 0 14px;
    font-size: 17px;
    line-height: 30px;
    overflow: hidden;
}
.top-right-confirm{
    float: right;
    color: #007aff;
    font-weight: 500;
    padding: 0 14px;
    font-size: 17px;
    line-height: 30px;
    overflow: hidden;
}
</style>
