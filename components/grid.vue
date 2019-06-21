<template>
	<view class="grid">
		<!-- 滑动 -->
		<swiper	class="swiper" duration="300" circular="true" @change="categoryChange">
			<swiper-item v-for="(page, pageindex) in categoryList" :key="pageindex" >
				<view class="category-list">
					<view class="icon" v-for="category in page" :key="category.cat_id" @click="linkTo(category.link)">
						<image mode="widthFix" :src="category.img" style="width: 110upx;height: 110upx;background-color: #F1F1F5;"></image>
						<view>{{ category.title }}</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="dots" v-if="categoryList.length>1">
			<view v-for="(page, pageindex) in categoryList" :key="pageindex" :class="{ active: pageindex == currentPageindex }"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			gridDatas:{
				type:Array,
				default:()=>[]
			},
			girdType:{
				type:Number,
				default:0  //0 为固定  1为滑动
			},
			categoryList:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				title: 'grid',
				isCircular:false,
				currentPageindex: 0,
			};
		},
		methods:{
			//更新分类指示器
			categoryChange(event) {
				this.currentPageindex = event.detail.current;
			},
			linkTo(url){
				uni.navigateTo({
					url:url
				})
			}
		},
		components:{
		}
	}
</script>

<style lang="less">
	.gird{
		background: #fff !important;
	}
	.category-noswip{
		.category-list{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			background-color:#fff;
			.icon{
				width: 140upx;
				height: 140upx !important;
				overflow: hidden;
				text-align: center;
				image{
					max-width: 110upx;
					max-height: 110px !important;
					min-height: 110px !important;
					overflow: hidden;
				}
			}
		}
	}
	.category .swiper,uni-swiper{
		width: 100%;
		height: 100% !important;
	}
	.swiper .category-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.category-list .icon{
		width: 142upx;
	}
	.swiper .icon{
		text-align: center;
	}
	.swiper image{
		width: 110upx;
	}
	.dots{
		display: flex;
		justify-content: center;
		height: 15upx;
		width: 100%;
		margin-top: 10upx
	}
	.dots view{
		width: 30upx !important;
		height: 5upx !important;
		background-color: rgba(0, 0, 0, 0.2) !important;
	}
	.dots .active {
		background-color: #F8D347 !important;
	}
</style>
