<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <country-historical />
      <world-vaccine-coverage />
      <covid-data-by-country />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import CountryHistorical from "@/components/CountryHistorical.vue";
import WorldVaccineCoverage from "./components/WorldVaccineCoverage.vue";
import CovidDataByCountry from "./components/CovidDataByCountry.vue";
export default defineComponent({
  components: { CountryHistorical, WorldVaccineCoverage, CovidDataByCountry },
  setup() {},
});
</script>
