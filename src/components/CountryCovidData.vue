<template>
  <div class="row">
    {{ covidData }}
    <div class="chart-container">
      <canvas id="WorldVaccineCoverage"></canvas>
    </div>
    <div class="chart-container">
      <canvas id="WorldVaccineCoverage"></canvas>
    </div>
  </div>
</template>
<script lang="js">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  props:['countryData'],
  setup (_props) {    
    let options = ref({})
    let covidData = reactive(null)
    console.log('props',_props.countryData);  
    // eslint-disable-next-line vue/no-setup-props-destructure
    covidData = _props.countryData
    return { options,covidData }
  }
})
</script>
<style scoped>
.chart-container {
  width: 96vw;
  height: 600px;
}
</style>