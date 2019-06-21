<template>
	<view class="returnTop" :style="{display:isShow?'block':'none',}" @click="backTop">
		<!-- 回到顶部 -->
		<view class="iconfont icon-returnTop"></view>
		<text>顶部</text>
	</view>
</template>

<script>
	export default{
		props:{
			isShow:{
				type:Boolean,
				default:false,
			}
		},
		data(){
			return {
				topIcon:''
			}
		},
		onLoad() {
			//#ifndef APP-PLUS
				
			//#endif
		},
		methods:{
			backTop(){
				this.$emit('isShow',false);
				/* 回到页面顶部 */
				uni.pageScrollTo({
					scrollTop:0,
					duration:100
				})
			}
		}
	}
</script>

<style lang="less">
	.returnTop{
		position: fixed;
		z-index: 9999;
		bottom: 120upx;
		right: 20upx;
		width: 80upx;
		height: 80upx;
		overflow: hidden;
		border-radius: 50%;
		border:2upx solid #333;
		background-color: rgba(0,0,0,.5);
		line-height: 30upx;
		color: #fff;
		text-align: center;
		font-size: 24upx;
		white-space: pre-wrap;
		box-sizing: border-box;
		padding:10upx 6upx;
		.iconfont{
			font-size: 28upx;
			line-height: 30upx;
		}
		text{
			display: block;
		}
	}
</style>
