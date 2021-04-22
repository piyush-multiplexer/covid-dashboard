<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <country-historical />
      <multi-line-chart />
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">COVID Overall Data (India)</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <q-table
            title="States"
            :rows="result.states"
            :columns="stateHeaders"
            :filter="search"
            row-key="name"
          >
            <template v-slot:top-right>
              <q-btn class="q-mr-md" @click="test" label="Get Data" color="primary" />
              <q-input class="q-ml-md"
                dense outlined
                v-model="search"
                placeholder="Search by state"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import { defineComponent, ref } from "vue";
import CountryHistorical from "@/components/CountryHistorical.vue";
import MultiLineChart from "@/components/MultiLineChart.vue";
export default defineComponent({
  components: { MultiLineChart, CountryHistorical },
  setup() {
    const result = ref({states:[]});
    const search = ref("");
    const stateHeaders = [
      { label: "State", name: "state", field: "state", sortable: true },
      { label: "Cases", name: "cases", field: "cases", sortable: true },
      { label: "Active", name: "active", field: "active", sortable: true },
      { label: "Deaths", name: "deaths", field: "deaths", sortable: true },
      {
        label: "Recovered",
        name: "recovered",
        field: "recovered",
        sortable: true,
      },
    ];
    function test() {
      axios.get("https://disease.sh/v3/covid-19/gov/India").then((res) => {
        // console.log(res.data)
        result.value = res.data;
        // console.log(result)
      });
    }
    return { test, result, stateHeaders, search };
  },
});
</script>
