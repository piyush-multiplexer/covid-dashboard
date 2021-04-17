<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">
          <div>
            COVID Overall Data (India)
            <v-btn @click="test">
              GET DATA<v-icon small>
                mdi-refresh
              </v-icon>
            </v-btn>
          </div>
          <v-spacer />
          <v-text-field v-model="search" hide-details label="Search by state" outlined dense />
        </v-card-title>
        <v-data-table v-if="result" :search="search" :headers="stateHeaders" :items="result.states" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, Data, SetupContext, reactive, ref } from '@vue/composition-api'
export default defineComponent({
  setup (_props: Data, _context: SetupContext) {
    const result = ref(null)
    const search = ref(null)
    const stateHeaders = [
      { text: 'State', value: 'state' },
      { text: 'Cases', value: 'cases' },
      { text: 'Active', value: 'active' },
      { text: 'Deaths', value: 'deaths' },
      { text: 'Recovered', value: 'recovered' }
    ]
    function test () {
      this.$axios.get('https://disease.sh/v3/covid-19/gov/India').then((res) => {
        console.log(res.data)
        result.value = res.data
        console.log(result)
      })
    }
    return { test, result, stateHeaders, search }
  }
})
</script>
