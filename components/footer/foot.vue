<template>
	<view>
		<view class="footer">
			<view class="footer_item" @click="change_nav(index,item.name)" v-for="(item,index) in footerNav" v-bind:key="index">
				<image :src="index==now_index?item.select_icon:item.icon" mode="" class="tabnav-icon"></image>
				<view :class="index==now_index?'default_txt':''">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			footerNav:{
				type:Array,
				default:()=>[{
								name:'首页',
								url:'/pages/index/index',
								icon:'/static/images/tabBar/navBox_home_def.png',
								select_icon:'/static/images/tabBar/navBox_home.png'
							},
							{
								name:'分类',
								url:'/pages/classes/index',
								icon:'/static/images/tabBar/navBox_classes_def.png',
								select_icon:'/static/images/tabBar/navBox_classes.png'
							},
							{
								name:'购物车',
								url:'/pages/carts/index',
								icon:'/static/images/tabBar/navBox_carts_def.png',
								select_icon:'/static/images/tabBar/navBox_carts.png'
							},
							{
								name:'我的',
								url:'/pages/profile/index',
								icon:'/static/images/tabBar/navBox_profile_def.png',
								select_icon:'/static/images/tabBar/navBox_profile.png'
							},]
			}
		},
		data() {
			return {
			};
		},
		methods:{
			change_nav(index,menu){
// 				if(menu=="购物车"){
// 					if(this.$store.state.hasLogin){
// 						this.$store.commit("change_page",index);
// 						uni.navigateTo({
// 							url:this.$store.state.footer_nav.url
// 						})
// 					}else{
// 						/* 如果用户没有登录  跳转到登录页面 */
// 						uni.navigateTo({
// 							url:"/pages/login/loginbypwd"
// 						})
// 					}
// 				}else{
					this.$store.commit("change_page",index);
					this.indoorbuy.jumpPage(this.$store.state.footer_nav.url)
				// }
				
			}
		},
		computed:{
			now_index(){
				return this.$store.state.footer_nav.now_page_index;
			},
			now_url(){
				return this.$store.state.footer_nav.url;
			}
		}
	}
</script>

<style>
	.footer{
		height: 120upx;
		position: fixed;
		bottom: -2upx;
		left: 0;
		width: 100%;
		background-color: #fff;
		border-top: 1px solid #F1F1F5;
	}
	.footer_item{
		float: left;
		width: 25%;
		text-align: center;
		font-size: 28upx;
		height: 120upx;
	 
	}
	.footer_item image{
		width: 50upx;
		height: 46upx;
		margin-top: 14upx;
		margin-bottom: -16upx;
	}
</style>
