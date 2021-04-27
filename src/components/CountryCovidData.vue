<template>
  <div class="row">
    <div class="chart-container-1 col-5">
      <canvas id="CountryCovidData-Pie"></canvas>
    </div>
    <div class="chart-container-2 col-7">
      <canvas id="CountryVaccineCoverage-Line"></canvas>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import { defineComponent, reactive, watchEffect } from "vue";
import axios from "axios";
export default defineComponent({
  props: ["countryData"],
  setup(_props) {
    let pieChart, lineChart;
    let covidData = reactive(_props.countryData);
    watchEffect(() => {
      covidData = _props.countryData;
      axios
        .get(
          `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${covidData.country}?lastdays=100`
        )
        .then(async (res) => {
          const lineConfig = {
            type: "line",
            data: {
              labels: Object.keys(res.data.timeline),
              datasets: [
                {
                  label: "Vaccinated",
                  backgroundColor: "#00b8d3",
                  data: Object.values(res.data.timeline),
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: `(${covidData.country}) COVID Vaccination Coverage Data`,
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
                    return tooltipItem.yLabel?.toLocaleString("en-IN");
                  },
                },
              },
            },
          };
          const pieConfig = {
            type: "pie",
            data: {
              labels: ["Confirmed", "Critical", "Recovered", "Deaths"],
              datasets: [
                {
                  label: "Dataset One",
                  backgroundColor: ["#2f4b7c", "#ff7c43", "#00e7f2", "#f95d6a"],
                  data: [
                    covidData.cases,
                    covidData.critical,
                    covidData.recovered,
                    covidData.deaths,
                  ],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: `(${covidData.country}) COVID Data with Population (${covidData.population?.toLocaleString("en-IN")}) Distribution`,
                  font: { weight: 700, size: 18 },
                },
              },
              tooltips: {
                callbacks: {
                  label: function (tooltipItem) {
                    return tooltipItem.yLabel?.toLocaleString("en-IN");
                  },
                },
              },
            },
          };
          try {
            lineChart = new Chart(
              document.getElementById("CountryVaccineCoverage-Line"),
              lineConfig
            );
          } catch {
            lineChart.data.datasets[0].data = lineConfig.data.datasets[0].data;
            lineChart.options.plugins.title.text =
              lineConfig.options.plugins.title.text;
            lineChart.update();
          }
          try {
            pieChart = new Chart(
              document.getElementById("CountryCovidData-Pie"),
              pieConfig
            );
          } catch {
            pieChart.data.datasets[0].data = pieConfig.data.datasets[0].data;
            pieChart.options.plugins.title.text =
              pieConfig.options.plugins.title.text;
            pieChart.update();
          }
        });
    });
    return {};
  },
});
</script>
<style scoped>
.chart-container-1 {
  width: 40vw;
  height: 450px;
}
.chart-container-2 {
  width: 60vw;
  height: 450px;
}
</style>
