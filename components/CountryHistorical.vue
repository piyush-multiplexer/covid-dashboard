<template>
  <Chart ref="CountryHistorical" :options="options" />
</template>
<script lang="js">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
let self
export default defineComponent({
  setup (_props, _context) {
    const options = ref({})
    onMounted(() => {
      self.$axios.get('https://disease.sh/v3/covid-19/historical/India?lastdays=all').then(async (res) => {
        console.log(new Array(res.data.timeline.cases))
        self.options = {
          chart: { type: 'spline' },
          title: { text: `${res.data.country} COVID Timeseries Data` },
          subtitle: { text: 'Click and drag in the plot area to zoom in' },
          xAxis: { type: 'datetime' },
          yAxis: [
            { title: { text: 'Cases' } },
            { title: { text: 'Recovered' } },
            { title: { text: 'Deaths' } }
          ],
          legend: { enabled: false },
          plotOptions: {
            series: {
              marker: {
                enabled: true
              }
            }
          },
          series: [{
            name: 'Cases',
            data: await jsonSeriesToArray(res.data.timeline.cases)
          }, {
            name: 'Recovered',
            data: await jsonSeriesToArray(res.data.timeline.recovered)
          }, {
            name: 'Deaths',
            data: await jsonSeriesToArray(res.data.timeline.deaths)
          }]
        }
        console.log(self.options)
      })
    })
    function jsonSeriesToArray (object) {
      const result = []
      for (const i in object) {
        const dt = i.split('/')
        result.push([Date.UTC('20' + dt[2], dt[0], dt[1]), object[i]])
      }
      console.log(result)
      return result
    }
    return { options }
  },
  created () {
    self = this
  }
})
</script>
