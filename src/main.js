import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import './assets/main.css';
import './includes/firebase.js'
import VeeValidatePlugin from './includes/validation.js';

let app = createApp(App);

app.use(store);
app.use(router);
app.use(VeeValidatePlugin);

app.mount('#app');
