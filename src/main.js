import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueConfetti from 'vue-confetti'
import 'aos/dist/aos.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/style.css";
import "bootstrap/js/dist/modal";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(store).use(router).use(VueConfetti).mount('#app')
