<template>
  <div class="chart-container">
    <canvas id="CountryHistorical"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import axios from "axios";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  setup() {
    onMounted(() => {
      axios
        .get("https://disease.sh/v3/covid-19/historical/India?lastdays=all")
        .then(async (res) => {
          const config = {
            type: "line",
            data: {
              labels: Object.keys(res.data.timeline.cases),
              datasets: [
                {
                  label: "Confirmed",
                  backgroundColor: "blue",
                  data: Object.values(res.data.timeline.cases),
                },
                {
                  label: "Recovered",
                  backgroundColor: "green",
                  data: Object.values(res.data.timeline.recovered),
                },
                {
                  label: "Deaths",
                  backgroundColor: "red",
                  data: Object.values(res.data.timeline.deaths),
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          };
          new Chart(document.getElementById("CountryHistorical"), config);
        });
    });
    return {};
  },
});
</script>
<style scoped>
.chart-container {
    width: 96vw;
    height:600px
}
</style>