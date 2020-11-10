// 图表封装
export default{
    canvasGraph(canvasID,data,summation){
		uni.getSystemInfo({
		    success: (res)=> {
				var pixelRatio = res.screenWidth/750	
				function PieChart(ctx,radius){
					 //定义起始角度
					let tempAngle=120;
					
					// console.log(res)
					// console.log(res.screenWidth/750*494)
						
					//定圆心位置
					
					let x0=200*pixelRatio,y0=200*pixelRatio;
					console.log(x0,y0)
			　　　　　　//伸出长度
					let outLine = 18;
					PieChart.prototype.init = function(data){
						this.drawPie(data);
					};    
					// 绘画扇形 及中心圆
					PieChart.prototype.drawPie = function(data){
						for (let i = 0; i < data.length; i++) {
							// 开始一个新路径
							ctx.beginPath();
							// 移动到中心点
							ctx.moveTo(x0,y0);
							//计算当前扇形角度   所占比例*360
							let angle = (data[i].value-0.002)*360;
							// console.log(angle)
							//当前扇形起始绘制弧度   360 = 2π  等于6.28
							let startAngle = tempAngle*Math.PI/180;
							//当前扇形借结束绘制弧度
							let endAngle = (tempAngle + angle)*Math.PI/180;
							//绘制扇形  x y中心  半径  开始弧度  结束弧度
							ctx.arc(x0,y0,radius,startAngle,endAngle);
							//填充扇形
							ctx.fillStyle = data[i].color;
							// 填充
							ctx.fill();
							// 调用添加标题解释方法
							// this.drawTitle(startAngle,angle,data[i].color, data[i].title + data[i].money)
							//当前扇形结束绘制角度，即下一个扇形开始绘制角度
							tempAngle += angle;
							ctx.beginPath();
							// 移动到中心点
							ctx.moveTo(x0,y0);
							//计算当前扇形角度   所占比例*360
							let angle2 = 0.002*360;
							// console.log(angle)
							//当前扇形起始绘制弧度   360 = 2π  等于6.28
							let startAngle2 = tempAngle*Math.PI/180;
							//当前扇形借结束绘制弧度
							let endAngle2 = (tempAngle + angle2)*Math.PI/180;
							//绘制扇形  x y中心  半径  开始弧度  结束弧度
							ctx.arc(x0,y0,radius,startAngle2,endAngle2);
							//填充扇形
							ctx.fillStyle ="#ffffff";
							// 填充
							ctx.fill();
							// 调用添加标题解释方法
							// this.drawTitle(startAngle,angle,data[i].color, data[i].title + data[i].money)
							//当前扇形结束绘制角度，即下一个扇形开始绘制角度
							tempAngle += angle2;
						}
						// 开始一个新路径
						ctx.beginPath();
						// 开始画圆
						ctx.arc(x0, y0, 120*pixelRatio, 0, 2 * Math.PI)
						// 填充颜色 白色
						ctx.setFillStyle('white')
						// 调用绘制中心圆文字方法
						this.drawCenterTitle()
					}
					// 伸出线条方法
					// PieChart.prototype.drawTitle = function(startAngle,angle,color,title){
					// 	// 伸出去的长度 斜边长度 等于半径加上定义好的长度  
					// 	let out = radius;
					// 	// 当前弧度的二分之一
					// 	let du = startAngle+(angle/2)*Math.PI/180;
					// 	// 计算伸出的点x坐标
					// 	let outX = x0+out*Math.cos(du);
					// 	// 计算伸出的点y坐标
					// 	let outY = y0+out*Math.sin(du);
					// 	// 开始一个新路径
					// 	ctx.beginPath();
					// 	// 移动到中心点
					// 	ctx.moveTo(x0,y0);
					// 	// 画出点到伸出点的一条线
					// 	ctx.lineTo(outX,outY);
					// 	// 线条颜色
					// 	ctx.strokeStyle = color;
					// 	//设置标题
					// 	ctx.font = 'bold 14px Microsoft Yahei';
					// 	// 计算出标题文字宽度
					// 	let textWidth = ctx.measureText(title).width;
					// 	// 计算标题样式
					// 	ctx.textBaseline = "bottom";
					// 	// 刷新配置项  象限判断 与 对应符号
					// 	let optionArr=[
					// 		{
					// 			quadrant:outX>x0 && outY<y0,
					// 			symbol:['+','-','left']
					// 		},
					// 		{
					// 			quadrant:outX<x0 && outY<y0,
					// 			symbol:['-','-','right']
					// 		},
					// 		{
					// 			quadrant:outX<x0 && outY>y0,
					// 			symbol:['-','+','right']
					// 		},
					// 		{
					// 			quadrant:outX>x0 && outY>y0,
					// 			symbol:['+','+','left']
					// 		}
					// 	]
					// 	// 渲染的配置项
					// 	let {symbol} = optionArr.find(el=>el.quadrant&&el.symbol)
					// 	// 斜线起始点
					// 	let slashState = eval(outX+symbol[0]+outLine)
					// 	// 横线起始点
					// 	let lineState = eval(outX+symbol[0]+textWidth+symbol[0]+outLine)
					// 	// 终点
					// 	let lineEnd = eval(outY+symbol[1]+outLine)
					// 	// 标题文字样式
					// 	ctx.textAlign = symbol[2];
					// 	// 画出伸出的斜线
					// 	ctx.lineTo(slashState,lineEnd);
					// 	// 接上斜线画出标题下面的直线
					// 	ctx.lineTo(lineState,lineEnd);
					// 	// 填充标题
					// 	ctx.fillText(title,slashState,lineEnd);
					// 	// 填充
					// 	ctx.stroke();
					// }
					// 绘制中心文字
					PieChart.prototype.drawCenterTitle = function(){
					// 填充
					ctx.fill();
					// 文字大小
					ctx.setFontSize(48*pixelRatio)
					// 文字颜色
					ctx.fillStyle = "#333333"
					// 文字位置
					ctx.setTextAlign('center')
					// 插入文字
					ctx.fillText(`${summation}`, x0, y0+10*pixelRatio)
					// 文字大小sssss
					ctx.setFontSize(28*pixelRatio)
					// 合计字体样式
					ctx.font = 28*pixelRatio + 'px Microsoft Yahei';
					// 文字颜色
					ctx.fillStyle = "#999999"
					// 插入文字
					ctx.fillText('本月消费(元)', x0, y0+60*pixelRatio)
					// 开始画图
					ctx.draw()
				}
				}
			
						    
				var ctx = uni.createCanvasContext(canvasID) 
				var PieChart = new PieChart(ctx,180*pixelRatio)
				PieChart.init(data)
			},
		})
    }
    
}