<template>
  <div>
    <v-card class="member-table">
      <v-card-title>
        <h2 class="headline">Member Table</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          :sort-by="['subscription.name']"
          :custom-sort="customSort"
          sort-desc
          :loading="loading"
        >
          <template #[`item.subscription.name`]="{ item }">
            <v-btn x-small :color="getSubscriptionColor(item.subscription.name)" @click="subscriptionClickHandler(item.subscription)">{{ item.subscription.name }}</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-navigation-drawer
      v-if="sidePanel.show"
      v-model="sidePanel.show"
      right
      absolute
      temporary
      app
    >
        <v-container class="text-center">
          <v-chip :color="getSubscriptionColor(sidePanel.title)">
            <h2>{{ sidePanel.title }} Level</h2>
          </v-chip>
        </v-container>
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-cash-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>${{ sidePanel.price }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
             <v-list-item-icon>
                <v-icon>mdi-account-multiple-check</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ sidePanel.memberCount }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import { COLORS } from '@/constants';
  export default {
    name: 'MemberTable',
    props: {
      items: {
        type: Array,
        required: true,
        default: () => [],
      },
      loading: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
    methods: {
      getSubscriptionColor(subscription) {
        switch (subscription) {
          case 'Gold':
            return COLORS.gold;
          case 'Platinum':
            return COLORS.platinum;
          default:
            return COLORS.silver;
        }
      },
      subscriptionClickHandler(subscription) {
        this.sidePanel.title = subscription.name;
        this.sidePanel.price = subscription.price;
        this.sidePanel.show = true;
        this.sidePanel.memberCount = subscription.memberCount;
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
          memberCount: '',
        },
      }
    }
  }
</script>

<style lang="scss" scoped>
  .member-table {
    height: 100%;
  }
</style>