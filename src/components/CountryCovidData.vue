<template>
<div></div>
</template>
<script lang="js">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props:['countryData'],
  setup (_props) {    
    let options = ref({})
    console.log('props',_props.countryData);  
    return { options }
  }
})
</script>
