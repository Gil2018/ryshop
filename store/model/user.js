export default{
	state:{
		datas:{}
	},
	mutations:{
		getAccount(state,dateForm){
			uni.setStorage({
				key:'user',
				data:dateForm,
				success() {
					/* 缓存用户信息成功 */
					state.datas=dateForm;
				}
			})
		},
		clearAccount(state){
			
		}
	}
}