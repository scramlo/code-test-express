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
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
      >
        <template #[`item.subscription.name`]="{ item }">
          <v-btn x-small :color="getSubscriptionColor(item.subscription.name)" @click="showSidePanel = true">{{ item.subscription.name }}</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer
      v-model="showSidePanel"
      right
      absolute
      temporary
    >
    
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
        showSidePanel: false,
      }
    }
  }
</script>
