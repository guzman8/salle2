import { createApp } from 'vue'
import App from './App.vue'

// Pinia storing
import { createPinia } from "pinia";
const pinia = createPinia();

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Routing configuration
import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/Login.vue";
import TasksList from "./views/TasksList.vue";
const routes = [
    { path: "/", component: Login },
    { path: "/tasks", component: TasksList },
    { path: '/:pathMatch(.*)*', component: Login }, // Page not found matching
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

// Instantiating app
createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app');
