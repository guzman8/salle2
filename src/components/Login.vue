<script>
import { useTasksStore } from "../stores/tasks";
export default {
  setup() {
    const tasksStore = useTasksStore();
    return { tasksStore };
  },
  data() {
    return {
        // Enum
    };
  },

};
</script>

<template>

    <input placeholder="Usuario" v-model.lazy="tasksStore.user">
    <input placeholder="password" type="password">
    <button><router-link to="/logged">Log in</router-link></button>

</template>