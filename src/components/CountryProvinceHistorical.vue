<template>
  <Chart ref="lineCharts" :options="options" />
</template>
<script lang="js">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup (_props, _context) {
    let options = ref({})
    return { options }
  }
})
</script>
