<template>
	<view class="uni-navbar" :class="{'uni-navbar-fixed':isFixed,'uni-navbar-shadow':hasShadow}" :style="{'background-color':backgroundColor}">
		<uni-status-bar v-if="insertStatusBar"></uni-status-bar>
		<view class="uni-navbar-header" :style="{color:color}">
			<view class="uni-navbar-header-btns" @click="onClickLeft" v-if="leftIcon!==''">
				<image class="uni-icon" :id='leftIcon.name' :src="leftIcon.img"></image>
				<view v-if="leftText.length" class="uni-navbar-btn-text" :class="{'uni-navbar-btn-icon-left':!leftIcon.length}">{{leftText}}</view>
				<slot name="left"></slot>
			</view>
			<view class="uni-navbar-container">
				<view v-if="title.length" class="uni-navbar-container-title">{{title}}</view>
				<!-- 标题插槽 -->
				<slot></slot>
			</view>
			<view class="uni-navbar-header-btns" @click="onClickRight" v-if="rightIcon!==''" :id="rightType" :style="rightIcon.length==0?'margin-top:24upx':''">
				<view v-for="(ri_item,ri_index) in rightIcon" v-bind:key="ri_index">
					<image class="uni-icon" :src="ri_item.img" :id="ri_item.name"></image>
				</view>
                <!-- 优先显示图标 -->
                <view v-if="rightText.length" class="uni-navbar-btn-text" >{{rightText}}</view>
                <slot name="right"></slot>
            </view>
		</view>
	</view>
</template>

<script>
    import uniStatusBar from '../uni-status-bar/uni-status-bar.vue'

    export default {
        components: {
            uniStatusBar,
        },
        props: {
            /**
             * 标题文字
             */
            title: {
                type: String,
                default: ''
            },
            /**
             * 左侧按钮文本
             */
            leftText: {
                type: String,
                default: '扫一扫'
            },
            /**
             * 右侧按钮文本
             */
            rightText: {
                type: String,
                default: '消息'
            },
            /**
             * 左侧按钮图标
             */
            leftIcon: {
                type: Object,
                default() {
					return {
						img:'../../static/images/icon/icon-scan.png',
						name:'scan'
					}
					
				}
            },
			iconType:{
				type:String,
				default:'scan'
			},
            /**
             * 右侧按钮图标
             */
            rightIcon: {
                type:Array,
                default: ()=>[
					{
						img:'../../static/images/icon/icon-mess.png',
						name:'mess'
					},
				]
            },
			rightType:{
				type:String,
				default:''
			},
            /**
             * 是否固定在顶部
             */
            fixed: {
                type: [Boolean, String],
                default: false
            },
            /**
             * 按钮图标和文字颜色
             */
            color: {
                type: String,
                default: '#000000'
            },
            /**
             * 背景颜色
             */
            backgroundColor: {
                type: String,
                default: '#FFFFFF'
            },
            /**
             * 是否包含状态栏，默认固定在顶部时包含
             */
            statusBar: {
                type: [Boolean, String],
                default: ''
            },
            /**
             * 是否使用阴影，默认根据背景色判断
             */
            shadow: {
                type: String,
                default: ''
            },
        },
        computed: {
            isFixed() {
                return String(this.fixed) === 'true'
            },
            insertStatusBar() {
                switch (String(this.statusBar)) {
                    case 'true':
                        return true
                    case 'false':
                        return false
                    default:
                        return this.isFixed
                }
            },
            hasShadow() {
                var backgroundColor = this.backgroundColor
                switch (String(this.shadow)) {
                    case 'true':
                        return true
                    case 'false':
                        return false
                    default:
                        return backgroundColor !== 'transparent' && backgroundColor.indexOf('rgba') < 0
                }
            }
        },
        methods: {
            /**
             * 左侧按钮点击事件
             */
            onClickLeft(e) {
				var that = this;
				var iconType=e.target.id;
				switch(e.target.id){
					case "scan":
						/* 扫码操作 */
						//#ifdef H5
							uni.showToast({title: '仅支持APP扫码',icon:'none',duration: 2000});
						//#endif
						//#ifdef APP-PLUS
						uni.scanCode({
							scanType:['qrCode','barCode'],
							success:function(res){
								let result = res.result;
								if(res.scanType=='QR_CODE'){
									// 二维码
								}else{
									that.indoorbuy.goPage('/pages/index/searchResult?code='+result);
								}
							},
							fail:function(){
								uni.showToast({title: '扫码失败，请重试！',icon:'none',duration: 2000});
							}
						})
						//#endif
					break;
					case "set":
						/* 进入设置页面 */
						this.indoorbuy.goPage('/pages/sets/index');
					break;
				}
            },
            /**
             * 右侧按钮点击事件
             */
            onClickRight(e) {
				/* 跳转到相应的页面 */
				switch(e.target.id){
					case "mess":
						/* 我的消息页面 */
						this.indoorbuy.goPage("/pages/profile/informations/message")
					break;
					case "set":
						/* 设置页面 */
						this.indoorbuy.goPage("/pages/sets/index")
					break;
				}
				switch(e.currentTarget.id){
					case "cartMann":
						/* 购物车管理 */
						if(document.querySelector('.uni-navbar-btn-text').innerHTML=='管理'){
							document.querySelector('.uni-navbar-btn-text').innerHTML='完成';
						}else{
							document.querySelector('.uni-navbar-btn-text').innerHTML='管理';
						}
						this.$store.commit('changeEdit');
					break;
				}
            }
        }
    }
</script>

<style>
    .uni-navbar {
        display: block;
        position: relative;
        width: 100%;
		background-color: rgba(250,250,250,0.1);
        overflow: hidden;
    }
	
	.uni-navbar view{
		line-height:normal;
	}

    .uni-navbar-shadow {
        box-shadow: 0 1px 6px #ccc;
    }

    .uni-navbar.uni-navbar-fixed {
        position: fixed;
        z-index: 998;
    }

    .uni-navbar-header {
        display: flex;
        flex-direction: row;
        width: 100%;
        height:44px;
        line-height:44px;
        font-size: 16px;
		align-items: center;
    }
	
	.uni-navbar-header .uni-navbar-header-btns{
		width: 104upx;
		padding:0 12upx;
		text-align: center;
	}
	.uni-navbar-container{
		width:100%;
		margin:0 10upx;
	}
	.uni-navbar-container-title{
		font-size:30upx;
		text-align:center;
	}
	.uni-icon{
		width: 32upx;
		height: 32upx;
	}
	.uni-navbar-btn-text{
		display: block;
		/* height: 50upx; */
		/* line-height: 50upx !important; */
		line-height: normal !important;
		/* margin-top: -30upx; */
		margin-top: 0upx;
		font-size: 24upx;
	}
	.icon-search::before{
		line-height: 30px;
	}
</style>
