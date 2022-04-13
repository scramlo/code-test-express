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
            <h1>Carney Members</h1>
            <MemberTable :headers="tableData.headers" :items="reactiveItems" :loading="tableData.loading" />
          </v-col>
        </v-row>
      </v-container>    
    </v-main>
    <MessagePopover v-model="messageData.value" :text="messageData.text" :color="messageData.color" :timeout="messageData.timeout" />
  </v-app>
</template>

<script>
// Components
import MemberTable from './components/MemberTable';
import MessagePopover from './components/MessagePopover';

// API
import { getMembers } from './api';

export default {
  name: 'App',
  components: {
    MemberTable,
    MessagePopover,
  },
  async beforeMount() {
    let memberApiResponse = await getMembers();
    this.tableData.loading = false;
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
      this.tableData.items = memberApiResponse.data;
      console.log(this.tableData.memberTableItems = memberApiResponse.data)
    }
  },
  computed: {
    reactiveItems() {
      return this.tableData.items ?? [];
    },
  },
  data(){
    return {
      messageData: {
        value: false,
        text: '',
        color: '',
        timeout: 5000,
      },
      tableData: {
        loading: true,
        items: [],
      },
     };
  },
};
</script>
