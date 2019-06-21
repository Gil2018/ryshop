<template>
	<view class="imgTxtList">
		<view v-if="showType==0">
			<!-- 图文菜单 -->
			<view class="uni-flex nav">
				<view class="uni-flex-item">
					<image></image>
					<view>
						<text>待付款</text>
					</view>
				</view>
				<view class="uni-flex-item">
					<image></image>
					<view>
						<text>待收货</text>
					</view>
				</view>
				<view class="uni-flex-item">
					<image></image>
					<view>
						<text>待评价</text>
					</view>
				</view>
				<view class="uni-flex-item">
					<image></image>
					<view>
						<text>售后</text>
					</view>
				</view>
				<view class="uni-flex-item">
					<image></image>
					<view>
						<text>售后</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else="showType==1">
			<view class="uni-flex nav">
				<view class="uni-flex-item">
					<view>
						<text class="uni-title">2</text>
					</view>
					<view>
						<text>待付款</text>
					</view>
				</view>
				<view class="uni-flex-item">
					<view>
						<text class="uni-title">2</text>
					</view>
					<view>
						<text>待收货</text>
					</view>
				</view>
				<view class="uni-flex-item">
					<view>
						<text class="uni-title">1</text>
					</view>
					<view>
						<text>待评价</text>
					</view>
				</view>
				<view class="uni-flex-item">
					<view>
						<text class="uni-title">3</text>
					</view>
					<view>
						<text>售后</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			showType:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.nav{
		width: 93%;
		margin: 8px auto;
		background-color: #fff;
		border-radius: 8px;
		padding: 6px;
		color: #101010;
		justify-content: space-between;
	}
	.nav .uni-flex-item{
		text-align: center;
	}
	.nav .uni-flex-item:last-child{
		/* border-left: 1px solid #bbb; */
	}
	.nav image{
		width: 34px;
		height: 34px;
		background-color: #F0F0F0;
		border-radius: 4px;
	}
	.nav .uni-title{
		display: block;
		width: 34px;
		height: 31px;
		line-height: 31px;
		margin: 0 auto;
	}
</style>
