<script>

import { useTasksStore } from "../stores/tasks";

export default {
  setup() {
    const tasksStore = useTasksStore();

    return { tasksStore };
  },

};

</script>
<template>
    Task folders
    <br>
    <button class="btn btn-outline-danger mt-3" v-for="categoria in tasksStore.getCategories" :key="categoria.id" @click="tasksStore.changeCategoria(categoria)">{{categoria}}</button>

</template>

<style>


</style>