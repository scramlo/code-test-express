<template>
  <section aria-label="Subscription Chart">
    <v-card class="subscription-chart">
      <v-card-title>
        <h2 class="headline">Subscriptions</h2>
      </v-card-title>
      <v-card-text class="subscription-chart__chart-container">
        <Doughnut
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
import { Doughnut } from 'vue-chartjs/legacy';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: 'SubscriptionChart',
  components: {
    Doughnut
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
        display: 'flex',
        justifyContent: 'center',
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
      }
      return '400px';
    },
    computedChartWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '100%';
        case 'sm': return '100%';
        case 'md': return '400px';
        case 'lg': return '300px';
        case 'xl': return '100%';
        default : return '400px';
      }
    },
  },
  data() {
    return {
      chartOptions: {
        maintainAspectRatio: false,
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .subscription-chart {
    height: 100%;
    width: 100%;

    &__chart-container {
      height: 100%;
      width: 100%;
    }
  }
</style>