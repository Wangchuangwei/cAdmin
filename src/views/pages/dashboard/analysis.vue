<template>
  <div class="cAdmin__container">
    <div class="grid grid-cols-1 grid-cols-2 grid-cols-4 gap-4">
      <div v-for="(item, index) in analysisList"  
        :key="index"
        class="card-container w-full"
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
    <div class="w-full md-flex gap-4">
      <div v-for="(item, index) in chartDataList"  
        :key="index"
        class="card-container md-w3"
      >
        <p> {{item.title}}</p>
        <chart :option="item.option" height="300px"></chart>
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
const chartDataList = [
  {
    title: '转化率',
    option: {
      legend: {
        bottom: 0,
        data: ['访问', '购买']
      },
      tooltip: {},
      radar: {
        radius: '60%',
        splitNumber: 8,
        indicator: [
          {
            name: '电脑'
          },
          {
            name: '充电器'
          },
          {
            name: '耳机'
          },
          {
            name: '手机'
          },
          {
            name: 'Ipad'
          },
          {
            name: '耳机'
          }
        ]
      },
      series: [
        {
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1
          },
          data: [
            {
              value: [90, 50, 86, 40, 50, 20],
              name: '访问',
              itemStyle: {
              }
            },
            {
              value: [70, 75, 70, 76, 20, 85],
              name: '购买',
              itemStyle: {
              }
            }
          ]          
        }
      ]
    },
  },
  {
    title: '访问来源',
    option: {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '1%',
        left: 'center'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false, 
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '12',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' }
          ],
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDelay: function () {
            return Math.random() * 100
          }
        }
      ]
    }
  },
  {
    title: '成交占比',
    option: {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: [
            { value: 500, name: '电子产品' },
            { value: 310, name: '服装' },
            { value: 274, name: '化妆品' },
            { value: 400, name: '家居' }
          ].sort(function (a, b) {
            return a.value - b.value
          }),
          roseType: 'radius',
          animationType: 'scale',
          animationEasing: 'exponentialInOut',
          animationDelay: function () {
            return Math.random() * 400
          }
        }
      ]
    }
  }
]

</script>

<style lang="scss" scoped>
.cAdmin__container {
  overflow-y: auto;
  width: 100%;
  max-height: calc(100vh - 92px);
  padding-bottom: 16px;
}
.card-wrapper{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.card-container{
  background: #fff;
  border-radius: 4px;

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