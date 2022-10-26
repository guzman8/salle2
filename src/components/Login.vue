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
    <section></section>
    <section></section>
    <section></section>
    <section id="main">    
        <input left="0px" id="datos" placeholder="Usuario" v-model.lazy="tasksStore.user">
        <br>
        <input placeholder="password" type="password">
        <br>
        <button><router-link to="/logged">Log in</router-link></button>
    </section>
</template>
<style>

</style>