<template>
  <div class="row">
    {{ covidData }}
    <div class="chart-container">
      <canvas id="CountryCovidData-Pie"></canvas>
    </div>
    <div class="chart-container">
      <canvas id="WorldVaccineCoverage"></canvas>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import { defineComponent, ref, reactive, watchEffect } from "vue";

export default defineComponent({
  props: ["countryData"],
  setup(_props) {
    let chart;
    let options = ref({});
    let covidData = reactive(_props.countryData);
    watchEffect(() => {
      console.log("wE ", _props.countryData);
      covidData = _props.countryData;
      const config = {
        type: "pie",
        data: {
          labels: ["Confirmed", "Recovered", "Critical", "Deaths"],
          datasets: [
            {
              label: "Dataset One",
              backgroundColor: ["#2f4b7c", "#00e7f2", "#ff7c43", "#f95d6a"],
              data: [
                covidData.cases,
                covidData.recovered,
                covidData.critical,
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
              text: `(${covidData.country}) COVID Data with Population (${covidData.population}) Distribution`,
              font: { weight: 700, size: 18 },
            },
          },
        },
      };
      setTimeout(() => {
        try {
          console.log('try')
          chart = new Chart(
            document.getElementById("CountryCovidData-Pie"),
            config
          );
        } catch {
          console.log('catch')
          chart.data.datasets[0].data = config.data.datasets[0].data;
          chart.options.plugins.title.text = config.options.plugins.title.text;
          chart.update();
        }
      }, 500);
    });
    return { options, covidData };
  },
});
</script>
<style scoped>
.chart-container {
  width: 40vw;
  height: 400px;
}
</style>
