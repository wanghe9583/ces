const msgSetStorage=(title)=>{
	if(!title) return;
	uni.setStorage({
	    key: 'storage_msg',
	    data:title,
	    success: function () {
            
	    }
	});
}
const msgGetStorage=(title)=>{
	if(title==undefined) title='';
	uni.getStorage({
	    key: 'storage_msg',
	    success: function (res) {
			if(res.data){
			uni.showToast({
				title:res.data+title,
				success:function(){
					uni.setStorage({
					    key: 'storage_msg',
					    data:null,
					    success: function () {
							console.log("清除")
					    }
					});
				},
				duration:3000,
				mask:false,
				icon:'none'
			});	
			} 
	    }
	});
}
const msg = (title,success,duration=1500, mask=false, icon='none')=>{
	if(Boolean(title) === false){
		return;
	}
	if(!success){
		success=res=>{res};
	}								
	uni.showToast({
		title,
		success,
		duration,
		mask,
		icon
	});
}
const success = (content,success,title="提示",showCancel=false)=>{
	if(Boolean(title) === false){
		return;
	}
	if(!success){
		success=res=>{res};
	}
	uni.showModal({
		title,
		content,
		success,
		showCancel
	});
}
const error = (content,success,title="提示", showCancel=false,confirmColor='#ed4014')=>{
	if(Boolean(title) === false){
		return;
	}
	if(!success){
		success=res=>{res};
	}
	uni.showModal({
		title,
		content,
		success,
		showCancel,
		confirmColor
	});
}
export default {
	msg,
	success,
	error,
	msgSetStorage,
	msgGetStorage
}
