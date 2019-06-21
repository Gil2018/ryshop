<template>
	<view class="uni-tab-bar">
	    <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
	        <view v-for="(tab,index) in tabs" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
	            :id="tab.id" :data-current="index" @tap="tapTab">{{tab.name}}</view>
	    </scroll-view>
	    <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1_bar) in newsitem" :key="index1_bar">
			    <scroll-view class="list" scroll-y @scrolltolower="loadMore(index1_bar)">
			        <block v-for="(item,index2_bar) in tab.data" :key="index2_bar">
			            <view class="pro" v-if="dataType=='pro'">
							<view class="pro_info uni-flex">
								<view class="pro_img">
									<image :src="item.img"></image>
								</view>
								<view class="pro_desc">
									<view class="pro_title">{{item.title}}</view>
									<view class="taps uni-flex">
										<view class="tap uni-selected-tap default_btn">新品指数{{item.index}}</view>
										<view v-for="tapItem in item.tap">
											<view class="tap uni-bor-tap">{{tapItem.tapName}}</view>
										</view>
									</view>
									<view class="price uni-flex">
										<text>售价：{{item.price}}</text>
										<text>会员价：{{item.memberPrice}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="brand" v-if="dataType=='brand'">
							<view class="brand_info uni-flex">
								<view class="brand_img">
									<image :src="item.img"></image>
								</view>
								<view class="brand_desc">
									<view class="brand_title">{{item.title}}</view>
									<view class="taps uni-flex">
										<view class="tap uni-selected-tap">品牌指数{{item.index}}</view>
										<view v-for="tapItem in item.tap">
											<view class="tap uni-bor-tap">{{tapItem.tapName}}</view>
										</view>
									</view>
								</view>
								<view class="more">
									<button>进入品牌</button>
								</view>
							</view>
						</view>
			        </block>
					<view class="uni-tab-bar-loading">
						<uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
			    </scroll-view>
			</swiper-item>
	    </swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		props:{
			newsitem:{
				type:Array,
				default:() => []
			},
			tabs:{
				type:Array,
				default:() => []
			},
			dataType:{
				type:String,
				default:"pro"
			}
		},
        components: {
			uniLoadMore
        },
        data() {
            return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
                scrollLeft: 0,
                isClickChange: false,
                tabIndex: 0,
            }
        },
        methods: {
            goDetail(e) {
                uni.navigateTo({
                    url: '/pages/template/tabbar/detail/detail?data=' + e.title
                })
            },
            loadMore(e) {
				this.newsitems[e].loadingType = 1;
            	setTimeout(() => {
            		this.addData(e);
            	}, 1200);
            },
            async changeTab(e) {
                let index = e.target.current;
                if (this.isClickChange) {
                    this.tabIndex = index;
                    this.isClickChange = false;
                    return;
                }
                let tabBar = await this.getElSize("tab-bar"),
                    tabBarScrollLeft = tabBar.scrollLeft;
                let width = 0;

                for (let i = 0; i < index; i++) {
                    let result = await this.getElSize(this.tabBars[i].id);
                    width += result.width;
                }
                let winWidth = uni.getSystemInfoSync().windowWidth,
                    nowElement = await this.getElSize(this.tabBars[index].id),
                    nowWidth = nowElement.width;
                if (width + nowWidth - tabBarScrollLeft > winWidth) {
                    this.scrollLeft = width + nowWidth - winWidth;
                }
                if (width < tabBarScrollLeft) {
                    this.scrollLeft = width;
                }
                this.isClickChange = false;
                this.tabIndex = index; //一旦访问data就会出问题
            },
            getElSize(id) { //得到元素的size
                return new Promise((res, rej) => {
                    uni.createSelectorQuery().select("#" + id).fields({
                        size: true,
                        scrollOffset: true
                    }, (data) => {
                        res(data);
                    }).exec();
                })
            },
            async tapTab(e) { //点击tab-bar
                if (this.tabIndex === e.target.dataset.current) {
                    return false;
                } else {
                    let tabBar = await this.getElSize("tab-bar"),
                        tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
                    this.scrollLeft = tabBarScrollLeft;
                    this.isClickChange = true;
                    this.tabIndex = e.target.dataset.current
                }
            }
        }
    }
</script>
<style lang="less">
	uni-page-body{
		width: 100%;
		height: 100%;
	}
	.content{
		width: 100%;
		height: 100% !important;
		.swiper-box{
			height: 740upx;
		}
	}
	.pro-list{
		color: #333;
	}
	.list{
		width: 100%;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
		background-color: #fff;
	}
	.pro{
		padding: 16upx;
		border-bottom: 1px solid #eee;
		.pro_img{
			min-width: 200upx;
			max-width: 200upx;
			height: 200upx;
			overflow: hidden;
			margin-right: 14upx;
			image{
				width: 100%;
				height: 100%;
				background-color: #ccc;
			}
		}
		.taps{
			.tap{
				padding: 0 12upx;
				border-radius: 40upx;
				margin: 8upx;
				font-size: 24upx;
			}
			.uni-bor-tap{
				border:1px solid #EC4E84;
				color:#EC4E84;
			}
		}
	}
</style>
