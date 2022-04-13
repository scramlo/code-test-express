<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="10"
    class="elevation-1"
  />
</template>

<script>
  export default {
    name: 'DataTable',
    props: {
      headers: {
        type: Array,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
    }
  }
</script>
