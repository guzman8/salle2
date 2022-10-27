<script>
import { useTasksStore, Task } from "../stores/tasks";

export default {
    setup() {
        const tasksStore = useTasksStore();

        return { tasksStore };
    },
    props: {

    },
    data() {
        return {
        }
    },
}
</script>

<template>
    <div id="categories">
        <h1>Category filters</h1>
        <br>
        <button class="btn btn-outline-danger mt-3" @click="tasksStore.changeCategory(undefined)">&lt;&lt; ALL &gt;&gt;</button>
        <br>
        <button class="btn btn-outline-danger mt-3" v-for="category in tasksStore.getCategories" :key="category"
            @click="tasksStore.changeCategory(category)">{{ category }}</button>
    </div>
</template>

<style>

</style>
