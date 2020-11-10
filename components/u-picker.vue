<template>
	<view>
		<view @click="open=true">
			<slot>
			</slot>
		</view>
		<view class="picker-container" v-if="open">
			<view class="mask" @click="open=false">
				<view class="picker-toggle">
					<view class="picker-header">
						<view class="picker-action picker-action-cancel" @click.stop="open=false"> 取消 </view>
						<view class="picker-action picker-action-confirm" @click.stop="_onSubmit"> 确定 </view>
					</view>
					<picker-view @change="bindChange" :value="index">
						<picker-view-column class="picker-body">
							<view class="column-item" v-for="(item,index) in range" :key="index">{{item[rangeKey]||item}}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'u-picker',
		props: {
			range: {
				type: Array,
				default: [],
			},
			rangeKey: {
				type: String,
				default: null,
			},
			value:{
				type:Number,
				default:0,
			}
		},
		data() {
			return {
				open: false,
				changeValue:null,
				index:[],
			};
		},
		methods: {
			bindChange(e){
				this.changeValue=e;
			},
			_onSubmit() {
				this.$emit("change", this.changeValue);
				this.open=false;
				this.index=this.changeValue.target.value;
			}
		},
		mounted() {
            this.index=this.index[this.value];
		}

	};
</script>
<style lang="scss">
	.picker-body {
		width: 100%;
		height: 420rpx;
		padding-top: 2px;
		overflow: hidden;
		background-color: #fff;
	}

	.column-item {
		text-overflow: ellipsis;
		white-space: nowrap;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.picker-container {
		display: block;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		box-sizing: border-box;
		z-index: 99;
		font-size: 32rpx;

		.mask {
			position: fixed;
			z-index: 99;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, .6);

			.picker-toggle {
				background: #FFFFFF;
				position: fixed;
				width: 100%;
				bottom: 0;
				// z-index: 1001;

				.picker-header {
					display: block;
					position: relative;
					text-align: center;
					width: 100%;
					height: 90rpx;
					background-color: #fff;


					.picker-action {
						display: block;
						max-width: 50%;
						top: 0;
						height: 100%;
						box-sizing: border-box;
						padding: 0 14px;
						font-size: 17px;
						line-height: 45px;
						overflow: hidden;
						cursor: pointer;
					}

					.picker-action-cancel {
						float: left;
						color: #888;
					}

					.picker-action-confirm {
						float: right;
						color: #007aff;
					}
				}

				.picker-header:after {
					content: "";
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					height: 1px;
					clear: both;
					border-bottom: 1px solid #e5e5e5;
					color: #e5e5e5;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scaleY(.5);
					transform: scaleY(.5);
				}
			}
		}
	}
</style>
