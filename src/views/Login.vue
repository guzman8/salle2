<script>
import { useTasksStore } from "../stores/tasks";

export default {
    setup() {
        const tasksStore = useTasksStore();
        return { tasksStore };
    },
    data() {
        return {
            user: "",
            password: "",   // Dummy
        };
    },
    methods: {
        loginUser() {
            // TODO: Validate fields programatically

            this.tasksStore.setUser(this.user);

            console.log("Retrieving data from API or DB");
            this.tasksStore.readTasksFromUser();
        }
    },
    created() {
        // Reset the storage
        this.tasksStore.$reset();
    }
};
</script>

<template>
    <section id="main">
        <input placeholder="User" v-model.lazy="user">
        <br>
        <input type="password" placeholder="Password" v-model.lazy="password">
        <br>
        <button @click="loginUser()">
            <router-link to="/tasks">Log in</router-link>
        </button>
    </section>
</template>

<style>
#main {
    /* grid-row-start / grid-column-start / grid-row-end / grid-column-end */
    grid-area: options / span 2 / main;
    padding-top: 5em;
}
</style>