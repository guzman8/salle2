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
        Categories
    </div>
</template>

<style>

</style>