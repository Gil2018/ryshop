<template>
  <div class="mpvue-picker">
    <div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
    <div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
      <div class="mpvue-picker__hd" catchtouchmove="true">
        <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
        <div class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</div>
      </div>
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange">
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in provinceDataList" :key="index" :value="item.id">{{item.name}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in cityDataList" :key="index" :value="item.id">{{item.name}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in areaDataList" :key="index" :value="item.pid">{{item.name}}</div>
          </picker-view-column>
        </block>
      </picker-view>
    </div>
  </div>
</template>

<script>
import dataList from './city-data/province.js';
export default {
  data() {
    return {
      pickerValue: [0, 0, 0],
      provinceDataList: [],
      cityDataList: [],
      areaDataList: [],
			/* 是否显示控件 */
			showPicker: false,
			cityId:0,
    };
  },
	created() {
		this.init()
	},
  props: {
    /* 默认值 */
    pickerValueDefault: {
      type: Array,
      default(){
				return [0, 0, 0]
			}
    },
    /* 主题色 */
    themeColor: String
  },
	watch:{
		pickerValueDefault(){
			this.init();
		}
	},
  methods: {
		init() {
				this.handPickValueDefault(); // 对 pickerValueDefault 做兼容处理
				this.provinceDataList = dataList.provinceData;
				if(dataList.cityData.length!==0){
					this.cityDataList = dataList.cityData[0].data;
				}
				if(dataList.areaData.length!==0){
					this.areaDataList = dataList.areaData[0].data;
				}
				this.pickerValue = this.pickerValueDefault;
		},
    show() {
      setTimeout(() => {
        this.showPicker = true;
      }, 0);
    },
    maskClick() {
      this.pickerCancel();
    },
    pickerCancel() {
      this.showPicker = false;
      this._$emit('onCancel');
    },
    pickerConfirm(e) {
      this.showPicker = false;
      this._$emit('onConfirm');
    },
    showPickerView() {
      this.showPicker = true;
    },
    handPickValueDefault() {
      if (this.pickerValueDefault !== [0, 0, 0]) {
        if (this.pickerValueDefault[0] > dataList.provinceData.length - 1) {
          this.pickerValueDefault[0] = dataList.provinceData.length - 1;
        }
				if(dataList.cityData[ this.pickerValueDefault[0]]!==undefined||dataList.areaData[this.pickerValueDefault[0]]!==undefined){
					if (this.pickerValueDefault[1] > dataList.cityData[this.pickerValueDefault[0]].length - 1) {
					  this.pickerValueDefault[1] = dataList.cityData[this.pickerValueDefault[0]].length - 1;
					}
					if (this.pickerValueDefault[2] > dataList.areaData[this.pickerValueDefault[0]].length - 1) {
					  this.pickerValueDefault[2] = dataList.areaData[this.pickerValueDefault[0]].length - 1;
					}
				}
      }
    },
    pickerChange(e) {
      let changePickerValue = e.mp.detail.value;
			this.cityId=0;
			var tempCount=0;
      if (this.pickerValue[0] !== changePickerValue[0]) {
         // 第一级发生滚动
				 for (var i=0;i<dataList.cityData.length;i++) {
						if((dataList.cityData[i].pid)-1==changePickerValue[0]){
							tempCount++;
							this.cityDataList =dataList.cityData[i].data ;
							if(tempCount==1){
								this.cityId=dataList.cityData[i].id;
							}
						}
				 }
				 dataList.areaData.map(item1=>{
						 if(item1.pid==this.cityId){
						 		this.areaDataList =item1.data ;
						 }				
				 })
         changePickerValue[1] = 0;
         changePickerValue[2] = 0;
       } else if (this.pickerValue[1] !== changePickerValue[1]) {
         // 第二级滚动
				 this.cityId=this.cityDataList[changePickerValue[1]].id;
				 dataList.areaData.map(item1=>{
						 if(item1.pid==this.cityId){
								this.areaDataList =item1.data ;
						 }				
				 })
         changePickerValue[2] = 0;
       }
       this.pickerValue = changePickerValue;
       this._$emit('onChange');
    },
    _$emit(emitName) {
      let pickObj = {
        label: this._getLabel(),
        value: this.pickerValue,
        cityCode: this._getCityCode()
      };
      this.$emit(emitName, pickObj);
    },
    _getLabel() {
      let pcikerLabel =
        this.provinceDataList[this.pickerValue[0]].name +
        '-' +
        this.cityDataList[this.pickerValue[1]].name +
        '-' +
        this.areaDataList[this.pickerValue[2]].name;
      return pcikerLabel;
    },
    _getCityCode() {
			var cityCode=this.provinceDataList[this.pickerValue[0]].id+
			','+
			this.cityDataList[this.pickerValue[1]].id+
			','+
			this.areaDataList[this.pickerValue[2]].id;
      return cityCode;
    }
  }
};
</script>

<style>
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.mpvue-picker-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}
.mpvue-picker-view-show {
  transform: translateY(0);
}
.mpvue-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}
.mpvue-picker__hd:after {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.mpvue-picker__action {
  display: block;
  flex: 1;
  color: #D04C3C;
}
.mpvue-picker__action:first-child {
  text-align: left;
  color: #888;
}
.mpvue-picker__action:last-child {
  text-align: right;
}
.picker-item {
  text-align: center;
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
}
.mpvue-picker-view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
}
</style>
