/* 
	author:	tzboy
	to:		indoorbuy
	time:	2019-02-28
	type：	create
 */

// import Promise from '@/common/bluebird.min.js';
import CONFIG from '@/common/config.js';

// 固定数据值
function formartApiParams(data){
	var params = CONFIG.sys.PARAMS;
	for(var k in params){
		data[k] = params[k];
	}
	data['token'] = uni.getStorageSync('token') || '';
	return data;
}
var indoorbuy = {
	getApi :	function(url,data={},func=function(res){}){
		uni.request({
			url: CONFIG.sys.API_URL_BASE+url,
			method:'POST',
			data: formartApiParams(data),
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				},
			success: (res) => {
				func(res);
			}
		});
	},
	getApiSync : function (url,data){
		return new Promise((res,rej)=>{
			uni.request({
			  url:CONFIG.sys.API_URL_BASE+url,
			  method:'POST',
			  data:formartApiParams(data),
			  header:{'Content-Type': 'application/x-www-form-urlencoded'},
			  success:res,
			  fail:rej
			})
		})
	},
	getUrlSync : function (url,data){
		return new Promise((res,rej)=>{
			uni.request({
			  url:url,
			  method:'POST',
			  data:formartApiParams(data),
			  header:{'Content-Type': 'application/x-www-form-urlencoded'},
			  success:res,
			  fail:rej
			})
		})
	},
	// 统一上传
	uploadFile : function(tempFilePath,params={},su_res=function(){},name="file"){
		uni.uploadFile({
	        url: CONFIG.sys.API_URL_BASE+CONFIG.sys.UPLOAD_URL_FUNC,
	        filePath: tempFilePath,
	        name: 'file',
			formData:formartApiParams(params),
	        success: (uploadFileRes) => {
				if(uploadFileRes.statusCode==200){
					su_res(JSON.parse(uploadFileRes.data));
				}else{
					uni.showToast({title: '上传失败',icon:'none',duration: 2000});
				}
	            
	        }
	    });
	},
	uploadFiles : function(tempFilePath,params={},su_res=function(){},name="file"){
		uni.uploadFile({
	        url: CONFIG.sys.API_URL_BASE+CONFIG.sys.UPLOAD_MORE_URL,
	        filePath: tempFilePath,
	        name: 'file',
			formData:formartApiParams(params),
	        success: (uploadFileRes) => {
				if(uploadFileRes.statusCode==200){
					su_res(JSON.parse(uploadFileRes.data));
				}else{
					uni.showToast({title: '上传失败',icon:'none',duration: 2000});
				}
	            
	        }
	    });
	},
	// 跳转界面 公共方法（后续-》操作记录）
	goPage:function(url,msg){
		uni.navigateTo({
          url: url
        })
	},
	jumpPage:function(url,msg){
		uni.redirectTo({
          url: url
        })
	},
	goBack:function(count){
		uni.navigateBack({
			delta:count
		})
	},
	tabPage:function(url,msg){
		uni.switchTab({
			url: url
		});
	},
	// 格式化图片路径
	formartImg:function(path=''){
		if(path!=null&&path!=''){
			return CONFIG.sys.IMAGE_URL_BASE + path;
		}else{
			return '';
		}
	}
};

var api_common = {
	// 格式化图片地址
	formartImg : function (list,key){
		for(var i=0,l=list.length;i<l;i++){
			if(list[i][key]!=null&&list[i][key]!=''){
				list[i][key] = indoorbuy.formartImg(list[i][key]);
			}
		}
		return list;
	},
	// 统一Banner获取
	getBanner : function(key='',params={},func=function(){}){
		var c_k_v = CONFIG.BANNER[key];
		for (var ck in c_k_v) {
			params[ck] = c_k_v[ck];
		}
		var banners = [];
		indoorbuy.getApiSync('/banner/list', params).then(res => {
			var data = res.data;
			if(data.status==200){
				func(data.data);
			}else{
				uni.showToast({title: res.msg,icon:'none',duration: 2000});
			}
		}).catch(function (err) {
			console.log(err);
			uni.showToast({title: err,icon:'none',duration: 2000});
		});
	},
	/* 获取用户信息 */
	getAccount(func=function(){}){
		indoorbuy.getApiSync('/account',{}).then(res=>{
			var data = res.data;
			if(data.status==200){
				/* 用户登录，获取到用户信息 */
				data.data.info.avatar!==''?data.data.info.avatar=data.data.info.avatar:data.data.info.avatar='/static/images/profile/noheadImg.png';
				func(data)
			}else if(res.status==1001){
				/* 未登录 */
				that.$store.state.hasLogin=false;
			}
		}).catch(function(err){
			console.log(err);
		})
	},
	// 统一接口入口
	getAPI : function(url='',params={},func=function(){},showError=true){
		var data={}
		uni.showLoading();
		indoorbuy.getApiSync(url, params).then( res => {
			console.log(res);
			data=res.data;
			uni.hideLoading();
			if(showError){
				if(data.status==200){
					func(data);
				}else{
					uni.showToast({title: data.msg,icon:'none',duration: 2000});
					if(data.status==1001){
						setTimeout(function(){
							indoorbuy.jumpPage('/pages/login/loginbypwd');
						},2000);
					}
				}
			}else{
				func(data);
			}
			// uni.hideLoading();
		}).catch(function (err) {
			uni.hideLoading();
			console.log(JSON.stringify(err));
			uni.showToast({title: '请检查网络链接',icon:'none',duration: 2000});
		});
	},
	// 统一文件上传
	uploadFile:function(params={},func=function(){}){
		uni.chooseImage({
			success: (chooseImageRes) => {
				var tempFilePaths = chooseImageRes.tempFilePaths;
				indoorbuy.uploadFile(tempFilePaths[0],params,function(res){
					if(res.status==200){
						func(res);
					}else{
						uni.showToast({title: res.msg,icon:'none',duration: 2000});
					}
				})
			}
		});
		
	},
	/* 上传修改头像 */
	uploadHeadImg(files,params={},func=function(){}){
		indoorbuy.uploadFile(files,{},function(res){
			if(res.status==200){
				func(res);
			}else{
				uni.showToast({title: res.msg,icon:'none',duration: 2000});
			}
		})
	},
	/* 多个文件上传 */
	uploadFiles(files,params={},func=function(){}){
		indoorbuy.uploadFiles(files,{},function(res){
			if(res.status==200){
				func(res);
			}else{
				uni.showToast({title: res.msg,icon:'none',duration: 2000});
			}
		})
	},
	/* banner跳转
	"img_url": "/uploads/20190319/478ca7b7a4eeba5f6f02d434a2e70bea.png",//图片
	"jump_type": 2,//跳转类型 1:url地址 2:商品
	"jump_value": "4"//跳转值 
	*/
	goNavForBanner(data){
		if(data.jump_type==1){
			indoorbuy.goPage('/pages/web/web?src='+data.jump_value);
		}else if(data.jump_type==2){
			indoorbuy.goPage('/pages/goods/detail?id='+data.jump_value);
		}
	},
	/* 广告位跳转
	"img_url": "/uploads/20190319/478ca7b7a4eeba5f6f02d434a2e70bea.png",//图片
	"jump_type": 2,//跳转类型 1:url地址 2:商品
	"jump_value": "4"//跳转值 
	*/
	goNavForAdvs(data){
		if(data.jump_type==1){
			indoorbuy.goPage('/pages/web/web?src='+data.jump_value);
		}else if(data.jump_type==2){
			indoorbuy.goPage('/pages/goods/detail?id='+data.jump_value);
		}else if(data.jump_type==3){
			indoorbuy.goPage('/pages/goods/list?tag='+data.jump_value);
		}
	},
	// indoorbuy live 客服系统
	getIndoorbuyLiveSys(params,fromPage){
		var live_params = uni.getStorageSync('live_params') || {};
		// uni.showLoading({});
		// uni.showToast({title: '暂无法接入客服',icon:'none',duration: 2000});
		var user = uni.getStorageSync('user')||{};
		if(user.account){
			if(user.account.mid){
				live_params['member_id'] = user.account.mid;
			}
		}
		uni.setStorageSync('live_params',live_params);
		uni.setStorageSync('live_from',fromPage);
		indoorbuy.goPage('/pages/web/live');
	},
	checkAPPVersion(){
		// #ifdef APP-PLUS
		if(uni.getSystemInfoSync().platform=='android'){
		indoorbuy.api_common.getAPI('/config/appversion', {},function(res){
			var result = res;
			if(result.status==200){
				var api_params = result.data;
				var sys_params = CONFIG.sys.PARAMS;
				
				if(sys_params.version_code < api_params.version_code ){
					var must_update = (api_params.must_update==1)?true:false;
					uni.showModal({
						title: '更新',
						showCancel: must_update,
						content: '有新的版本发布，是否立即更新？',
						success: function (res) {
							if (res.confirm) {
								uni.showLoading({
									title: '下载中,请稍后',
									mask:true,
								});
								uni.downloadFile({  
									url: api_params.url,  
									success: (downloadResult) => {  
										if (downloadResult.statusCode === 200) {  
											plus.runtime.install(downloadResult.tempFilePath, {  
												force: false  
											}, function() {  
												  uni.showToast({title: '更新成功',icon:'none',duration: 2000});
												plus.runtime.restart();  
											}, function(e) {  
												uni.showToast({title: '更新失败',icon:'none',duration: 2000});
											});  
										}  
									},
								}); 
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else{
					console.log('无需更新');
				}
			}else{
				// 获取商品信息失败
				console.log(result);
			}
		})
		}
		// #endif
	}

	
};

indoorbuy.api_common = api_common;

var exports_json = {
};
for(var k in indoorbuy){
	exports_json[k] = indoorbuy[k];
}

module.exports = exports_json
