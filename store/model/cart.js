export default {
	state:{
		//是否有地址
		hasAddr:false,
		//是否实名认证
		hasRealname:false,
		//是否是默认地址
		isDefault_addr:false,
		//默认地址数据
		default_addr:{},
		//我的地址数据列表
		add_list:[],
		orderPro:[],
		//合计数目
		count:0,
		//合计金额
		totalamount:0,
		//可编辑状态
		isEdit:false,
		curAddr:{}
	},
	mutations:{
		addorder(state,datas){
			/* 获取订单中的商品数据 */
			uni.setStorage({
				key:"order_pro",
				data:datas,
				success(res) {
					state.orderPro=res.data;
				}
			})
		},
		getCount(state,datas){
			/* 获取总计数目 */
			state.count=0;
			uni.getStorage({
				key:'order_pro',
				success(res) {
					state.orderPro=res.data;
				}
			})
			state.orderPro.map((item)=>{
				state.count+=item.quantity;
				uni.setStorage({
					key:'count',
					data:state.count
				})
			})
		},
		getTotalamount(state,datas){
			/* 获取总计金额 */
			state.totalamount=0;
			uni.getStorage({
				key:'order_pro',
				success(res) {
					state.orderPro=res.data;
				}
			})
			state.orderPro.map((item)=>{
				state.totalamount+=item.quantity*item.price;
				uni.setStorage({
					key:'count',
					data:state.totalamount
				})
			})
		},
		changeEdit(state){
			/* 改变可编辑状态 */
			state.isEdit=!state.isEdit;
		},
		getAddList(state,datas){
			/* 获取地址信息列表 */
		},
		getAddr(state){
			uni.getStorage({
				key:'cur_addr',
				success(res) {
					state.curAddr=res.data;
				}
			})
		},
		removeAddr(state){
			uni.removeStorageSync('cur_addr');
			state.curAddr={};
		}
	}
}