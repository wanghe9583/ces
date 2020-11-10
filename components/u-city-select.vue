<template>
	<u-popup v-model="value" mode="bottom" :popup="false" :mask="true" :safe-area-inset-bottom="true"
	 close-icon-color="#ffffff" :z-index="uZIndex" :maskCloseAble="maskCloseAble" @close="close">
		<u-tabs v-if="value" :list="genTabsList" :is-scroll="true" :current="tabsIndex" @change="tabsChange" ref="tabs" style="text-align: center;"></u-tabs>
		<view class="area-box">
			<view class="u-flex" :class="{ 'change':isChange }">
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group>
								<u-cell-item v-for="(item,index) in provinces" :title="item.name" :arrow="false" :index="index" :key="index"
								 @click="provinceChange">
									<u-icon v-if="isChooseP&&province===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseP">
								<u-cell-item v-for="(item,index) in citys" :title="item.name" :arrow="false" :index="index" :key="index"
								 @click="cityChange">
									<u-icon v-if="isChooseC&&city===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>

				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseC">
								<u-cell-item v-for="(item,index) in areas" :title="item.name" :arrow="false" :index="index" :key="index"
								 @click="areaChange">
									<u-icon v-if="isChooseA&&area===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	// import provinces from "uview-ui/libs/util/province.js";
	// import citys from "uview-ui/libs/util/city.js";
	// import areas from "uview-ui/libs/util/area.js";
	/**
	 * city-select 省市区级联选择器
	 * @property {String Number} z-index 弹出时的z-index值（默认1075）
	 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker（默认true）
	 * @property {String} default-region 默认选中的地区，中文形式
	 * @property {String} default-code 默认选中的地区，编号形式
	 */
	export default {
		name: 'u-city-select',
		props: {
			provinces:{
				type: Array,
				default () {
					return [];
				}
			},
			len:{
				type:Number,
				default(){
					return 2;
				}
			},
			citys:{
				type: Array,
				default () {
					return [];
				}
			},
			areas:{
				type: Array,
				default () {
					return [];
				}
			},
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: Boolean,
				default: false
			},
			// 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"]
			defaultRegion: {
				type: Array,
				default () {
					return [];
				}
			},
			// 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"]
			areaCode: {
				type: Array,
				default () {
					return [];
				}
			},
			// 是否允许通过点击遮罩关闭Picker
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 弹出的z-index值
			zIndex: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				cityValue: "",
				isChooseP: false, //是否已经选择了省
				province: 0, //省级下标
				// provinces: provinces,
				isChooseC: false, //是否已经选择了市
				city: 0, //市级下标
				// citys: citys[0],
				isChooseA: false, //是否已经选择了区
				area: 0, //区级下标
				// areas: areas[0][0],
				tabsIndex: 0,
			}
		},
		watch: {
			defaultRegion: {
				handler(newVal) {
					this.init()
				},
				immediate: true
			},
			len: {
				handler(newVal) {
					this.len = newVal
					// this.len = newVal
				},
				immediate: true
			}
		},
		mounted() {
			this.init();
		},
		computed: {
			isChange() {
				return this.tabsIndex > 1;
			},
			genTabsList() {
				let tabsList = [{
					name: "请选择"
				}];
				if (this.isChooseP) {
					tabsList[0]['name'] = this.provinces[this.province]['name'];
					tabsList[1] = {
						name: "请选择"
					};
				}
				if (this.isChooseC) {
					tabsList[1]['name'] = this.citys[this.city]['name'];
					if(this.province==1){
						tabsList[2] = {
							name: "请选择"
						};						
					}
				}
				if (this.isChooseA) {
					tabsList[2]['name'] = this.areas[this.area]['name'];
				}
				return tabsList;
			},
			uZIndex() {
				// 如果用户有传递z-index值，优先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		methods: {
			init() {
				if (this.areaCode.length >0) {
					this.setProvince("", this.areaCode[0]);
					this.setCity("", this.areaCode[1]);
					this.setArea("", this.areaCode[2]);
				} else if (this.defaultRegion.length >0) {
					// this.setProvince(this.defaultRegion[0], "");
					// this.setCity(this.defaultRegion[1], "");
					// this.setArea(this.defaultRegion[2], "");
					console.log(3)
					this.isChooseP = true;
					this.isChooseC = true;
					this.province = 0;
					this.city = 0;
				};
			},
			setProvince(name = "", rid = "") {
				this.provinces.map((v, k) => {
					if (rid ? v.rid == rid : v.name == name) {
						this.provinceChange(k);
					}
				})
			},
			setCity(name = "", rid = "") {
				this.citys.map((v, k) => {
					if (rid ? v.rid == rid : v.name == name) {
						this.cityChange(k);
					}
				})
			},
			setArea(name = "", rid = "") {
				this.areas.map((v, k) => {
					if (rid ? v.rid == rid : v.name == name) {
						this.isChooseA = true;
						this.area = k;
					}
				})
			},
			close() {
				this.$emit('input', false);
			},
			tabsChange(index) {
				this.tabsIndex = index;
			},
			provinceChange(index) {
				this.isChooseP = true;
				this.isChooseC = false;
				this.isChooseA = false;
				this.province = index;
				// this.citys = citys[index];
				this.tabsIndex = 1;
				var result = {
					// typeIndex:this.province,
					// typeRid:this.provinces[index]
					detail:{
						column:0,
						value:this.provinces[index]
					}
				}
				result.detail.value.index = index
				this.$emit('type-change',result);
			},
			cityChange(index) {
				this.isChooseC = true;
				this.isChooseA = false;
				this.city = index;
				// this.areas = areas[this.province][index];
				this.tabsIndex = this.len-1 ;
				if(this.len==2){
					this.close();
				}
				
				var result = {
					// typeIndex:this.province,
					// typeRid:this.provinces[index]
					detail:{
						column:1,
						value:this.citys[index],
						type:this.province,
						strArr:[this.provinces[this.province].name,this.citys[index].name]
					}
				}
				result.detail.value.index = index
				this.$emit('type-change',result);
			},
			areaChange(index) {
				this.isChooseA = true;
				this.area = index;
				// let result = {};
				// result.province = this.provinces[this.province];
				// result.city = this.citys[this.city];
				// result.area = this.areas[this.area];
				var result = {
					detail:{
						column:2,
						value:this.areas[index],
						type:this.province,
						strArr:[this.provinces[this.province].name,this.citys[this.city].name,this.areas[index].name]
					}
				}
				this.close();
				this.$emit('type-change',result);
			}
		}

	}
</script>
<style lang="scss">
	.area-box {
		width: 100%;
		overflow: hidden;
		height: 800rpx;

		>view {
			width: 150%;
			transition: transform 0.3s ease-in-out 0s;
			transform: translateX(0);

			&.change {
				transform: translateX(-33.3333333%);
			}
		}

		.area-item {
			width: 33.3333333%;
			height: 800rpx;
		}
	}
</style>
