<!-- glance 店铺购物车单页模板 -->
<template name="glanceShopcart">
	<view>
	<view v-if="cart.length == 0" class="uni-no-pro" >
		<view class="uni-no-pro-image">
			<image src="../../static/images/carts/anything.png"></image>
		</view>
		<view>购物车里还没有商品哦~</view>
		<button class="uni-large-btn">去逛逛</button>
	</view>
	<view class="content" >
	<scroll-view class="glance-shop-cart " v-if="cart.length !== 0">
		<!-- 营销活动：全场加价购、满减折上折、优惠券等等 -->
		<!-- 购物车商品 -->
		<view v-for="(thiscart,index) in cart" :key="index" style="background-color: #FFFFFF;" >
			<!-- 营销标签 加购 换购或其他 -->
			<view class="pro-tips" v-if="thiscart.groupkey!==''">
				<!-- <view style="height: 100%;background-color: #FFFFFF;">
					<view class="glance-shop-cart-scrollx-items-item-sel glance-shop-cart-itemselected-img" :gId="thiscart.groupId"  @click="grounpitemselected(thiscart.groupId)"></view>
				</view> -->
				<view class="avtive-name">
					<button class="default_btn">{{ thiscart.groupType }}</button>
				</view>
				<view class="active-desc">{{ thiscart.groupkey }}</view>
				<text style="float: right;right: 16upx;">去凑单<i class="iconfont">&#xe8f1;</i></text>
			</view>
			<!-- 按营销活动分组的商品 -->
			<view v-for="(item,i) in thiscart.items" :key="i">
				<scroll-view scroll-x= "true" scroll-left="0" scroll-with-animation="true" v-if="item.id > -99">
					<view class="glance-shop-cart-scrollx-items">
					<view class="glance-shop-cart-scrollx-items-item">
						<!-- 勾选 -->
						<view style="width: 10%;height: 100%;background-color: #FFFFFF;">
							<!-- 勾选 -->
							<view class="glance-shop-cart-scrollx-items-item-sel" :gId="thiscart.groupId" :id="item.id" :count="item.quantity" :price="item.price" :class="[ item.id > 0 ? 'glance-shop-cart-itemselected-img':'glance-shop-cart-itemunselected-img']" @click="clickitemselected(item.id)"></view>
						</view>
						<!-- 图片 -->
						<view style="width: 30%;height: 100%;text-align:center;">
							<image :src="item.img" mode="scaleToFill" class="proImg" @click="clickitemhref(item.href)"></image>
						</view>
						<!-- 描述 -->
						<view class="glance-shop-cart-items-item-des">
							<!-- 名称 -->
							<view class="sigle-line-text" style="font-size: 16px;height: 30px;text-align: left;" @click="clickitemhref(item.href)">{{ item.name }}</view>
							<!-- 属性 -->
							<view class="sigle-line-text attributes" @click="clickitemhref(item.href)">{{ item.attributes }}<i class="iconfont" style="font-size: 12px;margin-left:5px">&#xe60f;</i></view>
							<!-- 价格 & 数量-->
							<view class="glance-shop-cart-items-item-pq">
								<view class="sigle-line-text proPrice">￥{{item.price}}</view>
								<!-- 数量操作 -->
								<view class="glance-shop-cart-items-item-opt">
									<!-- 减数量 -->
									<view class="glance-shop-cart-items-item-opt-quantity-minus" @click="minusitem(item.id)">-</view>
									<!-- 数量 -->
									<view class="glance-shop-cart-items-item-opt-quantity">{{ item.quantity }}</view>
									<!-- 加数量 -->
									<view class="glance-shop-cart-items-item-opt-quantity-plus" @click="plusitem(item.id)">+</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 移除 -->
					<view class="moveBtn">
						移入收藏夹
					</view>
					<!-- 删除 -->
					<view class="delBtn" @click="clickdel(item.id)">
						删除
					</view>
					</view>
				</scroll-view>
			</view>
			<view style="height: 10px;background-color: #F5F5F5;"></view>
		</view>
	</scroll-view>
	<view style="height: 10px;background-color: #F5F5F5;"></view>
	<!-- 金额合计 -->
	<view class="glance-shop-cart-order" ref='cart-order' v-if="isEdit==false&&cntitems!==0">
		<view class="cart-order-left uni-flex">
			<view style="width: 10%;height: 100%;background-color: #FFFFFF;">
				<!-- 勾选 -->
				<view class="glance-shop-cart-scrollx-items-item-sel" :class="[ selectedAll ? 'glance-shop-cart-itemselected-img':'glance-shop-cart-itemunselected-img']"  @click="allitemselected"></view>
			</view>
			<text>全选</text>
			<!-- 总金额 -->
			<view class="glance-shop-cart-total-amt">
				<p>总计（不含税）：{{ totalamount }}</p>
				<p class="info"><span>已减0元，不含运费</span> <span>税费：¥0.00</span></p>
			</view>
		</view>
		<!-- 立即下单 -->
		<view class="glance-shop-cart-create-order" @click="createorder">结算</view>
	</view>
	<view class="glance-shop-cart-order" ref='cart-order' v-if="isEdit">
		<view class="cart-order-left uni-flex" style="width: 52%;padding-left: 16upx;">
			<view style="width: 10%;height: 100%;background-color: #FFFFFF;">
				<!-- 勾选 -->
				<view class="glance-shop-cart-scrollx-items-item-sel" :class="[ selectedAll ? 'glance-shop-cart-itemselected-img':'glance-shop-cart-itemunselected-img']" @click="allitemselected"></view>
			</view>
			<text style="margin-left: 16upx;">全选</text>
		</view>
		<text class="mini-moveBtn">移入收藏夹</text>
		<text class="mini-delBtn" @tap="delgroup">删除</text>
	</view>
	</view>
	</view>
</template>

<script>
	export default {
		props:{
			//编辑所选商品
			isEdit:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				page:1,
				limit:10,
				// 从服务端获取
				cart:[],
				// 订单商品 购物车里已选择的商品生成订单
				ordercart:[],
				// 购买更多
				buymore:[],
				// 为您推荐的商品
				itemrecommend:[],
				// 合计金额
				totalamount:0,
				// 购物车商品数量 用于空购物车背景
				cntitems:0,
				// 选中的数据
				orderList:[],
				selectedAll:true
			};
		},
		mounted() {
		},
		created:function() {
			// 从缓存或服务端获取到购物车商品 这里示例数据如下：
			/* 获取购物车数据 */
// 			this.indoorbuy.api_common.getAPI('/cart',{page:this.page,limit:this.limit}),function(res){
// 				if(res.status==200){
// 					this.cart=res.data;
// 					this.cntitems=res.data.length;
// 				}else if(res.status==1001){
// 					/* 未登录 */
// 					uni.setStorageSync('hasLogin',false);
// 				}
// 			})
			let objcart = [
							{
								groupId:'g01',
								'groupkey':'购满199立减10元',
								'groupType':'满立减',
								'items':[
									{
										'id':1,
										'name':'网易智造苹果快充数据线网易智造苹果快充数据线',
										'imgsrc':'../../static/logo.png',
										'href':'点击了商品请跳转至商品详情页',
										'attributes':'夜黑1米',
										'quantity':5,
										'price':1,
									},
									{
										'id':2,
										'name':'网易智造苹果快充数据线网易智造苹果快充数据线',
										'imgsrc':'../../static/logo.png',
										'href':'点击了商品请跳转至商品详情页',
										'attributes':'酒红色5米',
										'quantity':8,
										'price':1,
									},
									{
										'id':6,
										'name':'网易智造苹果快充数据线网易智造苹果快充数据线',
										'imgsrc':'../../static/logo.png',
										'href':'点击了商品请跳转至商品详情页',
										'attributes':'酒红色5米',
										'quantity':8,
										'price':1,
									},
									{
										'id':7,
										'name':'网易智造苹果快充数据线网易智造苹果快充数据线',
										'imgsrc':'../../static/logo.png',
										'href':'点击了商品请跳转至商品详情页',
										'attributes':'酒红色5米',
										'quantity':8,
										'price':1,
									},
								],
							},
							{
								'gId':'g02',
								'groupkey':'',
								'groupType':'',
								'items':[
									{
										'id':3,
										'name':'网易智造苹果快充数据线网易智造苹果快充数据线',
										'imgsrc':'../../static/logo.png',
										'href':'点击了商品请跳转至商品详情页',
										'attributes':'金属色1米',
										'quantity':3,
										'price':1,
										'marketinglabel':'',
									},
									{
										'id':4,
										'name':'网易智造苹果快充数据线网易智造苹果快充数据线',
										'imgsrc':'../../static/logo.png',
										'href':'点击了商品请跳转至商品详情页',
										'attributes':'珠光白1.5米',
										'quantity':9,
										'price':1,
									},
								],
							},
						];
			this.cart=objcart;
			this.cntitems=objcart.length;
			//默认勾选购物车所有商品 合计金额 合计数量
			for (let i = 0; i < this.cart.length; i++) {
				for (let k = 0; k < this.cart[i].items.length; k++) {
					// 总金额 
					this.totalamount = this.totalamount + this.cart[i].items[k].price * this.cart[i].items[k].quantity
					// 总数量
					this.cntitems = this.cntitems + this.cart[i].items[k].quantity
				}
			}
			this.totalamount = this.fmamount(this.totalamount)
		},
		computed:{
			
		},
		// 关闭购物车前 存入缓存
		beforeDestroy:function(){	
		},
		methods:{
			// 点击勾选
			clickitemselected(id){
				if (this.cart){
					for (var i = 0; i < this.cart.length; i++) {
						for (let k = 0; k < this.cart[i].items.length; k++) {
							if (this.cart[i].items[k].id == id){
								this.cart[i].items[k].id = - this.cart[i].items[k].id
								// 累计总金额和总数量 勾选时加
								if (this.isselected(this.cart[i].items[k].id)){
									// 更新总数量
									this.cntitems = this.cntitems + this.cart[i].items[k].quantity
									// 更新总金额
									this.totalamount = this.totalamount + this.cart[i].items[k].price * this.cart[i].items[k].quantity
									this.totalamount = this.fmamount(this.totalamount)
								}else{
									// 取消勾选时减
									// 更新总数量
									this.cntitems = this.cntitems - this.cart[i].items[k].quantity
									// 更新总金额
									this.totalamount = this.totalamount - this.cart[i].items[k].price * this.cart[i].items[k].quantity
									this.totalamount = this.fmamount(this.totalamount)
								}
								
								return
							}
						}
					}
				}
			},
			// 点击删除
			clickdel(itemid){
				for (let i = 0; i < this.cart.length; i++) {
					for (let k = 0; k < this.cart[i].items.length; k++) {
						if (this.cart[i].items[k].id == itemid){
							// 勾选状态下更新数量和金额
							if (this.isselected(this.cart[i].items[k].id)){
								// 更新总数量
								this.cntitems = this.cntitems - this.cart[i].items[k].quantity
								// 更新总金额
								this.totalamount = this.totalamount - this.cart[i].items[k].price * this.cart[i].items[k].quantity
								this.totalamount = this.fmamount(this.totalamount)
								// 删除商品
								this.cart[i].items[k].id = -99 - itemid
							}else{
								// 未勾选时 删除商品 列表中不再显示 id= -99-原始id
								this.cart[i].items[k].id = -99 + itemid
							}
							return
						}
					}
				}
				// 删除购物车商品时 更新合计金额
				
			},
			//多项删除
			delgroup(){
				for (let i = 0; i < this.cart.length; i++) {
					for (let k = 0; k < this.cart[i].items.length; k++) {
						// item id 大于0 的是勾选的
						if (this.cart[i].items[k].id > 0){
							//这里的item 是下单的
							/* 将下单列表存入缓存中 */
							this.orderList.push(this.cart[i].items[k]);
						}
					}
				}
				for (var j=0;j<this.orderList.length;j++) {
					// 更新总数量
					this.cntitems = this.cntitems - this.orderList[j].quantity
					// 更新总金额
					this.totalamount = this.totalamount - this.orderList[j].price * this.orderList[j].quantity
					this.totalamount = this.fmamount(this.totalamount)
					// 删除商品
					this.orderList[j].id = -99 - this.orderList[j].id
				}
			},
			// 减数量
			minusitem(itemid){
				for (let i = 0; i < this.cart.length; i++) {
					for (let k = 0; k < this.cart[i].items.length; k++) {
						if ((this.cart[i].items[k].id == itemid) && (this.cart[i].items[k].quantity > 0)) {
							// 更新item数量
							this.cart[i].items[k].quantity = this.cart[i].items[k].quantity - 1
							// 勾选状态下更新数量和金额
							if (this.isselected(this.cart[i].items[k].id)){
								// 更新总数量
								this.updatecntitems(-1)
								// 更新总金额
								this.updatetotalamt(-this.cart[i].items[k].price)
							}
							// 数量减为0时 不勾选
							if (this.cart[i].items[k].quantity == 0){
								this.cart[i].items[k].id = this._unselected(this.cart[i].items[k].id)
							}
							return
						}
					}
				}
			},
			// 加数量
			plusitem(itemid){
				for (let i = 0; i < this.cart.length; i++) {
					for (let k = 0; k < this.cart[i].items.length; k++) {
						// 这里需要进行超卖控制 商品可售卖的数量 这里面示例可售卖100
						if ((this.cart[i].items[k].id == itemid) && (this.cart[i].items[k].quantity < 100)){
							// 更新item数量
							this.cart[i].items[k].quantity = this.cart[i].items[k].quantity +1
							// 加数量时未勾选则 勾选
							if (this.cart[i].items[k].id < 0){
								this.cart[i].items[k].id = this._selected(this.cart[i].items[k].id)
							}
							// 勾选状态下更新数量和金额
							if (this.isselected(this.cart[i].items[k].id)){
								// 更新总数量
								this.updatecntitems(1)
								// 更新总金额
								this.updatetotalamt(this.cart[i].items[k].price)
							}
							return
						}
					}
				}
			},
			/* 分组全选 */
			grounpitemselected(gId){
			},
			/* 全选 */
			allitemselected(){
				this.cart.map(item=>{
					item.items.map(cartitem=>{
						cartitem.id=-cartitem.id;
						if (this.isselected(cartitem.id)){
							// 更新总数量
							this.cntitems = this.cntitems + cartitem.quantity
 							this.selectedAll=true;
							// 更新总金额
							this.totalamount = this.totalamount + cartitem.price * cartitem.quantity
							this.totalamount = this.fmamount(this.totalamount)
						}else{
							// 取消勾选时减
							// 更新总数量
							this.cntitems = this.cntitems - cartitem.quantity
 							this.selectedAll=false;
							// 更新总金额
							this.totalamount = this.totalamount - cartitem.price * cartitem.quantity
							this.totalamount = this.fmamount(this.totalamount)
						}
						
						return
					})
				})
			},
			// 点击商品href
			clickitemhref(str){
				uni.showModal({
					content: '点击了商品链接' + str
				})
			},
			// 点击了营销活动
			clickgroupkey(str){
				let mehref = this.getgroupkeyhref(str)
				uni.showModal({
					content:'点击了营销活动'+ mehref
				})
			},
			// 更新合计金额
			updatetotalamt(amt){
				this.totalamount = this.totalamount + amt
				this.totalamount = this.fmamount(this.totalamount)
				
			},
			// 更新合计数量
			updatecntitems(cnt){
				this.cntitems = this.cntitems + 1
			},
			// 格式化金额
			fmamount(amt){
				return Math.round(amt*100)/100
			},
			// 不勾选
			_unselected(id){
				return - Math.abs(id)
			},
			// 勾选
			_selected(id){
				return Math.abs(id)
			},
			// 是否勾选
			isselected(id){
				return id > 0
			},
			// 获取营销页面链接
			getgroupkeyhref(str){
				// 这里通过营销活动名称 获取营销活动页面 需要自己实现
				return '营销活动页面'
			},
			// 生成订单
			createorder(){
				// 合计金额大于0 创建订单
				if (this.totalamount == 0){
					uni.showModal({
						content: '请选择下单的商品！'
					})
				}else{
					// 1、处理购物车内已选择的订单生成商品
					for (let i = 0; i < this.cart.length; i++) {
						for (let k = 0; k < this.cart[i].items.length; k++) {
							// item id 大于0 的是勾选的
							if (this.cart[i].items[k].id > 0){
								//这里的item 是下单的
								/* 将下单列表存入缓存中 */
								this.orderList.push(this.cart[i].items[k]);
								//this.$store.commit("addorder",this.orderList);
								uni.setStorage({
									key:"order_pro",
									data:this.orderList,
									success(res) {
										
									}
								})
							}
						}
					}
					// 2、生成订单成功后 删除购物车内已生成订单的商品
					this.indoorbuy.goPage('makeOrder')
				}
			}
		}
	}
</script>

<style lang="scss">
	// 单行文本样式
	.sigle-line-text{width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: left;padding-left: 5px;}
	.glance-shop-cart{
		background-color: #F5F5F5;
		margin-bottom: 220upx !important;
	}
	// 顶部营销活动
	.pro-tips{
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		font-size: 30upx;
		display: flex;
		align-items: center; 
		justify-content: space-between;
		color: #A2A2A2;
		.default_btn{
			background-color: #E17669 !important;
			border-radius: 4upx !important;
		}
	}
	// 滑动item 样式
	.glance-shop-cart-scrollx-items{
		width: 130%;height: 190upx;
		display: flex; flex-flow: row nowrap;align-items: center;justify-content: space-between;
		padding: 16upx 0 16upx 0;
		}
	
	// 滑动区域内item 样式
	.glance-shop-cart-scrollx-items-item{
		display: flex; display: -webkit-flex;flex-flow: row nowrap;align-items: flex-start;justify-content: flex-start;
		width: 77%;height: 100%;
		}
	
	// item 勾选样式
	.glance-shop-cart-scrollx-items-item-sel{
		position: relative; 
		top:25%; transform:translateY(-50%);left:50%;transform:translateX(-50%);
		}
	
	// item 描述信息样式
	.glance-shop-cart-items-item-des{
		width: 60%;height: 100%;
		display: -webkit-flex;	flex-flow: column nowrap;align-items: flex-start ;justify-content: flex-start;
		}
	
	// 价格和数量样式
	.glance-shop-cart-items-item-pq{
		width: 100%;height: 33.33%;
		display: flex;display: -webkit-flex;flex-flow: row nowrap;align-items: flex-start ;justify-content: space-between;
		}
	
	// 数量操作
	.glance-shop-cart-items-item-opt{
		display: flex;display: -webkit-flex;flex-flow: row nowrap;align-items: center;justify-content: space-between;
		width: auto;height: 100%; font-size: 20px;margin-right: 10px;text-align: center;
		color: #6C6C6C;line-height: 100%;
		// 减数量
		&-quantity-minus{
			border-style: solid; border-width: 1px 0px 1px 1px; border-color: #E0E0E0;
			width: 40upx;height: 40upx;
			line-height: 40upx;
			position: relative; top:25%; transform:translateY(-50%)
			}
			// 数量
		&-quantity{
			border-style: solid; border-width: 1px 1px 1px 1px; border-color: #E0E0E0;
			width: 60upx;height:40upx;line-height: 40upx;font-size: 13px; 
			position: relative; top:25%; transform:translateY(-50%);
			}
			// 加数量
		&-quantity-plus{
			border-style: solid; border-width: 1px 1px 1px 0; border-color: #E0E0E0;
			width: 40upx;height: 40upx;line-height: 40upx;
			position: relative; top:25%; transform:translateY(-50%);
			}
		}
	
	// 底部汇总和订单样式
	.glance-shop-cart-order{
		width: 100%;height: 120upx;background-color: #ffffff;
		display: flex;display: -webkit-flex;flex-flow: row nowrap;align-items: center;justify-content: space-between;
		position: fixed;
		bottom: 0px;
		margin-bottom: 118upx;
		border-bottom: 1px solid #F1F1F5;
		.mini-delBtn,.mini-moveBtn{
			background-color: #D04C3C;
			border-radius: 36upx;
			color: #fff;
			padding: 0 16upx;
			margin-right: 16upx;
		}
		.mini-moveBtn{
			background-color: #E4B91C;
		}
	}
	
	// 合计金额样式
	.glance-shop-cart-total-amt{
		width:73%;
		text-align: right;
		line-height:50upx;
		font-size: 28upx;
		margin-left: 10px;
		.info{
			font-size: 24upx;
			color: #A2A2A2;
		}
	}
	
	// 生成订单样式
	.glance-shop-cart-create-order{
		    min-width: 200upx;
			background-color: #2C2D2F;
			text-align: center;
			height: 100%;
			line-height: 120upx;
			font-size: 36upx;
			color: #ffffff;
		}
	.cart-order-left{
		width: 100%;
		height: 100%;
		align-items: center;
		padding-left: 4px;
		.glance-shop-cart-itemselected-img{
			margin-top: 5px
		}
		.glance-shop-cart-itemunselected-img{
			margin-top: 5px
		}
	}
	// item 选择样式
	// 不勾选
	.glance-shop-cart-itemunselected-img{width: 38upx;height: 38upx; border: solid 1px lightgray;border-radius: 50%;}
	// 勾选
	.glance-shop-cart-itemselected-img{width: 40upx;height: 40upx;background-size:40upx 40upx;background-repeat:no-repeat;
		background-image: url('../../static/images/carts/icon-selected.png')
		}
	
	// 删除商品背景样式
	.glance-shop-cart-del-img{width: 30px;height: 30px;background-repeat:no-repeat; position: relative; top:25%; transform:translateY(-50%);left:50%;transform:translateX(-50%);
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABoklEQVRYR+2XTSttURzGf08kLzHxBUgpE4qSMvAhcOtmxPhkYmxgSpmRqYnXGN3u7M7uxOhmcKUU8g2QZMCjddpOB/s4i72ltPdw77We9dvPf708S3zxo9jxbTcDs8AY0Faj3w3wB1iRdBej/R6ADeAHcAhc1xBvBwaAXUk/8wa4BJYlLbwlbDt8L0nqzA3AdnDqHpiQtF8HYBzYkdSQG0AQsj0C/JdUy/7yeLY7gD5JB+8CsD0MtMZ0yqHNhaTToFOZhLaPAnkO4jES/yQNPgOI6fUZbV4tQ9vdwJykUp4D2l4FFiWdV+umAYS1vi0peo+IAbXtsI9I2i0APuRAUsMlSWdPArangAdJm1XvUudQ5hKkCdgO9bSkMG+eNqLUOVQAFA4UDhQOfAsHQiacrM6EtreSnbCSgG2nZsI8HHiVCW33JADlePVWJswMEHPm10nL0XlgIrlYfEYgCbF+r95xPAr8TaL1cdY/T8rSn9yoeiWd1ANoTAC6gHXgNiNECzAN/JI081Ir1Wbb4X4wDwwBTRkBroA1Sb/TdHKt80dAHwFIXaswp43kfwAAAABJRU5ErkJggg==)
		}
	
	// 空购物车背景样式
	.glance-shop-cart-nullcart{width: 120px;height: 120px;position: relative;transform:translateY(-50%);left:50%;transform:translateX(-50%);background-repeat:no-repeat;background-size: 100%;
	background-image: url('../../static/images/carts/anything.png')	}
	.proImg{
		height: 180upx;
		width: 180upx;
		background-color: #ccc;
		margin-top: 10upx;
	}
	.avtive-name button{
		    font-size: 24upx;
			padding: 0px 16upx;
			margin: 0 16upx;
			line-height: 44upx;
			border-radius: 44upx;
	}
	.active-desc{
		width: 55%;
		height: 50upx;
		overflow: hidden;
		word-wrap: none;
		text-overflow: ellipsis;
	}
	.attributes{
		font-size: 24upx;
		height: 40upx;
		line-height: 40upx;
		text-align: left;
		color: rgb(173, 173, 173);
		background-color: #eee;
		width: auto;
		padding: 0 16upx;
		border-radius: 4upx
	}
	.proPrice{
		font-size: 30upx;
		text-align: left;
		width: 50%;
		font-weight: 600;
	}
	.moveBtn{
		height: 100%;
		width: 12%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #E4B91C;
		color: #fff;
	}
	.delBtn{
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 12%;
		background-color: #D04C3C;
		color: #fff;
	}
</style>
