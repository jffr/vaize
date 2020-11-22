// VueGlide (slider)
import VueGlide from 'vue-glide-js';
import 'vue-glide-js/dist/vue-glide.css';

// Vuelidate (validation for forms)
import Vuelidate from 'vuelidate';

// VueScrollTo (scrolling to elements)
import VueScrollTo from 'vue-scrollto';

// Waypoints (detecting element in viewport)
import 'waypoints/lib/noframework.waypoints.min';

// Notifications (no decription needed)
import Notifications from 'vue-notification';

// Clean Head
import VueHead from 'vue-head';

// Analytics
import VueAnalytics from 'vue-analytics';

// Router
import router from './router';

export default {
  install(Vue) {
    Vue.use(VueGlide);
    Vue.use(Vuelidate);
    Vue.use(VueScrollTo, { offset: -85, duration: 1000 });
    Vue.use(Notifications);
    Vue.use(VueHead);
    Vue.use(VueAnalytics, {
      id: 'UA-146446100-1',
      checkDuplicatedScript: true,
      router,
    });
  },
};
