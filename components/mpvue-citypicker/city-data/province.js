/* eslint-disable */
import indoorbuy from '../../../common/indoorbuy.js'
var dataList={
	provinceData: [],
	cityData:[],
	areaData:[],
}
indoorbuy.api_common.getAPI('/area',{},function(res){
	if(res.status==200){
		/* 获取到0数据 */
		for(var i=0;i<res.data.length;i++){
				/* 省 */
				dataList.provinceData.push(res.data[i])
				for(var j=0;j<res.data[i].son.length;j++){
					/* 市 */
					dataList.cityData.push({pid:res.data[i].id,id:res.data[i].son[j].id,data:res.data[i].son})
					/* 区 */
					dataList.areaData.push({pid:res.data[i].son[j].id,data:res.data[i].son[j].son})
					
				}
		}
	}else{
		
	}
})
export default dataList;
