<template>
  <div class="chart-container">
    <canvas id="WorldVaccineCoverage"></canvas>
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
        .get("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=all")
        .then(async (res) => {
          const config = {
            type: "line",
            data: {
              labels: Object.keys(res.data),
              datasets: [
                {
                  label: "Vaccinated",
                  backgroundColor: "#00b8d3",
                  data: Object.values(res.data),
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: "World COVID Vaccination Coverage Data",
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
          new Chart(document.getElementById("WorldVaccineCoverage"), config);
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