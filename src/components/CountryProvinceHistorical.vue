<template>
  <Chart ref="lineCharts" :options="options" />
</template>
<script lang="js">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    let options = ref({})
    return { options }
  }
})
</script>
