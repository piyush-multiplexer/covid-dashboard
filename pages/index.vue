<template>
  <el-row>
    <el-col :span="12">
      <el-card>
        <el-row slot="header" class="clearfix">
          <el-col :span="12">
            <span>COVID Overall Data (India)</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="ml-2" :span="9">
            <el-input v-model="search" placeholder="Search by state" />
          </el-col>
          <el-col :span="3">
            <el-button @click="test">
              Get Data
            </el-button>
          </el-col>
        </el-row>
        <el-table v-if="result" :search="search" :data="result.states">
          <el-table-column
            v-for="(column,index) in stateHeaders"
            :key="index"
            :prop="column.value"
            :label="column.text"
            :width="column.width"
          />
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent, Data, SetupContext, ref } from '@vue/composition-api'
let self: any = null
export default defineComponent({
  setup (_props: Data, _context: SetupContext) {
    const result = ref(null)
    const search = ref(null)
    const stateHeaders = [
      { text: 'State', value: 'state', width: 350 },
      { text: 'Cases', value: 'cases', width: 100 },
      { text: 'Active', value: 'active', width: 100 },
      { text: 'Deaths', value: 'deaths', width: 100 },
      { text: 'Recovered', value: 'recovered', width: 100 }
    ]
    function test () {
      self.$axios.get('https://disease.sh/v3/covid-19/gov/India').then((res:any) => {
        // console.log(res.data)
        result.value = res.data
        // console.log(result)
      })
    }
    return { test, result, stateHeaders, search }
  },
  created () {
    self = this
  }
})
</script>
