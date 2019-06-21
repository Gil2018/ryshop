export default {
	state:{
		footer_nav:[
			{
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
			},
			
		],
		now_page_index:0,
		url:""
	},
	mutations:{
		change_page(state,index){
			state.now_page_index = index;
			state.url=state.footer_nav[index].url;
		},
		change_index(url){
			console.log(url)
			switch(url){
				case "/pages/index/index":
					state.now_page_index = 0;
				break;
				case "/pages/classes/index":
					state.now_page_index = 1;
				break;
				case "/pages/carts/index":
					state.now_page_index = 2;
				break;
				case "/pages/profile/index":
					state.now_page_index = 3;
				break;
			}
		}
	}
}