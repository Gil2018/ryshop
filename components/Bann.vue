<template>
	<view>
		<view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="swiper"
						   v-bind:style="{'height':curHeight}"
						   :indicator-dots="indicatorDots"
						   :indicator-active-color="defaultColor"
						   :autoplay="autoplay" 
						   :interval="interval" 
						   :duration="duration"
						   @change="changeImg($event)"
							 >
                        <swiper-item v-for="(banner_iten,banner_index) in Datas" v-bind:key="banner_index">
                            <view class="swiper-item" @click="goNavForBanner(banner_iten)">
								<image :src="banner_iten.img_url"></image>
							</view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
			<view class="dots-num" v-if="indicatorDots==false">
				{{curIndex}}/{{Datas.length}}
			</view>
        </view>
		
	</view>
</template>

<script>
	export default {
		props:{
			indicatorDots:{
				type:Boolean,
				default:true
			},
			/* 默认的选中颜色 */
			defaultColor:{
				type:String,
				default:'#000'
			},
			/* 是否自动播放 */
			autoplay:{
				type:Boolean,
				default:true
			},
			interval:{
				type:Number,
				default:2000
			},
			duration:{
				type:Number,
				default:500
			},
			Datas:{
				type:Array,
				default:()=>[]
			},
			curHeight:{
				type:String,
				default:'150px'
			}
		},
		data(){
			return {
				curIndex:1
			}
		},
		methods:{
			changeImg(e){
				this.curIndex=0;
				this.curIndex=e.detail.current+1;
			},
			goNavForBanner:function(data){
				var indoorbuy = this.indoorbuy;
				indoorbuy.api_common.goNavForBanner(data);
			}
		}
	}
</script>

<style>
	.swiper-item image{
		width: 100% !important;
	}
	.uni-padding-wrap{
		position: relative;
	}
	.dots-num{
		padding: 2upx 24upx;
		background-color: rgba(0,0,0,.5);
		color: #fff;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
		border-radius: 40upx;
	}
</style>
