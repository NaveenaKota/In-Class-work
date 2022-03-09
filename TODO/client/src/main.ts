import { createApp } from 'vue'
import { createPinia } from 'pinia';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/style/main.scss';

import App from './App.vue'
import router from './router';

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')