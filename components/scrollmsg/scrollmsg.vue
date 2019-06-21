<template>
	<view>
		<view class="uni-padding-wrap">
			<view v-if="scollType==0">
				<view class="uni-swiper-msg">
					<view class="uni-swiper-msg-title">
						<text>帮麦快报</text>
					</view>
					<swiper vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item v-for="(item, index) in msgs" :key="index">
							<navigator>{{item}}</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view v-if="scollType==1">
				<view class="uni-swiper-msg">
					<view class="uni-swiper-msg-title">
						<text>帮麦快报</text>
					</view>
					<swiper autoplay="true" circular="true" interval="5000">
						<swiper-item v-for="(item, index) in msgs" :key="index">
							<navigator>{{item}}</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props:{
		scollType:{
			type:Number,
			default:0 /* 1 横向滚动 ; 0纵向滚动*/
		},
		msgs:{
			type:Array,
			default:()=>[]
		}
	},
	data() {
		return {
			title:"滚动公告",
		}
	}
}
</script>
<style>
	.uni-padding-wrap{
		width: 95%;
		margin: 10upx auto 16upx;
		border-radius: 0 0 8px 8px;
		background-color: #fff;
		overflow: hidden;
	}
</style>
