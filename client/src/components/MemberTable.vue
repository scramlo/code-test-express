<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-card-text><strong>Note:</strong> Default order is by subscription price.</v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="10"
        :search="search"
        :sort-by="['subscription.name']"
        :custom-sort="customSort"
        sort-desc
        class="elevation-1"
      >
        <template #[`item.subscription.name`]="{ item }">
          <v-btn x-small :color="getSubscriptionColor(item.subscription.name)" @click="subscriptionClickHandler(item.subscription)">{{ item.subscription.name }}</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer
      v-model="sidePanel.show"
      right
      absolute
      temporary
    >
      <v-container class="d-flex flex-column align-center">
        <v-chip :color="getSubscriptionColor(sidePanel.title)" class="mb-5">
          <h2>{{ sidePanel.title }} Level</h2>
        </v-chip>
        <p>
          <strong>Price: ${{ sidePanel.price }}</strong>
        </p>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'MemberTable',
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    methods: {
      getSubscriptionColor(subscription) {
        switch (subscription) {
          case 'Gold':
            return '#ffce0c';
          case 'Platinum':
            return '#dcb4f8';
          default:
            return '#e3e3e3';
        }
      },
      subscriptionClickHandler(subscription) {
        this.sidePanel.title = subscription.name;
        this.sidePanel.price = subscription.price;
        this.sidePanel.show = true;
      },
      // This will hook into the sorting of subscription.name and use the price instead
      customSort(items, index, isDesc) {
        items.sort((a, b) => {
            if (index[0] == 'subscription.name') {
                if (!isDesc[0]) {
                    return a.subscription.price - b.subscription.price;
                } else {
                    return b.subscription.price - a.subscription.price;
                }
            }
        });
        return items;
      },
    },
    data() {
      return {
        search: '',
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Subscription', value: 'subscription.name' },
        ],
        sidePanel: {
          show: false,
          title: '',
          price: '',
        },
      }
    }
  }
</script>
