import { createApp } from 'vue'
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/style/main.scss';
import App from './App.vue'

createApp(App).use(router).mount('#app')
