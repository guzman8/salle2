<script>
// Pinia store
import { useTasksStore } from "../stores/tasks";

export default {
    setup() {
        const tasksStore = useTasksStore();

        return { tasksStore };
    },
    data() {
        return {
        }
    },
    created() {
        // Check if user is logged in. Otherwise, route to login page
        if(typeof this.user === 'undefined') {
            this.$router.push({ path: "/" });
        }
    }
}
</script>

<template>
    <div id="header">
        <h1 v-if="tasksStore.isLogged">Tasks of <span class="user-in-header">{{ tasksStore.getUser }}</span></h1>
        <h1 v-else>Welcome to the task manager</h1>
    </div>
</template>

<style>
#header {
    text-align: center;
    display: block;
    color: white;
    background-color: #61458c;
    padding: 12px;
}

#header a {
    text-decoration: underline;
    /* Removes anchor decorations except the underline */
    color: inherit;
}

.user-in-header {
    color: yellow;
    font-weight: bolder;
    text-shadow: 2px 4px 3px rgba(0,0,0,0.5);
}
</style>