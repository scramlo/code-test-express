<template>
    <v-snackbar
      :value="value"
      top
      app
      multi-line
      :color="color"
      :timeout="timeout"
    >
      <span v-html="text" />
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="$emit('input', false)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
  export default {
    name: 'MessagePopover',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: '',
      },
      color: {
        type: String,
        default: 'success',
      },
      timeout: {
        type: Number,
        default: 5000,
      },
    },
  }
</script>
