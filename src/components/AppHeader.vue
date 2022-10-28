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
    methods: {
        logout() {
            // To the login page
            this.$router.push({ path: "/" });
        }
    },
    created() {
        // Check if user is logged in. Otherwise, route to login page
        if (typeof this.user === 'undefined') {
            this.$router.push({ path: "/" });
        }
    }
}
</script>

<template>
    <div id="header">
        <div v-if="tasksStore.isLogged">
            <h1>Tasks of <span class="user-in-header">{{ tasksStore.getUser }}</span></h1>
            <div id="al_right"><a href="" @click="logout()">Logout</a></div>
        </div>
        <div v-else>
            <h1>Welcome to the task manager</h1>
        </div>
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
    margin-right: 0px;
}

#al_right {
    text-align: right;
}

.user-in-header {
    color: yellow;
    font-weight: bolder;
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.5);
}
</style>