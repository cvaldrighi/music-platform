import { createApp } from 'vue';
import App from './app/App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import './assets/main.css';
import { auth } from './includes/firebase.js'
import VeeValidatePlugin from './includes/validation.js';
import Icon from './directives/icon';

let app;

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App);

        app.use(store);
        app.use(router);
        app.use(VeeValidatePlugin);
        app.directive('icon', Icon);

        app.mount('#app');
    }
});


