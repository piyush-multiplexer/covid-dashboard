<template>
    <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">COVID Overall Data By Country</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <q-table
            title="Countries"
            :rows="countries"
            :columns="countryHeaders"
            :filter="search"
            row-key="name"
          >
            <template v-slot:top-right>
              <q-btn
                class="q-mr-md"
                @click="test"
                label="Get Data"
                color="primary"
              />
              <q-input
                class="q-ml-md"
                dense
                outlined
                v-model="search"
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
</template>

<script>
import axios from "axios";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const countries = ref([]);
    const search = ref("");
    const countryHeaders = [
      { label: "Country", name: "country", field: "country", sortable: true },
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
      axios.get("https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&allowNull=true").then((res) => {
        countries.value = res.data;
      });
    }
    return { test, countries, countryHeaders, search };
  },
});
</script>
