<template>
  <Chart ref="lineCharts" :options="options" />
</template>
<script lang="js">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    let options = ref({})
    options = {
      chart: { type: 'spline' },
      title: { text: 'Monthly Average Temperature' },
      subtitle: { text: 'Source: WorldClimate.com' },
      xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      yAxis: {
        title: { text: 'Temperature' },
        labels: { formatter () { return this.value + '°' } }
      },
      tooltip: { crosshairs: true, shared: true },
      credits: { enabled: false },
      plotOptions: {
        spline: {
          marker: { radius: 4, lineColor: '#666666', lineWidth: 1 }
        }
      },
      series: [5,10,7.8,15,5,122]
    }
    return { options }
  }
})
</script>
