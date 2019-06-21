<template>
	<view>
		<view class="uni-drawer" :catchtouchmove="catchtouchmove" :class="{'uni-drawer-visible':visible,'uni-drawer-bottom':bottomMode}" v-if="modeType=='bottom'">
			<view v-if="showMask" class="uni-drawer-mask" @tap="close"></view>
			<view class="uni-drawer-content">
				<slot></slot>
			</view>
		</view>
		<view class="uni-drawer" :catchtouchmove="catchtouchmove" :class="{'uni-drawer-visible':visible,'uni-drawer-right':rightMode}" v-if="modeType=='right'">
			<view v-if="showMask" class="uni-drawer-mask" @tap="close"></view>
			<view class="uni-drawer-right-content">
				<slot></slot>
			</view>
		</view>
		<view class="uni-drawer" :catchtouchmove="catchtouchmove" :class="{'uni-drawer-visible':visible,'uni-drawer-left':leftMode}" v-if="modeType=='left'">
			<view v-if="showMask" class="uni-drawer-mask" @tap="close"></view>
			<view class="uni-drawer-left-content">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 显示状态
			 */
			visible: {
				type: Boolean,
				default: false
			},
			/**
			 * 显示模式（左、右），只在初始化生效
			 */
			mode: String,
			/**
			 * 蒙层显示状态
			 */
			mask: {
				type: [Boolean, String],
				default: true
			},
			modeType:{
				type:String,
				default:"bottom"
			}
		},
		data() {
			return {
				bottomMode: false,
				rightMode:false,
				leftMode:false,
				catchtouchmove: false
			}
		},
		computed: {
			showMask() {
				return String(this.mask) === 'true'
			}
		},
		created() {
			this.bottomMode = this.mode === 'right'
			this.rightMode = this.mode === 'right'
			this.leftMode = this.mode === 'left'
			//#ifdef MP-WEIXIN
			this.catchtouchmove = true
			//#endif
		},
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style scoped>
	.uni-drawer {
		display: block;
		position: fixed;
		bottom: 0;
		visibility: hidden;
		z-index: 998;
		width: 100%;
		height: 100%;
	}

	.uni-drawer>.uni-drawer-mask {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 130%;
		background: rgba(0, 0, 0, 0.4);
	}
	.uni-drawer>.uni-drawer-content {
		display: block;
		position: absolute;
		bottom: 0;
		height: auto;
		width: 100%;
		min-height: 60%;
		background: #FFFFFF;
		transition: all 0.3s ease-out;
		transform: translateY(-100%);
	}
	.uni-drawer>.uni-drawer-right-content {
		display: block;
		position: absolute;
		bottom: 0;
		width: auto;
		height: 100%;
		background: #FFFFFF;
		transition: all 0.3s ease-out;
		transform: translateX(-100%);
	}
	.uni-drawer>.uni-drawer-left-content {
		display: block;
		position: absolute;
		bottom: 0;
		width: auto;
		height: 100%;
		background: #FFFFFF;
		transition: all 0.3s ease-out;
		transform: translateX(-100%);
	}

	.uni-drawer.uni-drawer-bottom>.uni-drawer-content {
		left: auto;
		right: 0;
		transform: translateY(100%);
	}
	.uni-drawer.uni-drawer-right>.uni-drawer-right-content {
		left: auto;
		right: 0;
		transform: translateX(100%);
	}
	.uni-drawer.uni-drawer-left>.uni-drawer-left-content {
		left: auto;
		right: 0;
		transform: translateX(-100%);
	}
	.uni-drawer.uni-drawer-visible {
		visibility: visible;
	}

	.uni-drawer.uni-drawer-visible>.uni-drawer-mask {
		display: block;
	}

	.uni-drawer.uni-drawer-visible>.uni-drawer-content {
		transform: translateY(0);
	}
	.uni-drawer.uni-drawer-visible>.uni-drawer-right-content {
		transform: translateX(0);
	}
	.uni-drawer.uni-drawer-visible>.uni-drawer-left-content {
		transform: translateX(0);
	}
</style>
