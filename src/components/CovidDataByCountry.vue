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
            class="my-sticky-header-table"
            title="States"
            :rows="result.states"
            :columns="stateHeaders"
            :filter="searchState"
            row-key="name"
          >
            <template v-slot:top-right>
              <q-btn
                class="q-mr-md"
                @click="getDataByCountry"
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
      getWorldData();
      getDataByCountry();
    });
    function getWorldData() {
      axios.get(`https://disease.sh/v3/covid-19/gov/India`).then((res) => {
        result.value = res.data;
      });
    }
    function getDataByCountry() {
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
    function onClickCountry(evt, row) {
      currentCountry.value = row.country;
      // getWorldData();
      self.$emit("country-clicked", row);
    }
    return {
      getWorldData,
      result,
      stateHeaders,
      searchCountry,
      getDataByCountry,
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
