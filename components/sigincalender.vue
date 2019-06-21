<template>
  <view class="calendar__wrap">
		<view class="header">
			<text class="current-date">{{currentDate}}</text>
		</view>
    <view class="body">
      <view class="weeks">
        <view class="week__item" v-for="week in weeks" :key="week">{{week}}</view>
      </view>
      <view class="day__list">
        <view class="day__item" v-for="(item,index) in dateData" :key="index">
          <text class="checked" v-if="item==='checked'">√</text>
          <text :class="{current:item===day}" v-else>{{item}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      checks: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      const {
        year,
        month,
        day
      } = this.getDate()
      const dateData = this.getDateData(year, month)
      return {
        year,
        month,
        day,
        dateData,
        weeks: ['日', '一', '二', '三', '四', '五', '六']
      }
    },
    computed: {
      currentDate() {
        return `${this.year}-${this.month+1}`
      }
    },
    watch: {
      checks(val) {
        const {
          year,
          month
        } = this.getDate()
        const dateData = this.getDateData(year, month)
        this.dateData = dateData
      }
    },
    methods: {
      getDate(current) {
        const date = current ? new Date(current) : new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return {
          year,
          month,
          day
        }
      },
      getDateData(year, month) {
        const date = new Date(`${year}/${month}/1`)
        const firstDayWeek = date.getDay()
        const emptyStrNum = firstDayWeek > 0 ? firstDayWeek : 7
        const data = [...this.getEmptys(emptyStrNum), ...this.getDays()]
        return data
      },
      getEmptys(count) {
        let arr = []
        for (let i = 0; i < count; i++) {
          arr.push('')
        }
        return arr
      },
      getLastDay() {
        let {
          year,
          month
        } = this.getDate()
        month += 1
        if (month > 11) {
          year += 1
          month = 1
        }
        let firstDayTimeStamp = new Date(`${year}/${month}/1`).getTime()
        let oneDayTimeStamp = 24 * 60 * 60 * 1000
        let lastDay = new Date(firstDayTimeStamp - oneDayTimeStamp).getDate()
        return lastDay
      },
      getDays() {
        const lastDay = this.getLastDay()
        const days = []
        for (let i = 1; i <= lastDay; i++) {
          days.push(this.checks.includes(i) ? 'checked' : i)
        }
        return days
      },
      format(num) {
        return num < 10 ? `0${num}` : num
      }
    }
  }
</script>

<style lang="scss" scoped>
  .calendar__wrap {
    background-color: #fff;
    color: $uni-text-color;
    .header {
      padding: 0 24upx;
      .current-date {
				width: 100%;
        text-align: center;
        font-size: 34upx;
        border-bottom: 2upx solid #eee;
        padding: 32upx 0;
      }
    }
    .body {
      .weeks {
        display: flex;
        font-size: 30upx;
        padding: 32upx 0;
        .week__item {
          flex: 1;
          text-align: center;
        }
      }
      .day__list {
        display: flex;
        flex-wrap: wrap;
        .day__item {
          display: flex;
          justify-content: center;
          width: 14.285%;
          text-align: center;
          padding: 30upx 0;
          font-size: 34upx;
          .checked,
          .current {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56upx;
            height: 56upx;
            border-radius: 100%;
            padding: 12upx;
            box-sizing: border-box;
            background-color: #3f9dff;
            color: #fff;
            font-size: 28upx;
          }
        }
      }
    }
  }
</style>
