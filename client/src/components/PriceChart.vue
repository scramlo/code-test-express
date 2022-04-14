<template>
  <section aria-label="Price Chart">
    <v-card class="price-chart">
      <v-card-title>
        <h2 class="headline">Average Price</h2>
      </v-card-title>
      <v-card-text class="price-chart__chart-container">
        <div class="d-flex justify-center display-1 mb-4">${{ averagePrice.toFixed(2) }}</div>
        <LineChartGenerator
          v-if="!loading"
          :chart-options="chartOptions"
          :chart-data="chartData"
          :styles="chartContainerStyles"
        />
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: 'PriceChart',
  components: {
    LineChartGenerator
  },
  props: {
    chartData: {
      type: Object,
      required: true,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    chartContainerStyles() {
      return {
        height: `${this.computedChartHeight}`,
        width: `${this.computedChartWidth}`,
      };
    },
    computedChartHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '200px';
        case 'sm': return '200px';
        case 'md': return '200px';
        case 'lg': return '200px';
        case 'xl': return '300px';
        default : return '400px';
      }
    },
    computedChartWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '300px';
        case 'sm': return '100%';
        case 'md': return '400px';
        case 'lg': return '300px';
        case 'xl': return '400px';
      }
      return '400px';
    },
    averagePrice() {
      return this.chartData.datasets[1].data.reduce(
        (acc, curr) => acc + curr,
        0
      ) / this.chartData.datasets[1].data.length;
    },
  },
  data() {
    return {
      chartOptions: {
        maintainAspectRatio: false,
      }
    }
  },
}
</script>
<style scoped lang="scss">
  .price-chart {
    height: 100%;
    width: 100%;

    &__chart-container {
      height: 100%;
      width: 100%;
    }
  }
</style>