import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login.vue";
import TasksList from "./components/TasksList.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/logged", component: TasksList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app')
