<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-toolbar-title>Carney Membership Manager</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-main class="main">
      <v-container class="main__container">
          <SubscriptionChart class="subscription-chart" :chartData="subscriptionChartData" :loading="loading" />
          <PriceChart class="price-chart" :chartData="priceChartData" :loading="loading"/>
          <MemberTable class="member-table" :headers="tableData.headers" :items="reactiveItems" :loading="loading" />
      </v-container>    
    </v-main>
    <MessagePopover v-if="messageData.value" v-model="messageData.value" :text="messageData.text" :color="messageData.color" :timeout="messageData.timeout" />
  </v-app>
</template>

<script>
// Components
import MemberTable from './components/MemberTable';
import MessagePopover from './components/MessagePopover';
import SubscriptionChart from './components/SubscriptionChart';
import PriceChart from './components/PriceChart';

// API
import { getMembers } from './api';
import { COLORS } from './constants';

export default {
  name: 'App',
  components: {
    MemberTable,
    MessagePopover,
    SubscriptionChart,
    PriceChart,
},
  async beforeMount() {
    let memberApiResponse = await getMembers();
    if ( memberApiResponse.error ) {
      this.messageData.text = `
        <p>
          <strong>There was a problem getting the members. See message below:</strong>
        </p>
        <p>${memberApiResponse.errorMessage}</p>`;
      this.messageData.color = 'error';
      this.messageData.show = true;
      this.messageData.timeout = -1;
    } else {
      this.tableData.items = memberApiResponse.data.membersWithSubscriptions;
      this.subscriptionData = memberApiResponse.data.subscriptionsWithCount;
      this.loading = false;
      console.log('sub data', this.subscriptionData);
    }
  },
  computed: {
    reactiveItems() {
      return this.tableData.items ?? [];
    },
    subscriptionChartData() {
      return {
        labels: this.subscriptionData.map(subscription => subscription.name),
        datasets: [
          {
            backgroundColor: [ COLORS.silver, COLORS.gold, COLORS.platinum ],
            data: this.subscriptionData.map(subscription => subscription.memberCount),
          }
        ]
      };
    },
    priceChartData() {
      return {
        labels: this.subscriptionData.map(subscription => subscription.memberCount),
        datasets: [
          {
            label: 'Members',
            backgroundColor: [ COLORS.silver, COLORS.gold, COLORS.platinum ],
            data: this.subscriptionData.map(subscription => subscription.memberCount),
            borderColor: COLORS.platinum,
          },
          {
            label: 'Price',
            backgroundColor: [ COLORS.silver, COLORS.gold, COLORS.platinum ],
            data: this.subscriptionData.map(subscription => subscription.price),
          }
        ]
      };
    },
  },
  data(){
    return {
      loading: true,
      messageData: {
        value: false,
        text: '',
        color: '',
        timeout: 5000,
      },
      tableData: {
        items: [],
      },
      subscriptionData: [],
    };
  },
};
</script>

<style lang="scss" scoped>
  // Here we will replicate the vuetify's legit breakpoint functions
  @use "vuetify/src/styles/settings/_variables.scss" as vuetify_variables;
  .main {
    background: url('https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble-outline.png');

    &__container {
      display: grid;

      // Mobile
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;

      // Medium
      @media #{map-get(vuetify_variables.$display-breakpoints, 'md-only')} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr); 
        margin-top: 3rem;
      }
      
      // Large+
      @media #{map-get(vuetify_variables.$display-breakpoints, 'lg-and-up')} {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr); 
      }

      gap: 30px;

      .member-table {
        // Mobile
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        
        // Medium
        @media #{map-get(vuetify_variables.$display-breakpoints, 'md-only')} {
          grid-column: 1 / 3;
          grid-row: 1 / 4;
        }

        // Large+
        @media #{map-get(vuetify_variables.$display-breakpoints, 'lg-and-up')} {
          grid-column: 2 / 5;
          grid-row: 1 / 3;
        }
      }
    }
  }
</style>