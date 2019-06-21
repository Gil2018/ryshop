
var CONFIG = {
	wx:{
		h5_appid:'wx3193ebb893a9d51e'
	},
	sys : {
		WX_QR_CODE:'http://appapi.indoorbuy.com/static/wexinmp_qrcode.png',
		SHARE_URL_BASE: 'http://testh5.indoorbuy.com',
		// #ifdef APP-PLUS
		// API_URL_BASE: 'http://192.168.1.104/newindoorbuyadmin/m_app/public/index.php',
		// API_URL_BASE:'http://appapi.indoorbuy.com',
		// IMAGE_URL_BASE: 'http://appapi.indoorbuy.com',
		API_URL_BASE:'http://testappapi.indoorbuy.com',
		IMAGE_URL_BASE: 'http://testappapi.indoorbuy.com',
		// #endif
		// #ifndef APP-PLUS
		// API_URL_BASE: 'http://192.168.1.104/newindoorbuyadmin/m_app/public/index.php',
		// API_URL_BASE: 'http://h5.indoorbuy.com',
		// IMAGE_URL_BASE: 'http://h5.indoorbuy.com',
		API_URL_BASE:'http://localhost/newindoorbuyadmin/m_app/public/index.php',
		IMAGE_URL_BASE: 'http://testappapi.indoorbuy.com',
		// #endif
//  		API_URL_BASE: 'http://192.168.1.136:8081',
//  		IMAGE_URL_BASE: 'http://192.168.1.136:8080/',
		UPLOAD_URL_FUNC: '/upload/uploadSigle',
		UPLOAD_MORE_URL: '/upload/uploadMore',
		
		PARAMS:{
			client:uni.getSystemInfoSync().platform,
			version:'3.0.1',
			version_code:'301',
			systemInfo:JSON.stringify(uni.getSystemInfoSync()),
			token:'',
		},
		LIVE_INDOORBUY:{
			URL_HREF: 'http://live.indoorbuy.com/open/index/method/goChat',
		}
	},
	// Bannerd定义
	BANNER:{
		'INDEX':{type:4,belong_id:1}, // 首页banner
		'CLASS_RECOMMEND':{type:4,belong_id:2}, // 分类：为你推荐
		'CLASS_COUNTRY':{type:4,belong_id:3}, // 分类：国家馆
		'CLASS_BRAND':{type:4,belong_id:4}, // 分类：品牌墙
		'CLASS_LIST':{type:1} // 分类：列表
	},
};

var exports_json = {
};
for(var k in CONFIG){
	exports_json[k] = CONFIG[k];
}

module.exports = exports_json;