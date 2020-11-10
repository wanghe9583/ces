<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		data(){
			return{
				os:null,
				// version:'1.3.1'//服务器版本号，必须高于开发版本号
			}
		},
		globalData: {
			isUpload: false,
			version:null,
			newVersion:null,
		},
		onLaunch: function() {
			// #ifndef H5
			// #endif
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					//console.log('运行Android上') 
					this.os = 'Android'
					// plus.navigator.closeSplashscreen();
					break;
				case 'ios':
					this.os = 'iOS'
					//console.log('运行iOS上') 
					// plus.navigator.closeSplashscreen();
					break;
				default:
					//console.log('运行在开发者工具上') 
					// plus.navigator.closeSplashscreen();
					break;
			}
			uni.getStorage({ //获得保存在本地的用户信息  
				key: 'uerInfo',
				success: (res) => {
					this.login(res.data);
				},
				fail: (res) => {
					console.log(res)
					uni.reLaunch({
						url: '/pages/login/login',
						success: (res) => {
							console.log('成功')
						},
						fail: (res) => {
							console.log('失败')
						}
					});
				},
			});
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	@import "static/css/default.css";
	@import "uview-ui/index.scss";
	/* #endif */
	.flex-center{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
</style>
