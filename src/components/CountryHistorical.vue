<template>
  <Chart ref="CountryHistorical" :options="options" />
</template>
<script lang="js">
import { defineComponent, ref, onMounted } from 'vue'
let self
export default defineComponent({
  setup () {
    const options = ref({})
    onMounted(() => {
      self.$axios.get('https://disease.sh/v3/covid-19/historical/India?lastdays=all').then(async (res) => {
        const tmp = {
          title: { text: `${res.data.country} COVID Timeseries Data` },
          subtitle: { text: 'Click and drag in the plot area to zoom in' },
          xAxis: {
            type: 'datetime'
          },
          yAxis: [
            { title: { text: 'Confirmed' } }
            // { title: { text: 'Recovered' } },
            // { title: { text: 'Deaths' } }
          ],
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
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
          console.log(tmp)
          self.options = tmp
          console.log(self.$refs.CountryHistorical.render())
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
