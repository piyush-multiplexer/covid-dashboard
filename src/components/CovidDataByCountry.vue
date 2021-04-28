<template>
  <q-card flat bordered class="my-card">
    <q-card-section class="row">
      <q-card flat bordered class="col-6">
        <q-card-section>
          <div class="text-h6">COVID Overall Data By Country</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <q-table
            class="my-sticky-header-table"
            title="Countries (click for detail)"
            @row-click="onClickCountry"
            :rows="countries"
            :columns="countryHeaders"
            :filter="searchCountry"
            row-key="name"
            separator="horizontal"
          >
            <template v-slot:top-right>
              <q-btn
                class="q-mr-md"
                @click="getWorldData"
                label="Get Data"
                color="primary"
              />
              <q-input
                class="q-ml-md"
                dense
                outlined
                v-model="searchCountry"
                placeholder="Search by country"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
      <q-card flat bordered class="col-6">
        <q-card-section>
          <div class="text-h6">COVID Overall Data (India)</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <q-table
            class="my-sticky-column-table"
            title="States"
            :rows="result.states"
            :columns="stateHeaders"
            :filter="searchState"
            row-key="name"
            separator="vertical"
          >
            <template v-slot:top-right>
              <q-btn
                class="q-mr-md"
                @click="getCountryData"
                label="Get Data"
                color="primary"
              />
              <q-input
                class="q-ml-md"
                dense
                outlined
                v-model="searchState"
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
    </q-card-section>
  </q-card>
</template>

<script>
import axios from "axios";
import { defineComponent, ref, onMounted } from "vue";
let self;
export default defineComponent({
  setup() {
    let currentCountry = ref("India");
    const countries = ref([]);
    const searchCountry = ref("");
    const result = ref({ states: [] });
    const searchState = ref("");
    const stateHeaders = [
      {
        label: "State",
        align: "left",
        name: "state",
        field: "state",
        sortable: true,
      },
      {
        label: "Cases",
        name: "cases",
        field: "cases",
        sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        label: "Active",
        name: "active",
        field: "active",
        sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        label: "Deaths",
        name: "deaths",
        field: "deaths",
        sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        label: "Recovered",
        name: "recovered",
        field: "recovered",
        sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
    ];
    const countryHeaders = [
      {
        label: "Country",
        align: "left",
        name: "country",
        field: "country",
        sortable: true,
      },
      {
        label: "Cases",
        name: "cases",
        field: "cases",
        sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        label: "Active",
        name: "active",
        field: "active",
        sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        label: "Deaths",
        name: "deaths",
        field: "deaths",
        sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        label: "Recovered",
        name: "recovered",
        field: "recovered",
        sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
    ];
    onMounted(() => {
      getCountryData();
      getWorldData();
    });
    function getWorldData() {
      axios
        .get(
          "https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&allowNull=true"
        )
        .then((res) => {
          countries.value = res.data;
          self.$emit(
            "country-clicked",
            res.data.find((c) => c.country === "India")
          );
        });
    }
    function getCountryData() {
      axios.get(`https://disease.sh/v3/covid-19/gov/India`).then((res) => {
        result.value = res.data;
      });
    }
    function onClickCountry(evt, row) {
      currentCountry.value = row.country;
      // getCountryData();
      self.$emit("country-clicked", row);
    }
    return {
      getCountryData,
      result,
      stateHeaders,
      searchCountry,
      getWorldData,
      countries,
      countryHeaders,
      searchState,
      onClickCountry,
    };
  },
  created() {
    self = this;
  },
});
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 402px

  .q-table__top,
  .q-table__bottom,
  tr:first-child th 
    /* bg color is important for th; just specify one */
    background-color: #e5e5e5

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

.my-sticky-column-table
  /* specifying max-width so the example can
   highlight the sticky column on any browser window */
  // max-width: 600px

  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #e5e5e5

  td:first-child
    background-color: #e5e5e5

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>