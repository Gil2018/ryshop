<template>
	<transition name="fade">
		<view class="unik-modal" v-show="isShow" v-if="showType==0">
			<view class="unik-modal-wrap">
				<view class="unik-modal-title">
					{{modalTitle}}
				</view>
				<view class="unik-modal-content">
					<slot></slot>
				</view>
				<view class="unik-modal-footer" v-show="showButton">
					<button type="primary" v-if="sureButton" @click="confirm()">{{sureText}}</button>
					<button type="default" v-if="cancelButton" @click="close()">{{cancelText}}</button>
				</view>
			</view>
			<view class="background-shadow" v-if="shadow" @click="clickMask && closeModal()"></view>
		</view>
		<view class="unik-modal" v-show="showModal" v-if="showType==1">
			<slot></slot>
			<view class="background-shadow" v-if="shadow" @click="clickMask && closeModal()"></view>
		</view>
	</transition>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props: {
			showType:{
				type:Number,
				default:0
			},
			showModal:{
				type:Boolean,
				default:false
			},
			// title
			modalTitle: {
				type: String,
				default: ''
			},
			// 是否显示footer
			showButton: {
				type: Boolean,
				default: true
			},
			// 是否显示蒙层
			shadow: {
				type: Boolean,
				default: true
			},
			// 点击蒙层是否关闭模态框
			clickMask: {
				type: Boolean,
				default: true
			},
			// 确定按钮文字
			sureText: {
				type: String,
				default: '确定'
			},
			// 取消按钮文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 是否显示确定按钮
			sureButton: {
				type: Boolean,
				default: true
			},
			// 是否显示取消按钮
			cancelButton: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			close () {
				this.$emit('cancelModal');
				this.closeModal();
			},
			confirm () {
				this.$emit('confirmModal');
				this.closeModal();
			},
			closeModal () {
				this.$emit('showModal');
			},
			show () {
				this.$emit('showModal');
			}
		},
		computed:{
			isShow(){
				return this.$props.showModal;
			}
		}
	}
</script>

<style scoped>
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
	.unik-modal {
		width: 100%;
		height: 100%;
 		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}
	.unik-modal-wrap {
		width: 600upx;
		height: max-content;
		position: fixed;
		background: #fff;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 10;
	}
	.unik-modal-title {
		display: flex;
		justify-content: center;
		padding: 20upx 30upx;
	}
	.background-shadow{
		width: 100%;
		height: 100%;
		position: absolute;
		background: rgba(0,0,0,.3);
	}
	.unik-modal-footer {
		display: flex;
		border-top: 1px solid #ddd;
		padding: 20upx 30upx;
	}
	.unik-modal-footer button{
		padding: 0;
		height: 64upx;
		width: 160upx;
		line-height: 64upx;
		font-size: 28upx;
	}
	.unik-modal-content {
		display: flex;
		flex-grow: 1;
		padding: 0 30upx 20upx;
		max-height: 600upx;
		overflow: auto;
	}
</style>
