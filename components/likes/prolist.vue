<template>
	<view>
		<!-- 猜你喜欢 begin -->
		<view class="bm-likes">
			<view class="bm-likes-top" v-if="showTitle">
				<image src="../../static/images/icon/icon-like.png"></image>
				<text>正品保障</text>
			</view>
			<view class="bm-likes-content">
				<view class="uni-flex uni-row snap-pro-list">
					<view class="flex-item" v-for="(g_item,g_index) in datas" @click="goGoods(g_item.id)" v-bind:key="g_index">
						<view>
							<image  class="snap-pro-img" v-if="g_item.img!=null&&g_item.img!=''" :src="g_item.img" lazy-load @error="imageError" :data-index="g_index"></image>
							<image class="snap-pro-img" v-else src="/static/images/default/img.png"></image>
						</view>
						<view class="pro-desc">
							<p class="pro-title">{{g_item.name}}</p>
							<view class="country-brand">
								<image class="uni-country-img icon" v-if="g_item.brand_country_icon!=null&&g_item.brand_country_icon!=''" :src="g_item.brand_country_icon"></image>
								<image class="uni-country-img icon" v-else src="/static/images/default/img.png"></image>
								<text>{{g_item.brand_country_name}} <text style="margin-left: 20upx;">{{g_item.brand_name}}</text></text>
							</view>
							<view class="pro-bot uni-flex">
								<text class="price">￥{{g_item.price}}</text>
								<text class='del-text'>￥{{g_item.price_market}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="nomore">{{nomore?'没有更多数据~':'上拉加载更多'}}</view>
		</view>
		<!-- 猜你喜欢 end -->
	</view>
</template>

<script>
	export default{
		props:{
			datas:{
				type:Array,
				default:() => []
			},
			showTitle:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return {
				class_id:0,
				goodsList:{
					page:0,
					limit:12,
					list:[],
				},
				nomore:false
			}
		},
		created:function(){
			var class_id = uni.getStorageSync('last_see_class_id')||0;
			this.class_id = class_id;
		},
		methods:{
			imageError:function(e){
				var that = this;
				var index = e.currentTarget.dataset.index;
				var goodsList = that.goodsList;
				goodsList['list'][index]['img'] = "/static/images/default/img.png";
				that.goodsList = goodsList;
			},
			// 商品详情
			goGoods:function(goods_id){
				// console.log(goods_id);
				this.indoorbuy.goPage("/pages/goods/detail?id="+goods_id);
			},
// 			toDetail(url,index){
// 				this.indoorbuy.goPage(url+"?id="+index)
// 			}
		}
	}
</script>
<style lang="less">
	.del-text{text-decoration:line-through;}
	/* 猜你喜欢 */
	.bm-likes{
		background-color: #F1F1F5;
		.bm-likes-top{
			height: 60upx;
			line-height: 60upx;
			text-align: center;
			image{
				width: 30upx;
				height: 30upx;
				margin-right: 12upx;
				margin-top: 6upx;
				margin-bottom: -6upx;
			}
		}
		.bm-likes-content{
			.snap-pro-list{
				flex-wrap: wrap;
				.flex-item{
					width: 49.2%;
					box-sizing: border-box;
					padding: 20upx;
					background-color: #fff !important;
					margin-right: 6upx;
					margin-bottom: 6upx;
					.uni-country-img{
						min-width: 30upx;
						max-width: 32upx;
						height: 30upx;
						margin-right: 12upx;
					}
					.country-brand{
						display: flex;
						align-items: center;
						font-size: 24upx;
						color: #A4A4A4;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						width: 100%;
					}
					.pro-title{
						font-weight: 600;
						font-size: 26upx;
						line-height: 36upx;
						text-align: left;
						height: 72upx;
						overflow: hidden;
						white-space: pre-wrap;
						text-overflow: ellipsis;
						color: #000000;
					}
					.snap-pro-img{
						margin-top: 0;
						width: 100%;
						height: 378upx;
						// background-color: #000000;
						border-radius: 0;
					}
					.pro-bot{
						text-align: left;
						justify-content: flex-start;
						align-items: flex-end;
						.price{
							font-weight: bold;
							font-size: 30upx;
						}
						.del-text{
							padding-left: 4upx;
							font-size: 22upx;
							color: #A2A2A2;
							margin-bottom: 2px;
							display: block;
						}
					}
				}
			}
		}
	}
	.nomore{
		padding: 20upx;
		text-align: center;
	}
</style>
