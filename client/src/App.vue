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

    <v-main>
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col>
            <DataTable :headers="tableData.headers" :items="reactiveItems"/>
          </v-col>
        </v-row>
      </v-container>    
    </v-main>
    <MessagePopover v-model="messageData.value" :text="messageData.text" :color="messageData.color" :timeout="messageData.timeout" />
  </v-app>
</template>

<script>
// Components
import DataTable from './components/DataTable';
import MessagePopover from './components/MessagePopover';

// API
import { getMembers } from './api';

export default {
  name: 'App',
  components: {
    DataTable,
    MessagePopover,
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
      this.tableData.memberTableItems = memberApiResponse.data;
    }
  },
  computed: {
    reactiveItems() {
      return this.tableData.memberTableItems ?? [];
    },
  },
  data(){
    return {
      messageData: {
        value: true,
        text: 'This is my message',
        color: 'error',
        timeout: 5000,
      },
      tableData: {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Updated', value: 'updated_at' },
          { text: 'Created', value: 'created_at' },
        ],
        items: [],
      },
     };
  },
};
</script>
