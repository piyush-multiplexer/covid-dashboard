<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-sm q-pb-md">
      <country-historical />
      <world-vaccine-coverage />
      <covid-data-by-country @country-clicked="viewCountryData" />
      <country-covid-data v-if="countryData" :country-data="countryData" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import CountryHistorical from "@/components/CountryHistorical.vue";
import WorldVaccineCoverage from "./components/WorldVaccineCoverage.vue";
import CovidDataByCountry from "./components/CovidDataByCountry.vue";
import CountryCovidData from "./components/CountryCovidData.vue";
export default defineComponent({
  components: {
    CountryHistorical,
    WorldVaccineCoverage,
    CovidDataByCountry,
    CountryCovidData,
  },
  setup() {
    let countryData = ref(null);
    function viewCountryData(param) {
      countryData.value = param;
    }
    return { viewCountryData, countryData };
  },
});
</script>
