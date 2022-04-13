import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#348888',
        secondary: '#22babb',
        accent: '#7e7bca',
        error: '#f24405',
        info: '#FF5252',
        success: '#4CAF50',
        warning: '#fa7f08'
      },
    },
  },
});
