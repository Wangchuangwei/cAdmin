<template>
  <div>
    <div class="grid grid-cols-2 grid-cols-4 gap-4">
      <div v-for="(item, index) in analysisList"  
        :key="index"
        class="card-container"
      >
        <p> {{item.title}}</p>
        <div class="card-content">
          <div class="card-content-item flex-between count">
            <countTo :count="item.money" :duration="2">
              <template #default="{value}">
                <span>{{value}}</span>
              </template>
            </countTo>
            <img :src="getAssetURL(item.img)" alt="" />
          </div>
          <div class="card-content-item flex-between">
            <span>{{item.zTitle}}</span>
            <span>{{item.num}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-wrapper">
      <div class="chart-container">
        <div class="theme-swatches">
          <div class="theme-swatch" :class="{ active: tabs}" @click="changeTabs(tabs)">流量趋势</div>
          <div class="theme-swatch" :class="{ active: !tabs}" @click="changeTabs(tabs)">访问量</div>
        </div>
        <chart :option="option" height="300px" class="pt-4 mt-2"></chart>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
import { getAssetURL } from '@/utils/common'
import countTo from '@/components/CountTo/CountTo.vue'
import chart from '@/components/ECharts/Chart.vue'

let tabs = ref(true)

const changeTabs = (value) => {
  tabs.value = !value
}

const analysisList = [
  {
    title: '使用量',
    subTitle: '月',
    money: 120000,
    img: 'assets/analysis/visit-count.svg',
    zTitle: '总使用量',
    num: '120,000',
    state:'danger'
  },
  {
    title: '用户量',
    subTitle: '月',
    money: 20000,
    img: '/assets/analysis/total-sales.svg',
    zTitle: '总用户量',
    num: '20,000',
    state:'success'

  },
  {
    title: '下载量',
    subTitle: '月',
    money: 20000,
    img: '/assets/analysis/download-count.svg',
    zTitle: '总下载量',
    num: '20,000',
    state:'warning'
  },
  {
    title: '访问数',
    subTitle: '月',
    money: 20000,
    img: '/assets/analysis/transaction.svg',
    zTitle: '总访问数',
    num: '20,000',
    state:'primary'
  }
]
const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        width: 1,
        color: "#019680"
      }
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid'
      }
    },
  
  },
  yAxis: {
    type: "value",
    max: 80000,
    splitNumber: 4,
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)']
      }
    }
  },
  grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
  series: [
    {
      smooth: true,
      data: [
        111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666,
        44444, 22222, 11111, 4000, 2000, 500, 333, 222, 111
      ],
      type: 'line',
      areaStyle: {},
      itemStyle: {
      }
    },
    {
      smooth: true,
      data: [
        33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000,
        2221, 1201, 390, 198, 60, 30, 22, 11
      ],
      type: 'line',
      areaStyle: {},
      itemStyle: {
      }
    }
  ]
}

</script>

<style lang="scss" scoped>
.card-wrapper{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.card-container{
  background: #fff;

  p {
    font-weight: bolder;
    padding: 12px;
    border-bottom: 1px solid #E5E6EB;
  }

  .card-content {
    padding: 12px 0;

    .count {
      font-size: 24px;
      font-weight: normal;
      color: #1D2129;

      img {
        width: 40px;
        height: 40px;
      }
    }
    .card-content-item {
      color: #4E5969;
      padding: 0 12px 12px 12px;
    }

  }

}
.chart-wrapper{
  margin: 16px 0px;
  background-color: #fff;
  border-radius: 4px;


  .chart-container{
    padding: 12px;
  }
}
.theme-swatches {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 3px;
  border-radius: 5px;
  margin-top: 20px;
  background: #E5E6EB;
  color: #1D2129;

  .theme-swatch { 
    min-width: 50px;
    height: 25px;
    line-height: 25px;
    padding: 0 5px;
    text-align: center;
    font-size: 13px;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      color: #00B42A;
    }

    &.active {
      background: #fff;
    }
  }
}
</style>