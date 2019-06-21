/* 
	author:	tzboy
	to:		indoorbuy
	time:	2019-02-28
	type:	create & integration
 */
function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}
	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time
	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
// 时间转换工具
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in dateUtils.UNITS) {
			if (milliseconds >= dateUtils.UNITS[key]) {
				humanize = Math.floor(milliseconds / dateUtils.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = dateUtils.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < dateUtils.UNITS['天']) {
			return dateUtils.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	},
	formatTime(time){
		var hour= Math.floor(time/this.UNITS['小时']);
		var minute= Math.floor(time/this.UNITS['分钟']);
		var second= Math.floor(time/this.UNITS['秒']);
		return{
			hour:hour,
			minute:minute,
			second:second
		}
	},
	formatDateTime:function(inputTime) { //时间戳 转 YY-mm-dd HH:ii:ss 
		var date = new Date(inputTime);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
	},
	formatDateDay:function(inputTime) { //时间戳 转 YY-mm-dd HH:ii:ss 
		var date = new Date(inputTime);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '.' + m + '.' + d;
	}
};



/* util_check start */
var util_check = {};
// 空值判断
util_check.IsNullOrEmpty = function(str) {
	return (str === null || str === '' || str === undefined || str === 'undefined') ? true : false;
};
// 空格去除
util_check.trim = function(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
};
// 手机号判断
util_check.isMobile = function(str) {
	return /^1[0-9]{10,10}$/.test(str);
};
// 浮点判断
util_check.isFloat = function(str) {
	return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(str);
};
// 正则
util_check.replaceAll = function(str,repstr,newstr){
　　 return str.replace(new RegExp(repstr,"gm"),newstr);
}; 
// 手机号格式化 例：18380473385 -> 183****3385
util_check.formatMobile=function(mobile){
	if(!util_check.IsNullOrEmpty(mobile)&&mobile.isMobile()){
		return mobile.substr(0,3)+'****'+mobile.substr(7,4);
	}else{
		return mobile;
	}
};
// 数组查询
util_check.inArray = function(arr,value){
	if(arr != null){
		var res = false;
		for(var i=0,l=arr.length;i<l;i++){
			if(arr[i]==value){
				res = true;
				break;
			}
		}
		return res;
	}else{
		return true;
	}
}

// 身份证验证
util_check.checkIdCard = function(value) {
	var idCard = value;
	if (idCard.length == 15) {
		return util_check.isValidityBrithBy15IdCard(idCard);
	} else if (idCard.length == 18) {
		var arrIdCard = idCard.split("");
		if (util_check.isValidityBrithBy18IdCard(idCard) && util_check.isTrueValidateCodeBy18IdCard(arrIdCard)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

util_check.isTrueValidateCodeBy18IdCard = function(arrIdCard) {
	var sum = 0;
	var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
	var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
	if (arrIdCard[17].toLowerCase() == 'x') {
		arrIdCard[17] = 10;
	}
	for (var i = 0; i < 17; i++) {
		sum += Wi[i] * arrIdCard[i];
	}
	var valCodePosition = sum % 11;
	if (arrIdCard[17] == ValideCode[valCodePosition]) {
		return true;
	} else {

		return false;
	}
};

util_check.isValidityBrithBy18IdCard = function(idCard18) {
	var year = idCard18.substring(6, 10);
	var month = idCard18.substring(10, 12);
	var day = idCard18.substring(12, 14);
	var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
	if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
		return false;
	} else {
		return true;
	}
};

util_check.isValidityBrithBy15IdCard = function(idCard15) {
	var year = idCard15.substring(6, 8);
	var month = idCard15.substring(8, 10);
	var day = idCard15.substring(10, 12);
	var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

	if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
		return false;
	} else {
		return true;
	}
};

/* util_check end */

/* 
	@tz util
	@author: tzboy
 */
/* tz_util start */
// 获取json长度
util_check.getJsonLength = function(jsonData) {
  var jsonLength = 0;
  for (var item in jsonData) {
    jsonLength++;
  }
  return jsonLength;
}
//判断是否为json
util_check.isJson = function(obj) {
  var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isjson;
}  
// 判断是否为字符串
util_check.isString = function(str) {
  return (typeof str == 'string') && str.constructor == String;
}

util_check.forMartJsonValueToString = function(jsonData){
	for(var k in jsonData){
		if (util_check.isJson(jsonData[k])){
			jsonData[k] = util_check.forMartJsonValueToString(jsonData[k]);
		} else if (!util_check.isString(jsonData[k])){
		 jsonData[k] = "" + jsonData[k];
		}
	}
	return jsonData;
}
/* 判断滚动 改变顶部导航条样式 */
util_check.changeTop=function(scrollTop,obj){
	/* scrollTop: 页面滚动高度; obj:t头部DOM */
	if(scrollTop>60){
		obj.backgroundColor="rgba(0,0,0,.5)";
	}else{
		obj.backgroundColor="transparent";
	}
}
/* 判断页面 切换底部导航栏 */
util_check.changeBottom=function(route,pageIndex){
	switch(route){
		case "pages/index/index":
			pageIndex = 0;
		break;
		case "pages/classes/index":
			pageIndex = 1;
		break;
		case "pages/carts/index":
			pageIndex = 2;
		break;
		case "pages/profile/index":
			pageIndex = 3;
		break;
	}
}
/*  */

/* tz_util end */

var exports_json = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	util_check:util_check
};
// for(var k in util_check){
// 	exports_json[k] = util_check[k];
// }

module.exports = exports_json
