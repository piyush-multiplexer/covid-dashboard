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
        .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
        .then(async (res) => {
          const config = {
            type: "line",
            data: {
              labels: Object.keys(res.data.cases),
              datasets: [
                {
                  label: "Confirmed",
                  backgroundColor: "#2f4b7c",
                  data: Object.values(res.data.cases),
                },
                {
                  label: "Recovered",
                  backgroundColor: "#00e7f2",
                  data: Object.values(res.data.recovered),
                },
                {
                  label: "Deaths",
                  backgroundColor: "#f95d6a",
                  data: Object.values(res.data.deaths),
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: "World COVID Timeseries Data",
                  position: "top",
                  align: "center",
                  font: { weight: 700, size: 18 },
                  padding: {
                    top: 15,
                    bottom: 5,
                  },
                },
              },
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
              tooltips: {
                callbacks: {
                  label: function (tooltipItem) {
                    return tooltipItem.yLabel.toLocaleString("en-IN");
                  },
                },
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
  height: 600px;
}
</style>